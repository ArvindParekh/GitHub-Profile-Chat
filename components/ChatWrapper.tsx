"use client";

import { responseAtom } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";

export default function ChatWrapper() {
   const response = useRecoilValue(responseAtom);

   return (
      <>
         <div className='chat chat-start'>
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
      </>
   );
}
