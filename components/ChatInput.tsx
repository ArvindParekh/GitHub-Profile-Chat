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
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
         <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className='input input-bordered absolute left-0 right-0 mx-10 bottom-10'
         ></input>
      </form>
   );
}
