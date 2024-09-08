import { BackgroundProvider } from "@/app/components/BackgroundProvider";
import UrlInput from "@/app/components/UrlInput";

export default function Home() {
   return (
      <BackgroundProvider>
         <main className='flex min-h-screen flex-col items-center justify-evenly p-4 md:p-24'>
            <div className='text-2xl md:text-7xl font-bold dark:text-white text-center'>
               Would you like to talk to any GitHub Profile?
            </div>
            <div className='font-extralight text-sm md:text-4xl dark:text-neutral-200 py-2 md:py-4'>
               Well, here you go.
            </div>
            <UrlInput />
         </main>
      </BackgroundProvider>
   );
}
