import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI!);

let db: Db;
let chunksCollection: Collection;

export async function connectMongo() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGO_DB);
    chunksCollection = db.collection(process.env.MONGO_COLLECTION!);
    console.log("MongoDB connected");
  }
  return { db, chunksCollection };
}
