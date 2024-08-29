import { octokit } from "@/octokit-config";
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

   return NextResponse.json({ users, repos, events }, { status: 200 });
}
