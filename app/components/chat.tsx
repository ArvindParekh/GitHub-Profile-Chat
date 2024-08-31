"use client";

import { dataContextAtom } from "@/atoms/atoms";
import axios, { AxiosResponse } from "axios";
import { useRecoilValue } from "recoil";

export default function Chat() {
   const data = useRecoilValue(dataContextAtom);

   async function handleClick() {
      const res = await axios.post(
         // "https://temp-workers.aruparekh2.workers.dev",
         "http://localhost:8787",
         {
            memoryData: data,
            prompt:
               "What is the bio of the user and tell me something unique about him.",
         }
      );

      console.log(res);
   }

   return (
      <div>
         <p>{data.user.bio}</p>

         <button onClick={handleClick}>Click here</button>
      </div>
   );
}
