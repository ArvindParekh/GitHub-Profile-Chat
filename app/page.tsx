import { BackgroundProvider } from "@/app/components/BackgroundProvider";
import UrlInput from "@/app/components/UrlInput";

export default function Home() {
   return (
      <BackgroundProvider>
         <main className='flex min-h-screen flex-col items-center justify-evenly p-24'>
            <div className='text-3xl md:text-7xl font-bold dark:text-white text-center'>
               Would you like to talk to any GitHub Profile?
            </div>
            <div className='font-extralight text-base md:text-4xl dark:text-neutral-200 py-4'>
               Well, here you go.
            </div>

            <UrlInput />

            {/* <div className='mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left'>
               <a
                  href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                  className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <h2 className='mb-3 text-2xl font-semibold'>
                     Docs{" "}
                     <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                        -&gt;
                     </span>
                  </h2>
                  <p className='m-0 max-w-[30ch] text-sm opacity-50'>
                     Find in-depth information about Next.js features and API.
                  </p>
               </a>

               <a
                  href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
                  className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <h2 className='mb-3 text-2xl font-semibold'>
                     Learn{" "}
                     <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                        -&gt;
                     </span>
                  </h2>
                  <p className='m-0 max-w-[30ch] text-sm opacity-50'>
                     Learn about Next.js in an interactive course
                     with&nbsp;quizzes!
                  </p>
               </a>

               <a
                  href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                  className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <h2 className='mb-3 text-2xl font-semibold'>
                     Templates{" "}
                     <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                        -&gt;
                     </span>
                  </h2>
                  <p className='m-0 max-w-[30ch] text-sm opacity-50'>
                     Explore starter templates for Next.js.
                  </p>
               </a>

               <a
                  href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
                  className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  <h2 className='mb-3 text-2xl font-semibold'>
                     Deploy{" "}
                     <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                        -&gt;
                     </span>
                  </h2>
                  <p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
                     Instantly deploy your Next.js site to a shareable URL with
                     Vercel.
                  </p>
               </a>
            </div> */}
         </main>
      </BackgroundProvider>
   );
}
