"use client";

import { usernameAtom, promptAtom, responseAtom } from "@/atoms/atoms";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function ChatInput() {
   const [prompt, setPrompt] = useRecoilState(promptAtom);
   const username = useRecoilValue(usernameAtom);
   const setResponse = useSetRecoilState(responseAtom);

   async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      setResponse("loading");
      const res = await axios.post<string, AxiosResponse<string>>(
         // "https://temp-workers.aruparekh2.workers.dev",
         "http://localhost:8787/retrieveDb",
         {
            userName: username,
            query: prompt,
         }
      );

      setResponse(res.data.response);
      setPrompt("");
   }

   return (
      <form onSubmit={(e: FormEvent) => handleSubmit(e)} className="w-full">
         <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className='input input-bordered w-full absolute left-0 right-0 mx-auto bottom-4 md:bottom-10 max-w-xs md:max-w-2xl text-sm md:text-base'
            placeholder="Ask something about the GitHub profile..."
         ></input>
      </form>
   );
}
