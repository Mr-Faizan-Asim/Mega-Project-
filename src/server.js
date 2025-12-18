import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

async function bootstrap() {
  // Connect DB only if you have DB configured
  // (If you want to run without DB sometimes, you can guard it)
  await connectDB();

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

/**
 * ✅ Important:
 * Only start listening when you run `node src/server.js`
 * This makes it safe later for serverless wrappers too.
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  bootstrap().catch((err) => {
    console.error("Failed to bootstrap application:", err);
    process.exit(1);
  });
}

export { bootstrap };
