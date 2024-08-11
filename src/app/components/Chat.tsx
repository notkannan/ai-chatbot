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

const Chat: FC = ({}) => {
  const router = useRouter(); // Initialize useRouter

  const handleMaximize = () => {
    router.push("/chat"); // Redirect to the chat page
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="relative bg-white z-10  shadow"
    >
      <AccordionItem value="item-1">
        <div className="fixed right-8 bottom-24 md:bottom-16 w-80 bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="w-full h-full flex flex-col">
            <AccordionTrigger className="px-6 border-b border-zinc-300 flex justify-between items-center">
              <ChatHeader />
              <button
                onClick={handleMaximize}
                className="ml-2 mr-1 p-1 rounded-full  hover:bg-gray-200  border-gray-300"
                aria-label="Maximize Chat"
              >
                <Maximize2 className="w-4 h-4 text-gray-600" />
              </button>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col h-80">
                <ChatMessages className="px-2 py-3 flex-1" />
                <ChatInput className="px-4" />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Chat;
