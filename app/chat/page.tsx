import Chat from "@/components/chat";
import ChatInput from "@/components/ChatInput";
import ChatWrapper from "@/components/ChatWrapper";

export default function Chatpage() {
   return (
      <div>
         {/* <div>This is the chat page</div>
   <Chat /> */}
         <ChatWrapper />
         <ChatInput />
      </div>
   );
}
