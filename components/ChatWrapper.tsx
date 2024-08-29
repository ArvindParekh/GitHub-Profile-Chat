"use client";

import { responseAtom } from "@/atoms/atoms";
import { memo } from "react";
import { useRecoilValue } from "recoil";

const ChatWrapper = memo(() => {
   const response = useRecoilValue(responseAtom);

   return (
      <>
         {response == "loading" ? (
            <div className='chat chat-start skeleton'>
               <div className='chat-bubble skeleton'></div>
            </div>
         ) : // <span className='loading loading-dots loading-md'></span>
         response == "" ? (
            <></>
         ) : (
            <div className={`chat chat-start`}>
               <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                     <img
                        alt='Tailwind CSS chat bubble component'
                        src='/github.svg'
                     />
                  </div>
               </div>
               <div className='chat-bubble'>{response}</div>
            </div>
         )}
      </>
   );
});

export default ChatWrapper;
