"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { FC, HTMLAttributes, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "page" | "accordion";
}

const ChatInput: FC<ChatInputProps> = ({
  className,
  variant = "accordion",
  ...props
}) => {
  const [input, setInput] = useState<string>("");
  const [preferences, setPreferences] = useState({
    language: "Spanish",
    tone: "Friendly",
    responseLength: "Medium",
  });

  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("chatbotPreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [message],
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No Stream Found!");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      addMessage(responseMessage);
      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      setIsMessageUpdating(false);
      setInput("");
    },
    onError(_, message) {
      toast.error("Something went wrong. Please try again.");
      removeMessage(message.id);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const message: Message = {
        id: nanoid(),
        isUserMessage: true,
        text: input,
      };
      sendMessage(message);
    }
  };

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="flex items-center mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Got any questions?"
          className={cn("flex-1", {
            "bg-white text-gray-900": variant === "accordion",
            "bg-white text-gray-900 dark:bg-black dark:text-gray-100":
              variant === "page",
          })}
          disabled={isPending}
        />
        <Button
          onClick={() => {
            const message: Message = {
              id: nanoid(),
              isUserMessage: true,
              text: input,
            };
            sendMessage(message);
          }}
          disabled={isPending || !input.trim()}
          className={cn("ml-2", {
            "bg-black text-white hover:bg-gray-800": variant === "accordion",
          })}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CornerDownLeft className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
