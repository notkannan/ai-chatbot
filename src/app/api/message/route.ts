import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";

export async function POST(req: Request) {
  const { messages, preferences } = await req.json();
  console.log("Request:", { messages, preferences });
  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  // Construct the prompt with user preferences
  const modifiedPrompt = `
    ${chatbotPrompt}
    Respond in ${preferences.language} with a ${preferences.tone} tone and a ${preferences.responseLength} response length.
  `;

  outboundMessages.unshift({
    role: "system",
    content: modifiedPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-4o-mini",
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
