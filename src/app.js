import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';

// Create and configure an Express application.  This file does not start the
// server; it merely sets up middleware and routes.  Exporting the app makes it
// easier to write integration tests without opening a network port.
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).send(`
    <h2>Mega Planner backend is running ✅</h2>
    <p>Try: <code>/api/auth</code> and <code>/api/chat</code></p>
  `);
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;