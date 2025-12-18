import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

const app = express();

// Needed for static file paths in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));

/**
 * ✅ "Frontend-like" home page
 * When you open / in browser, you see a simple page instead of JSON.
 */
app.get("/", (req, res) => {
  res
    .status(200)
    .type("html")
    .send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Mega Planner API</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 28px; line-height: 1.5; }
            .card { max-width: 720px; border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px; }
            code { background: #f3f4f6; padding: 2px 6px; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>✅ Mega Planner Backend is Running</h2>
            <p>This is a simple landing page so it behaves like a "frontend" on <code>/</code>.</p>
            <p>Try these endpoints:</p>
            <ul>
              <li><code>/api/auth</code></li>
              <li><code>/api/chat</code></li>
            </ul>
          </div>
        </body>
      </html>
    `);
});

// Optional: health check (if you still want JSON)
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "mega-planner-backend" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
