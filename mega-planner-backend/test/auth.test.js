import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';

// Import the Express app and database connector. Because our app does not
// automatically connect to MongoDB or start listening on a port, we can use it
// directly in tests.
import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

let mongo;

/*
 * Before running any tests, spin up an in-memory MongoDB server and connect
 * Mongoose to it. This ensures that tests do not depend on an external
 * database and can run in isolation. The `MongoMemoryServer` package
 * automatically downloads and starts MongoDB.
 */
before(async () => {
  mongo = await MongoMemoryServer.create();

  // Configure environment variables for the test database
  process.env.MONGO_URI = mongo.getUri();
  process.env.JWT_SECRET = 'testsecret';
  process.env.BASE_SYSTEM_PROMPT = 'Test system prompt';

  // Groq-specific env vars used by chatController
  process.env.GROQ_API_KEY = 'dummy_key';
  process.env.GROQ_MODEL = 'llama3-70b-8192';

  await connectDB();

  // Mock the global fetch to avoid real network calls to Groq. The chat
  // controller will call fetch to the Groq API; here we intercept and return
  // a predictable response.
  global.fetch = async () => {
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ choices: [{ message: { content: 'Test reply' } }] }),
      text: async () => '',
    };
  };
});

// After all tests, close Mongo connections and stop the in-memory server.
after(async () => {
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
});

// Helper for supertest
const request = supertest(app);

test('should register a new user and return token', async () => {
  const res = await request.post('/api/auth/signup').send({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
  });
  assert.equal(res.status, 201);
  assert.ok(res.body.token);
  assert.equal(res.body.user.email, 'test@example.com');
});

test('should login an existing user and return token', async () => {
  const res = await request.post('/api/auth/signin').send({
    email: 'test@example.com',
    password: 'password',
  });
  assert.equal(res.status, 200);
  assert.ok(res.body.token);
});

test('should reject chat endpoint without token', async () => {
  const res = await request.post('/api/chat').send({ message: 'Hello' });
  assert.equal(res.status, 401);
});

test('should respond to chat with valid token', async () => {
  // Login to get a token
  const loginRes = await request.post('/api/auth/signin').send({
    email: 'test@example.com',
    password: 'password',
  });
  const token = loginRes.body.token;

  const res = await request
    .post('/api/chat')
    .set('Authorization', `Bearer ${token}`)
    .send({ message: 'Hello' });

  assert.equal(res.status, 200);
  assert.equal(res.body.reply, 'Test reply');
});
