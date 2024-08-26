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

app.get("/", (c) => {
   return c.text("Hello Hono!");
});

// Get output response from AI model
app.post("/", async (c) => {
   const body = await c.req.json();
   // console.log(body);

   const prompt = body.prompt;
   const memoryData = JSON.stringify(body.memoryData);

   const stream = await c.env.AI.run("@hf/mistral/mistral-7b-instruct-v0.2", {
      messages: [
         {
            role: "system",
            content: `You are a GitHub Profile chat system. Users will send you their github profile data and ask you questions regarding it. Your job is to reference that memory and always answer in the context of that memory. You have to answer the questions the users ask from that memory. The memory will be in the form of json data. If you cannot find the information in the memory, let the user know. Also, provide all the information in a human-readable format.
            
            Following is your memory: ${memoryData}`,
         },
         {
            role: "user",
            content: prompt,
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
});

// To put the data fetched from github into a KV store
app.post("/updateDb", async (c) => {
   const body: {
      userData: object;
      userStargazers: object;
      userEvents: object;
      // reposData: object;
   } = await c.req.json();

   const { userData, userStargazers, userEvents } = body;

   //check if user already exists
   const userName = userData.name;
   console.log(userName);
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
            JSON.stringify(userData)
         );
         console.log(value);
         await c.env.DB.put(
            `userStargazers: ${userName}`,
            JSON.stringify(userStargazers)
         );
         await c.env.DB.put(
            `userEvents: ${userName}`,
            JSON.stringify(userEvents)
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
   const body: { query: string, userName: string } = await c.req.json();
   const query = body.query;
   const username = body.userName

   // Ask AI to tell you the key to search in the KV store
   const response = await c.env.AI.run("@hf/mistral/mistral-7b-instruct-v0.2", {
      messages: [
         {
            role: "system",
            content: "system information",
         },
         {
            role: "user",
            content: query,
         },
      ],
   });

   const keyToRetrieve = response;

   const retrievedValue = await c.env.DB.get(`${keyToRetrieve}: ${username}`)

   //bring the logic from '/' post route here.

   // The 'query' received here will be a simple prompt.
   // Do something to figure out the relative key that needs to be fetched from the KV store for accurate output.
   // get the value from the KV database
   // bring in the logic from the '/' post route here, call the AI model with system information, KV data, and user prompt and generatea an output
   // send the output back to the user
});

export default app;
