import { ReactNode } from "react";

export default function ChatLayout({
   children,
}: Readonly<{ children: ReactNode }>) {
   return (
      <div className='flex w-full h-screen p-4'>
         <div className='card bg-base-300 w-[20%] rounded-box grid h-full p-10'>
            Chat threads
         </div>
         <div className='divider divider-horizontal'></div>
         <div className='card bg-base-300 w-[80%] rounded-box flex flex-col gap-10  h-full p-10 relative'>
            <h1 className='text-7xl text-center h-min bg-gradient-to-b from-base-content to-base-100 inline-block text-transparent bg-clip-text'>
               Talk with your GitHub Profile
            </h1>
            {children}
         </div>
      </div>
   );
}
