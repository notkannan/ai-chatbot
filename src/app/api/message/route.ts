import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt"
import { OpenAIStream, OpenAIStreamPayload, ChatGPTMessage } from "@/lib/openai-stream"
import { MessageArraySchema } from "@/lib/validators/message"
import { pinecone } from '@/lib/pinecone-client'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'


const PINECONE_INDEX_NAME = 'neu-data'
const PINECONE_NAME_SPACE = 'default'

export async function POST(req: Request) {
    const { messages } = await req.json()

    const parsedMessages = MessageArraySchema.parse(messages)

    const lastMessage = parsedMessages[parsedMessages.length - 1]

    const embeddings = new OpenAIEmbeddings()
    const index = pinecone.Index(PINECONE_INDEX_NAME)

    const vectorStore = await PineconeStore.fromExistingIndex(
      embeddings,
      { 
        pineconeIndex: index,
        namespace: PINECONE_NAME_SPACE,
      }
    )

    const relevantDocs = await vectorStore.similaritySearch(lastMessage.text, 3)

    const relevantContext = relevantDocs.map(doc => doc.pageContent).join('\n')

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
        role: message.isUserMessage ? 'user' : 'assistant',
        content: message.text,
    }))

    outboundMessages.unshift({
        role: 'system',
        content: `${chatbotPrompt}\n\nRelevant context: ${relevantContext}`,
    })

    const payload: OpenAIStreamPayload = {
        model: 'gpt-4o-mini',
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 300,
        stream: true,
        n: 1
    }

    const stream = await OpenAIStream(payload)

    return new Response(stream)
}