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

   await axios.post("http://localhost:8787/api/github", {
      users,
      repos,
      events,
   });

   return new NextResponse("done");

   // return NextResponse.json({ users, repos, events }, { status: 200 });
}
