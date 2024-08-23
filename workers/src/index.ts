import { Hono } from "hono";
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

// Get response from AI model
app.post("/", async (c) => {
   const body = await c.req.json();
   console.log(body);

   //  if (body.memoryData) {
   //     memoryData = body.memoryData;

   //     return c.json({
   //        message: "memoryData updated",
   //     });
   //  }

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

   const headers = c.req.header("Authorization");
   const query = c.req.query("param");

   return Response.json(
      stream
      //   {
      //     headers: { "content-type": "text/plain" },
      //  }
   );
});

// to put the data fetched from github into a KV store
app.post('/updateDb', async (c)=> {

})

export default app;
