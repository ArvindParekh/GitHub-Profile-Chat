import { octokit } from "@/octokit-config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const username = req.nextUrl.searchParams.get("username");

   console.log(username);

   const { data: users } = await octokit.rest.users.getByUsername({
      username: `${username}`,
   });

   const { data: repos } = await octokit.rest.repos.listForUser({
      username: `${username}`,
   });

   const { data: events } = await octokit.rest.activity.listPublicEventsForUser(
      { username: `${username}`, per_page: 3 }
   );

   const userData = { users, repos, events };

   const preprocessedData = preprocessData(userData);

   // await axios.post("http://localhost:8787/api/github", {
   //    users,
   //    repos,
   //    events,
   // });

   return NextResponse.json(preprocessedData);

   // return NextResponse.json({ users, repos, events }, { status: 200 });
}

function preprocessData(userData) {
   const repoData = userData.repos.map((repo) => {
      return {
         text: `Repository: ${repo.name}.
         Description: ${repo.description || "No description provided"}
         Language: ${repo.language || "Not specified"}
         Stars: ${repo.stargazers_count}
         Created on: ${new Date(repo.created_at).toDateString()}. 
         Last updated on: ${new Date(repo.updated_at).toDateString()}.`,
         metadata: {
            type: "repo",
            repo_name: repo.name,
            repo_full_name: repo.full_name,
            language: repo.language,
            stars: repo.stargazers_count,
            created_at: repo.created_at,
            topics: repo.topics,
            visibility: repo.visibility,
            forks: repo.forks_count,
            open_issues: repo.open_issues_count,
            watchers: repo.watchers,
            isFork: repo.fork,
            pushed_at: repo.pushed_at,
         },
      };
   });

   const eventsData = userData.events.map((event) => {
      return {
         text: `Event: ${event.type}. 
         Repository: ${event.repo.name}. 
         Commits: ${
            event.payload.commits
               ? event.payload.commits
                    .map((commit) => commit.message)
                    .join(", ")
               : "No commits"
         }. 
         Event created on: ${new Date(event.created_at).toDateString()}.`,
         metadata: {
            event_type: event.type,
            event_author: event.actor.login,
            event_repo: event.repo.name,
            event_payload_ref: event.payload.ref,
            event_payload_head: event.payload.head,
            event_payload_before: event.payload.before,
         },
      };
   });

   return {
      users: userData.users,
      repos: [...repoData],
      events: [...eventsData],
   };
}
