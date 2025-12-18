import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import app from './app.js';

// Load environment variables
dotenv.config();

async function bootstrap() {
  await connectDB();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap application:', err);
  process.exit(1);
});