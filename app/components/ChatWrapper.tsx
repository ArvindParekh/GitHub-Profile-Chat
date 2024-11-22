"use client";

import { responseAtom } from "@/atoms/atoms";
import { memo, useState } from "react";
import { useRecoilValue } from "recoil";

const ChatWrapper = memo(() => {
   const response = useRecoilValue(responseAtom);
   const [isProcessing, setIsProcessing] = useState(false);

   return (
      <div className="overflow-y-auto flex-grow mb-16">
         {response === "loading" || isProcessing ? (
            <div className='chat chat-start'>
               <div className='chat-image avatar'>
                  <div className='w-8 md:w-10 rounded-full skeleton'></div>
               </div>
               <div className='chat-bubble skeleton w-2/3 h-16'></div>
            </div>
         ) : response === "" ? (
            <div className="text-center text-gray-500 mt-4">
               Ask me anything about this GitHub profile!
            </div>
         ) : (
            <div className={`chat chat-start`}>
               <div className='chat-image avatar'>
                  <div className='w-8 md:w-10 rounded-full'>
                     <img
                        alt='GitHub avatar'
                        src='/github.svg'
                     />
                  </div>
               </div>
               <div className='chat-bubble text-sm md:text-base'>{response}</div>
            </div>
         )}
      </div>
   );
});

ChatWrapper.displayName = 'ChatWrapper';

export default ChatWrapper;
