import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Maximize2 } from "lucide-react"; // Import an icon for maximize
import { useRouter } from "next/navigation"; // Import useRouter
import { FC } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat: FC = () => {
  const router = useRouter(); // Initialize useRouter

  const handleMaximize = () => {
    router.push("/chat"); // Redirect to the chat page
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="relative bg-white z-10 shadow-lg transition-all duration-300"
    >
      <AccordionItem value="item-1">
        <div className="fixed right-4 bottom-24 md:bottom-16 w-80 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex flex-col">
            <AccordionTrigger className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
              <ChatHeader />
              <button
                onClick={handleMaximize}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Maximize Chat"
              >
                <Maximize2 className="w-4 h-4 text-gray-600" />
              </button>
            </AccordionTrigger>
            <AccordionContent className="transition-all duration-300 ease-in-out">
              <div className="flex flex-col h-80">
                <ChatMessages className="px-4 py-3 flex-1" />
                <ChatInput className="px-4 py-2 border-t border-gray-300" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Chat;
