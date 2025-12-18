import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the connection string provided in the `MONGO_URI`
 * environment variable.  When the connection is successful a log is printed
 * to the console.  Errors are thrown to allow startup to fail fast.
 */
export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  // Mongoose 8 uses strict query mode by default; enabling strictQuery ensures
  // that queries adhere to the defined schema and helps prevent injection attacks.
  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    // The new parser and unified topology options are used internally by Mongoose.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');
}