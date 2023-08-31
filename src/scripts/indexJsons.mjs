// Major ref: https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/pinecone
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: `.env.local` });

import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

(async () => {
  const fileNames = fs.readdirSync("jsons");
  const langchainDocs = fileNames.map((fileName) => {
    const filePath = path.join("jsons", fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");

    return new Document({
      metadata: { fileName },
      pageContent: fileContent,
    });
  });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const splitDocs = await textSplitter.splitDocuments(langchainDocs);

  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  await PineconeStore.fromDocuments(
    splitDocs,
    new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
    {
      pineconeIndex,
    }
  );
})();
