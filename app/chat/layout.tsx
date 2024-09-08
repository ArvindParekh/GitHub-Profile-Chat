import Link from "next/link";
import { ReactNode } from "react";

export default function ChatLayout({
   children,
}: Readonly<{ children: ReactNode }>) {
   return (
      <div className='flex flex-col md:flex-row w-full h-screen p-2 md:p-4'>
         <Link
            href={"/"}
            className='card underline bg-base-300 w-full md:w-[20%] rounded-box grid h-16 md:h-full p-4 md:p-10 mb-2 md:mb-0'
         >
            &larr; New Profile?
         </Link>
         <div className='divider divider-horizontal hidden md:flex'></div>
         <div className='card bg-base-300 w-full md:w-[80%] rounded-box flex flex-col gap-4 md:gap-10 h-full p-4 md:p-10 relative'>
            <h1 className='text-2xl md:text-7xl text-center h-min bg-gradient-to-b from-base-content to-base-100 inline-block text-transparent bg-clip-text'>
               Talk with your GitHub Profile
            </h1>
            {children}
         </div>
      </div>
   );
}
