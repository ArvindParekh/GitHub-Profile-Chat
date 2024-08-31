"use client";

import { usernameAtom, urlAtom } from "@/atoms/atoms";
import { octokit } from "@/octokit-config";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function InputComponent() {
   const [url, setUrl] = useRecoilState<string>(urlAtom);
   const setUsername = useSetRecoilState<string>(usernameAtom);
   const router = useRouter();

   async function fetchGhData(url: string) {
      const ghUser = url.substring(url.lastIndexOf("/") + 1);
      console.log(ghUser);

      // <------ FETCHING Various types of data from GitHub API ----------------->
      // const resData = await octokit.request(`GET /users/${ghUser}`, {
      //    headers: {
      //       "X-GitHub-Api-Version": "2022-11-28",
      //    },
      // });
      // const userData: object = resData.data;

      // const stargazerData = await octokit.request(
      //    "GET /users/{username}/starred",
      //    {
      //       username: ghUser,
      //       headers: {
      //          "X-GitHub-Api-Version": "2022-11-28",
      //       },
      //    }
      // );
      // const userStargazer: object[] = stargazerData.data;

      // const eventsData = await octokit.request(
      //    "GET /users/{username}/events/public",
      //    {
      //       username: ghUser,
      //       headers: {
      //          "X-GitHub-Api-Version": "2022-11-28",
      //       },
      //    }
      // );
      // const userEvents: object[] = eventsData.data;

      // const repoData = await octokit.request("GET /users/{username}/repos", {
      //    username: ghUser,
      //    headers: {
      //       "X-GitHub-Api-Version": "2022-11-28",
      //    },
      // });
      // const userRepos = repoData.data;

      const fetchData = await axios.post(
         "http://localhost:3000/api/github",
         {},
         {
            params: {
               username: ghUser,
            },
         }
      );

      const {
         users: userData,
         repos: userRepos,
         events: userEvents,
      } = fetchData.data;

      const res = await axios.post("http://localhost:8787/updateDb", {
         userData,
         // userStargazer,
         userEvents,
         userRepos,
      });

      setUsername(userData.name);

      console.log(res);

      router.push("/chat");
   }
   return (
      <div className="flex flex-col gap-5 justify-center items-center">
         <input
            type='url'
            placeholder='https://github.com/<username>'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='input input-bordered w-96 text-white'
         />
         <button className='btn w-fit' onClick={() => fetchGhData(url)}>
            Let's chat
         </button>
      </div >
   );
}
