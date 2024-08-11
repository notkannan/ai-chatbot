// src/app/chat/page.tsx
import ChatInput from "@/app/components/ChatInput";
import ChatMessages from "@/app/components/ChatMessages";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FC } from "react";

const ChatPage: FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] ">
      <Card className="w-full max-w-3xl mx-4 shadow-lg">
        <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-700 flex ">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            <h2 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              Chat with NEU HuskyBot
            </h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-[80vh]">
          <ScrollArea className="flex-1 p-4">
            <ChatMessages className="p-4" />
          </ScrollArea>
          <ChatInput className="p-4" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;
