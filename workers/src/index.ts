import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { stream } from "hono/streaming";

type Bindings = {
   AI: Ai;
   DB: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

export interface Env {
   AI: Ai;
   DB: KVNamespace;
}

app.use(cors());

app.get("/", async (c) => {
   await c.env.DB.delete("userStargazers: Arvind");
   const res = await c.env.DB.list();
   console.log(res);
   return c.text("Hello, Hono!");
});

// Get output response from AI model
app.post("/", async (c) => {
   const body = await c.req.json();

   const prompt = body.prompt;
   const memoryData = JSON.stringify(body.memoryData);
});

// To put the data fetched from github into a KV store
app.post("/updateDb", async (c) => {
   const body: {
      userData: object;
      userStargazer: object;
      userEvents: object;
      userRepos: object;
      // reposData: object;
   } = await c.req.json();

   const { userData, userStargazer, userEvents, userRepos } = body;
   // console.log("User Data is: \n", userData);
   // console.log("Stargazer Data is: \n", userStargazer);
   // console.log("Events Data is: \n", userEvents);
   // console.log("Repos Data is: \n", userRepos);

   //check if user already exists
   const userName = userData.name;
   const userExists = await c.env.DB.get(`userData: ${userName}`);

   if (userExists) {
      return new Response(
         "User data already exists in the database\nNot storing again...",
         {
            status: 200,
         }
      );
   } else {
      try {
         let value = await c.env.DB.put(
            `userData: ${userName}`,
            JSON.stringify(userData),
            { expirationTtl: 3600 }
         );
         await c.env.DB.put(
            `userStargazers: ${userName}`,
            JSON.stringify(userStargazer),
            { expirationTtl: 3600 }
         );
         await c.env.DB.put(
            `userEvents: ${userName}`,
            JSON.stringify(userEvents),
            { expirationTtl: 3600 }
         );
         await c.env.DB.put(
            `userRepos: ${userName}`,
            JSON.stringify(userRepos),
            { expirationTtl: 3600 }
         );
         // await c.env.DB.put(`reposData: ${userName}`, JSON.stringify(reposData));
      } catch (error) {
         console.log("There was an error adding data to KV store: ", error);
         return new Response(String(error));
      }

      return new Response("Data added to KV store", { status: 200 });
   }
});

app.post("/retrieveDb", async (c) => {
   const body: { query: string; userName: string } = await c.req.json();
   const query = body.query;
   const username = body.userName;

   console.log("username is: ", username);

   // Ask AI to tell you the key to search in the KV store
   const response = await c.env.AI.run("@cf/meta/llama-3-8b-instruct", {
      messages: [
         {
            role: "system",
            content: `You are an AI assistant tasked with determining which key from a Cloudflare KV store is most likely to contain the data that a user is asking about. The KV store contains three keys:

    "userData": Contains general information about the user.
    "userEvents": Contains records of the user’s activities.
    "userStargazers": Contains data related to repositories the user has starred.

When you receive a prompt, your task is to analyze it and respond with only one of the following three key names:

    "userData"
    "userEvents"
    "userStargazers"

Instructions:

    Do not provide any additional text, explanations, or context.
    Do not state if there's not enough information.
    Always respond with exactly one of the three key names.

Examples:

    If the prompt involves general user information, respond with "userData".
    If the prompt involves activities or events, respond with "userEvents".
    If the prompt involves starred repositories, respond with "userStargazers".

No matter the query, return only one of the three key names mentioned above. And always reply without the quotes.`,
         },
         {
            role: "user",
            content: query,
         },
      ],
   });

   const keyToRetrieve = response.response;
   console.log("The key to retrieve is: ", `${keyToRetrieve}: ${username}`);

   const retrievedValue = await c.env.DB.get(`${keyToRetrieve}: ${username}`);

   console.log("Retrieved value is: ", retrievedValue);

   //bring the logic from '/' post route here.
   const stream = await c.env.AI.run("@hf/mistral/mistral-7b-instruct-v0.2", {
      messages: [
         {
            role: "system",
            content: `You are a GitHub Profile chat system. Users will send you their github profile data and ask you questions regarding it. Your job is to reference that memory and always answer in the context of that memory. You have to answer the questions the users ask from that memory. The memory will be in the form of json data. If you cannot find the information in the memory, let the user know. Also, provide all the information in a human-readable format.
            
            Following is your memory: ${retrievedValue}`,
         },
         {
            role: "user",
            content: query,
         },
      ],
      // stream: true,
   });

   return Response.json(
      stream
      //   {
      //     headers: { "content-type": "text/plain" },
      //  }
   );

   // The 'query' received here will be a simple prompt.
   // Do something to figure out the relative key that needs to be fetched from the KV store for accurate output.
   // get the value from the KV database
   // bring in the logic from the '/' post route here, call the AI model with system information, KV data, and user prompt and generatea an output
   // send the output back to the user
});

export default app;
