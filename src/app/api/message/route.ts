import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt"
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream"
import { MessageArraySchema } from "@/lib/validators/message"

export async function POST(req: Request) {
    const {messages} = await req.json()

    const parsedMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
        role: message.isUserMessage ? 'user' : 'system',
        content: message.text,
    }))

    outboundMessages.unshift({
        role: 'system',
        content: chatbotPrompt,
    })

    const payload: OpenAIStreamPayload = {
        model: 'gpt-4o-mini',
        messages: outboundMessages,
        temperature: 0.4, // How creative the AI will be
        top_p: 1,
        frequency_penalty: 0, // How often a certain word will occur
        presence_penalty: 0, // Value upto 2. Higher the presence penalty, the lesser it will use the words that are already present in the prompt
        max_tokens: 150, // Response will be roughly 150 words
        stream: true, // Required to have a readable stream
        n: 1
    }

    const stream = await OpenAIStream(payload)

    return new Response(stream)
}