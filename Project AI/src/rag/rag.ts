import { connectMongo } from "../config/mongo";
import { getEmbedding, chatModel } from "../config/gemini";

type ChunkDoc = {
  _id: any;
  docId: string;
  part: "B" | "F" | "L";
  page: number;
  text: string;
};

async function searchChunks(query: string, part?: "B" | "F" | "L", k = 8): Promise<ChunkDoc[]> {
  const { chunksCollection } = await connectMongo();
  const queryEmbedding = await getEmbedding(query);

  const pipeline: any[] = [
    {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: "embedding",
        numCandidates: 100,
        limit: k,
        index: "regsVectorIndex" // name of the vector index you created in Atlas
      }
    }
  ];

  if (part) {
    pipeline.unshift({ $match: { part } });
  }

  const results = await chunksCollection.aggregate(pipeline).toArray();
  return results as ChunkDoc[];
}

function buildPrompt(question: string, chunks: ChunkDoc[]): string {
  const sources = chunks
    .map((c, i) => `Source ${i + 1} [Part ${c.part}, page ${c.page}]:\n${c.text}`)
    .join("\n\n");

  return `
You are an assistant helping with UK Building Regulations.
You have access ONLY to the following sources (Approved Documents B, F, L extracted from PDF).
Answer the user question using ONLY these sources.

If the regulations in these sources do not clearly answer the question, say:
"I cannot find a definitive answer in the provided regulations."

Rules:
- Do not invent specific numbers, distances, or performance values not present in the sources.
- Refer to Parts and pages when you rely on a specific source.
- Be concise and practical.

SOURCES:
${sources}

USER QUESTION:
${question}
`;
}

export async function answerWithRag(question: string, part?: "B" | "F" | "L") {
  const chunks = await searchChunks(question, part, 8);
  const prompt = buildPrompt(question, chunks);

  const result = await chatModel.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  return {
    answer: result.response.text(),
    sources: chunks.map((c, i) => ({
      label: `Source ${i + 1}`,
      part: c.part,
      page: c.page
    }))
  };
}
