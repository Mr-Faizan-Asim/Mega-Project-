import mongoose from 'mongoose';

// Define the schema for user accounts.  A unique email is enforced by MongoDB
// and the password will store a bcrypt hash.
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    // Additional fields can be added here (e.g. role, preferences).  Keeping the
    // schema minimal ensures that sign‑up remains lightweight, as requested.
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export default mongoose.model('User', userSchema);