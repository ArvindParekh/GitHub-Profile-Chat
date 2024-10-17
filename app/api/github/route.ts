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

   // await axios.post("http://localhost:8787/api/github", preprocessedData);

   return new NextResponse(preprocessedData);

   // return NextResponse.json({ users, repos, events }, { status: 200 });
}

// function preprocessData(userData) {
//    const repoData = userData.repos.map((repo) => {
//       return {
//          text: `Repository: ${repo.name}.
//          Description: ${repo.description || "No description provided"}
//          Language: ${repo.language || "Not specified"}
//          Stars: ${repo.stargazers_count}
//          Created on: ${new Date(repo.created_at).toDateString()}.
//          Last updated on: ${new Date(repo.updated_at).toDateString()}.`,
//          metadata: {
//             type: "repo",
//             repo_name: repo.name,
//             repo_full_name: repo.full_name,
//             language: repo.language,
//             stars: repo.stargazers_count,
//             created_at: repo.created_at,
//             topics: repo.topics,
//             visibility: repo.visibility,
//             forks: repo.forks_count,
//             open_issues: repo.open_issues_count,
//             watchers: repo.watchers,
//             isFork: repo.fork,
//             pushed_at: repo.pushed_at,
//          },
//       };
//    });

//    const eventsData = userData.events.map((event) => {
//       return {
//          text: `Event: ${event.type}.
//          Repository: ${event.repo.name}.
//          Commits: ${
//             event.payload.commits
//                ? event.payload.commits
//                     .map((commit) => commit.message)
//                     .join(", ")
//                : "No commits"
//          }.
//          Event created on: ${new Date(event.created_at).toDateString()}.`,
//          metadata: {
//             event_type: event.type,
//             event_author: event.actor.login,
//             event_repo: event.repo.name,
//             event_payload_ref: event.payload.ref,
//             event_payload_head: event.payload.head,
//             event_payload_before: event.payload.before,
//          },
//       };
//    });

//    return {
//       users: userData.users,
//       repos: [...repoData],
//       events: [...eventsData],
//    };
// }

function preprocessData(userData) {
   const userSummary = `User Info:
   Name: ${userData.users.name}.
   GitHub Username: ${userData.users.username}.
   Bio: ${userData.users.bio || "No bio available"}.
   Company: ${userData.users.company || "Not specified"}.
   Followers: ${userData.users.followers}.
   Following: ${userData.users.following}.
   Public Repos: ${userData.users.public_repos}.`;
 
   const repoSummaries = userData.repos.map((repo, index) => `
   Repo Info (${index + 1}):
   Repository: ${repo.name}.
   Description: ${repo.description || "No description provided"}.
   Language: ${repo.language || "Not specified"}.
   Stars: ${repo.stargazers_count}.
   Created on: ${new Date(repo.created_at).toDateString()}.
   Last updated on: ${new Date(repo.updated_at).toDateString()}.
   Forked: ${repo.fork ? "Yes" : "No"}.
   `).join('\n');
 
   const eventSummaries = userData.events.map((event, index) => `
   Event Info (${index + 1}):
   Event Type: ${event.type}.
   Repository: ${event.repo.name}.
   Commits: ${
     event.payload.commits
       ? event.payload.commits.map((commit) => commit.message).join(", ")
       : "No commits"
   }.
   Event created on: ${new Date(event.created_at).toDateString()}.`).join('\n');
 
   return `
   ${userSummary}
   ${repoSummaries}
   ${eventSummaries}
   `;
 }
 
/*
   Data format:


   User Info:
   Name - 
   Description - 
   etc

   Repo Info:
   1. 14-day-javascript:
      Description - 
      Stars - 

   2. 14-day-javascript:
      Description - 
      Stars - 

   Event Info:
   1. 


*/
