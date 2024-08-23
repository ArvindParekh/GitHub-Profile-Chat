"use client";

import { dataContextAtom, urlAtom } from "@/atoms/atoms";
import { octokit } from "@/octokit-config";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

export default function InputComponent() {
   const [url, setUrl] = useRecoilState<string>(urlAtom);
   const [data, setData] = useRecoilState<GhData>(dataContextAtom);
   const router = useRouter();

   async function fetchGhData(url: string) {
      const ghUser = url.substring(url.lastIndexOf("/") + 1);
      console.log(ghUser);

      // <------ FETCHING Various types of data from GitHub API ----------------->
      const resData = await octokit.request(`GET /users/${ghUser}`, {
         headers: {
            "X-GitHub-Api-Version": "2022-11-28",
         },
      });
      const userData: object = resData.data;

      const stargazerData = await octokit.request(
         "GET /users/{username}/starred",
         {
            username: ghUser,
            headers: {
               "X-GitHub-Api-Version": "2022-11-28",
            },
         }
      );
      const userStargazer: object[] = stargazerData.data;

      const eventsData = await octokit.request(
         "GET /users/{username}/events/public",
         {
            username: ghUser,
            headers: {
               "X-GitHub-Api-Version": "2022-11-28",
            },
         }
      );
      const userEvents: object[] = eventsData.data;

      await setData((prev) => ({
         ...prev,
         user: userData,
         stargazers: userStargazer,
         // events: userEvents,
      }));

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
            Let's chat
         </button>
      </>
   );
}
