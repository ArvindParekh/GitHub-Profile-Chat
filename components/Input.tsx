"use client";

import { dataContextAtom, urlAtom } from "@/atoms/atoms";
import { octokit } from "@/octokit-config";
import { headers } from "next/headers";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function InputComponent() {
   return <Input />;
}

function Input() {
   const [url, setUrl] = useRecoilState(urlAtom);
   const [data, setData] = useRecoilState(dataContextAtom);
   const router = useRouter();

   async function fetchGhData(url: string) {
      const user = url.substring(url.lastIndexOf("/") + 1);
      console.log(user);

      const resData = await octokit.request(`GET /users/${user}`, {
         headers: {
            "X-GitHub-Api-Version": "2022-11-28",
         },
      });
      const userData = resData.data;

      const stargazerData = await octokit.request(
         "GET /users/{username}/starred",
         {
            username: user,
            headers: {
               "X-GitHub-Api-Version": "2022-11-28",
            },
         }
      );
      const userStargazer = stargazerData.data;

      const eventsData = await octokit.request(
         "GET /users/{username}/events/public",
         {
            username: user,
            headers: {
               "X-GitHub-Api-Version": "2022-11-28",
            },
         }
      );
      const userEvents = eventsData.data;

      await setData((prev) => ({
         ...prev,
         user: userData,
         stargazers: userStargazer,
         // events: userEvents,
      }));


      // const res = axios.post(
      //    // "https://temp-workers.aruparekh2.workers.dev/",
      //    "http://localhost:8787",
      //    {
      //       memoryData: {
      //          user: userData,
      //          stargazers: userStargazer,
      //          events: userEvents,
      //       },
      //    }
      // );
      // console.log(res);

      router.push("/chat");
   }
   return (
      <>
         <input
            type='url'
            placeholder='Enter GitHub URL...'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='input input-bordered w-96'
         />
         <button className='btn btn-outline' onClick={() => fetchGhData(url)}>
            Submit
         </button>
      </>
   );
}
