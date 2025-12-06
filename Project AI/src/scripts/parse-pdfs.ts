import fs from "fs";
import path from "path";
import pdf from "pdf-parse";

type Chunk = {
  id: string;
  docId: string;
  part: "B" | "F" | "L";
  page: number;
  text: string;
};

const MAX_CHARS = 2000;  // rough chunk size

async function parsePdfToChunks(filePath: string, docId: string, part: "B" | "F" | "L"): Promise<Chunk[]> {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);

  // pdf-parse returns a single text string; for better control,
  // in future you can switch to a lib that gives per-page text.
  const fullText = data.text;

  const rawChunks: string[] = [];
  for (let i = 0; i < fullText.length; i += MAX_CHARS) {
    rawChunks.push(fullText.slice(i, i + MAX_CHARS));
  }

  const chunks: Chunk[] = rawChunks.map((t, idx) => ({
    id: `${part}-${idx}`,
    docId,
    part,
    page: idx + 1, // dummy for now; you can map real pages later
    text: t.trim()
  }));

  return chunks;
}

async function main() {
  const base = path.join(__dirname, "../../data");

  const lChunks = await parsePdfToChunks(
    path.join(base, "part_L.pdf"),
    "ADL_Vol1",
    "L"
  );

  const fChunks = await parsePdfToChunks(
    path.join(base, "part_F.pdf"),
    "ADF_Vol1",
    "F"
  );

  const bChunks = await parsePdfToChunks(
    path.join(base, "part_B.pdf"),
    "ADB_Vol1",
    "B"
  );

  const all = [...lChunks, ...fChunks, ...bChunks];

  fs.writeFileSync(path.join(base, "chunks.json"), JSON.stringify(all, null, 2));
  console.log("Saved chunks.json with", all.length, "chunks");
}

main().catch(console.error);
