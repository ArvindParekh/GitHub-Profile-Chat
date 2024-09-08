"use client";

import { usernameAtom, promptAtom, responseAtom } from "@/atoms/atoms";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const ChatInput = () => {
   const [prompt, setPrompt] = useRecoilState(promptAtom);
   const username = useRecoilValue(usernameAtom);
   const setResponse = useSetRecoilState(responseAtom);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (prompt.trim() === "") return;

      try {
         const res = await axios.post("/api/chat", { prompt });
         
         if (res.data && typeof res.data.response === 'string') {
            setResponse(res.data.response);
            setPrompt("");
         } else {
            console.error("Unexpected response format:", res.data);
            // Handle the error appropriately, maybe set an error state
         }
      } catch (error) {
         console.error("Error submitting chat:", error);
         // Handle the error appropriately, maybe set an error state
      }
   };

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
};

export default ChatInput;
