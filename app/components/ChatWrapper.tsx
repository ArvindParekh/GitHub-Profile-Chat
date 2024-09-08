"use client";

import { responseAtom } from "@/atoms/atoms";
import { memo } from "react";
import { useRecoilValue } from "recoil";

const ChatWrapper = memo(() => {
   const response = useRecoilValue(responseAtom);

   return (
      <div className="overflow-y-auto flex-grow mb-16">
         {response == "loading" ? (
            <div className='chat chat-start skeleton'>
               <div className='chat-bubble skeleton'></div>
            </div>
         ) : response == "" ? (
            <></>
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
