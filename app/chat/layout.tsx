import { ReactNode } from "react";

export default function ChatLayout({
   children,
}: Readonly<{ children: ReactNode }>) {
   return (
      <div className='flex w-full h-screen'>
         <div className='card bg-base-300 w-[20%] rounded-box grid h-full p-10'>
            Chat threads
         </div>
         <div className='divider divider-horizontal'></div>
         <div className='card bg-base-300 w-[80%] rounded-box grid h-full p-10 relative'>
            content
            <input className='input input-bordered absolute left-0 right-0 mx-10 bottom-10'></input>
         </div>
      </div>
   );
}
