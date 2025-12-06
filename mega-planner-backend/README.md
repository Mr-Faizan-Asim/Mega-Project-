# Mega Planner Backend

This repository contains a fully‑fledged backend server built with **Node.js**, **Express** and **MongoDB**.  Its purpose is to provide a foundation for a “Mega Planner” application which authenticates users and exposes a chat endpoint powered by xAI’s Grok model.  The chat endpoint is designed with prompt‑engineering best practices in mind【450141415532444†L213-L224】【450141415532444†L260-L266】 and can optionally include context from a Mega Plan constitution provided as a PDF.

## Features

* **User registration and login** – new users can sign up with a name, email and password and existing users can sign in to obtain a JSON Web Token (JWT).  Passwords are securely hashed using `bcryptjs` and tokens are signed with a configurable secret.
* **Protected chat endpoint** – authenticated users can send prompts to the `/api/chat` endpoint.  The server builds a system prompt from a base message (configurable in `.env`) and, if available, includes a summary of the Mega Plan constitution.  The prompt is then forwarded to the xAI Grok API using the model specified in the environment.  A single response is returned as JSON.
* **Prompt engineering** – the system prompt separates the instruction and context clearly (using a `###` delimiter) and keeps instructions concise and specific【450141415532444†L243-L246】.  When summarising the PDF the extracted text is truncated to avoid exceeding context limits.
* **Modular structure** – the code is organised into models, controllers, routes, middleware and utilities for maintainability and scalability.

## Requirements

* Node.js ≥ 18
* MongoDB instance
* An xAI API key to access the Grok model (see [The Hitchhiker’s Guide to Grok](https://docs.x.ai/docs/tutorial) for details on creating an account and generating a key【593220820383723†L40-L59】).

## Getting Started

1. **Clone the repository** and install dependencies:

   ```bash
   npm install
   ```

2. **Create a `.env` file** in the project root by copying `.env.example` and filling in the variables:

   * `MONGO_URI` – MongoDB connection string (include the database name).
   * `JWT_SECRET` – secret for signing JWTs.
   * `XAI_API_KEY` – your xAI API key【593220820383723†L52-L59】.
   * `XAI_MODEL` – model name (e.g. `grok-4`).
   * `BASE_SYSTEM_PROMPT` – a base system prompt instructing the assistant to act professionally and respect the Mega Plan regulations.

3. **Optional – provide the Mega Plan constitution**: if you have a PDF containing regulations or a constitution you would like the model to reference, place it in a folder called `data` at the root of the repository and name the file `mega_plan.pdf`.  The server uses the `pdf-parse` library to extract text from this file on startup and includes a truncated summary in the system prompt.  If no PDF is found the base prompt alone is used.

4. **Start the server**:

   ```bash
   npm start
   ```

   The server connects to MongoDB and listens on the port defined by the `PORT` environment variable (default 5000).  A simple health check is available at `/`.

## API Endpoints

All endpoints are prefixed with `/api`.

### `POST /api/auth/signup`

Create a new user.

**Request body**

```json
{
  "name": "Your Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (201)

```json
{
  "user": {
    "id": "64c8...",
    "name": "Your Name",
    "email": "user@example.com",
    "createdAt": "2025-12-06T10:00:00.000Z"
  },
  "token": "<jwt-token>"
}
```

### `POST /api/auth/signin`

Authenticate an existing user.

**Request body**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200)

Same format as the sign‑up response.

### `POST /api/chat`

Send a prompt to the Grok API.  This route requires a valid JWT in the `Authorization` header (`Bearer <token>`).

**Request headers**

```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request body**

```json
{
  "message": "Explain the key principles of the Mega Plan constitution."
}
```

**Response** (200)

```json
{
  "reply": "The Mega Plan constitution emphasises ..."
}
```

Under the hood the server constructs a `messages` array containing a **system** message and the **user** message.  It then calls the xAI API at `https://api.x.ai/v1/chat/completions` with the model set to the value of `XAI_MODEL`.  You can see an example of a curl request in xAI’s tutorial【593220820383723†L75-L95】.  If the API responds with an error, the server proxies the status and error text back to the client.

## Prompt Engineering Considerations

The code in this repository attempts to follow widely recognised prompt‑engineering guidelines:

* **Start simple and iterate** – the base prompt is concise and instructs the model to act as a professional planning assistant.  Additional context from the Mega Plan constitution is appended only when available【450141415532444†L213-L224】.
* **Clear instruction and context separation** – the system prompt separates instruction from context using a `###` delimiter.  This makes it easier for the model to distinguish between the task description and supporting facts【450141415532444†L243-L246】.
* **Specificity** – the base prompt asks the model to respond with clarity and conciseness.  Providing specific directions helps reduce ambiguity and encourages more relevant answers【450141415532444†L260-L266】.
* **Avoid impreciseness** – by defining the role of the assistant and including only relevant excerpts from the constitution, the prompt avoids vague or open‑ended instructions【450141415532444†L305-L322】.

These strategies are based on general prompt‑engineering best practices and ensure that the chat endpoint behaves predictably and professionally.

## Notes

* This backend does not include a user interface – it is intended to be consumed by a front‑end application or testing tool such as Postman.
* The xAI API may incur costs and requires an active subscription.  You can generate an API key from the xAI Console【593220820383723†L52-L59】.
* If you wish to record conversation history or implement additional functionality (rate limiting, administrative roles, etc.) the modular code structure makes it straightforward to extend.

## License

This project is licensed under the MIT License.