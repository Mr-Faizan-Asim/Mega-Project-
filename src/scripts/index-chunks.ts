import fs from "fs";
import path from "path";
import { connectMongo } from "../config/mongo";
import { getEmbedding } from "../config/gemini";

type ChunkDoc = {
  id: string;
  docId: string;
  part: "B" | "F" | "L";
  page: number;
  text: string;
  embedding?: number[];
};

async function main() {
  const { chunksCollection } = await connectMongo();
  const chunksPath = path.join(__dirname, "../../data/chunks.json");
  const raw = fs.readFileSync(chunksPath, "utf-8");
  const chunks: ChunkDoc[] = JSON.parse(raw);

  let count = 0;

  for (const chunk of chunks) {
    if (!chunk.text || chunk.text.length < 30) continue;

    const embedding = await getEmbedding(chunk.text);
    const doc = {
      ...chunk,
      embedding
    };

    await chunksCollection.insertOne(doc);
    count++;

    if (count % 20 === 0) {
      console.log(`Inserted ${count} chunks...`);
    }
  }

  console.log("Done. Total inserted:", count);
}

main().catch(console.error);
