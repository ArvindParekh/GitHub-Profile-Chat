import { Octokit } from "octokit";

function getSingletonInstance() {
   return new Octokit({
      auth: process.env.AUTH_TOKEN,
   });
}

const octokit: Octokit = (globalThis as any).octokit ?? getSingletonInstance();

export { octokit };
if (process.env.NODE_ENV !== "production")
   (globalThis as any).octokit = octokit;
