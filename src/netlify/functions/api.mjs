import serverless from "serverless-http";
import dotenv from "dotenv";
import app from "../../app.js";
import { connectDB } from "../../config/db.js";

dotenv.config();

// Cache DB connection across warm invocations
let dbReady = false;

async function ensureDB() {
  if (!dbReady) {
    await connectDB();
    dbReady = true;
  }
}

export const handler = async (event, context) => {
  await ensureDB();
  const wrapped = serverless(app);
  return wrapped(event, context);
};
