import { Context, Hono } from "hono";
import { cors } from "hono/cors";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import {
   GoogleGenerativeAIEmbeddings,
   ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { ChatCloudflareWorkersAI } from "@langchain/cloudflare";
import { TaskType } from "@google/generative-ai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
   RunnablePassthrough,
   RunnableSequence,
} from "@langchain/core/runnables";

type Bindings = {
   Ai: Ai;
   SUPABASE_URL_GITCHAT: string;
   SUPABASE_API_KEY: string;
   GOOGLE_API_KEY: string;
   CLOUDFLARE_ACCOUNT_ID: string;
   CLOUDFLARE_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(cors());

// app.post("/api/github", async (c) => {
//    const userData = await c.req.text();
//    const username = userData.slice(17, 29);
//    console.log(username);
//    return c.json(userData);
// });

app.post("/api/github", async (c) => {
   const userData = await c.req.text();
   const username = userData.slice(17, 29);
   //    console.log(userData);

   // const preprocessedUserData =

   const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ["\n\n", "\n", " ", ""],
   });
   const output = await splitter.createDocuments([userData]);

   const outputWithMetadata = output.map((doc) => ({
      ...doc,
      metadata: { username }, // Adding the username as metadata
   }));

   const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004", // 768 dimensions
      apiKey: c.env.GOOGLE_API_KEY,
   });

   const client = createClient(
      c.env.SUPABASE_URL_GITCHAT,
      c.env.SUPABASE_API_KEY
   );

   await SupabaseVectorStore.fromDocuments(outputWithMetadata, embeddings, {
      client,
      tableName: "documents",
   });

   //    return c.body("done");
   return c.json(output);
});

app.post("/api/query-from-prompt", async (c) => {
   console.log("hehehrehre");
   const { query, userName } = await c.req.json();

   // creating the standalone question from user's prompt
   //    const llm = new ChatGoogleGenerativeAI({
   //       apiKey: c.env.GOOGLE_API_KEY,
   //       model: "gemini-1.5-flash",
   //    });

   const llm = new ChatCloudflareWorkersAI({
      model: "@cf/meta/llama-2-7b-chat-int8",
      cloudflareAccountId: c.env.CLOUDFLARE_ACCOUNT_ID,
      cloudflareApiToken: c.env.CLOUDFLARE_API_KEY,
   });

   const standaloneQuestionTemplate = ` Given a question or a query, convert it into a standalone question or query.
    question: {question} 
    standalone question:`;

   const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
      standaloneQuestionTemplate
   );

   //creating embeddings from the standalone question and retrieving relevant embeddings from the supbase vector store

   const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: c.env.GOOGLE_API_KEY,
      model: "text-embedding-004",
   });

   const client = new SupabaseClient(
      c.env.SUPABASE_URL_GITCHAT,
      c.env.SUPABASE_API_KEY
   );

   const vectorStore = new SupabaseVectorStore(embeddings, {
      client,
      tableName: "documents",
      queryName: "match_documents",
   });

   const retriever = vectorStore.asRetriever();

   function combineDocuments(docs) {
      return docs.map((doc) => doc.pageContent).join("\n\n");
   }

   // generating an answer to the user question using the retrieved information from the vector store and the original user question/prompt

   const answerTemplate = `You are a helpful and enthusiastic assistant who can answer a given question about any user's GitHub profile based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to hit the creator at twitter.com/ArvindParekh_21. Don't try to make up an answer. Always speak as if you were chatting to a friend.
    context: {context}
    question: {question}
    answer:`;

   const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

   //    const chain = standaloneQuestionPrompt
   //       .pipe(llm)
   //       .pipe(new StringOutputParser())
   //       .pipe(retriever);

   const standaloneQuestionChain = standaloneQuestionPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

   const retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDocuments,
   ]);

   const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

   const chain = RunnableSequence.from([
      {
         standalone_question: standaloneQuestionChain,
         original_input: new RunnablePassthrough(),
      },
      {
         context: retrieverChain,
         question: ({ original_input }) => original_input.question,
      },
      answerChain,
   ]);

   const response = await chain.invoke({
      question:
         // "I would like to know how many people are following the user. Also, I'd like to know what projects the user is currently working on and which organization he has contributed the most to.",
         query,
   });

   console.log(response);

   return c.json(response);
});

export default app;

// Current Problems:
// 1. The database keeps on expanding with every new github user. Need a way to limit that
// 2. The output is not satisfactory. This is because the embeddings are created from json and not actual textual data. Try processing the json data into textual format and then create embeddings from that and see how the output changes.
//       Fixed this. Preprocessed the json data and created textual summary of it, which can now be splitted and embeddings can be created.
