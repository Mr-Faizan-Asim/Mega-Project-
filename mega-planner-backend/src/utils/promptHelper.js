// src/utils/promptHelper.js

/**
 * Build the system prompt for the chat model.
 *
 * The base prompt is provided via the BASE_SYSTEM_PROMPT environment variable.
 * This prompt is responsible for:
 *  - Defining the assistant's role (UK Building Regulations assistant)
 *  - Limiting the assistant to specific sources (e.g. Approved Documents B, F, L)
 *  - Enforcing strict rules about not inventing numbers or requirements
 *  - Defining answer style and referencing conventions
 *
 * If BASE_SYSTEM_PROMPT is not set, we fall back to a sensible default.
 *
 * @returns {Promise<string>} A system message to send to the model.
 */
export async function buildSystemPrompt() {
  if (process.env.BASE_SYSTEM_PROMPT && process.env.BASE_SYSTEM_PROMPT.trim() !== '') {
    return process.env.BASE_SYSTEM_PROMPT;
  }

  // Fallback default if the env variable is missing
  return (
    'You are MegaPlannerBot, an assistant helping with UK Building Regulations in England.\n' +
    'You only have access to extracted text from Approved Documents B (Fire safety), ' +
    'F (Ventilation), and L (Conservation of fuel and power).\n\n' +
    'Answer using ONLY information that could reasonably come from these documents. ' +
    'If they do not clearly answer the question, say: ' +
    '"I cannot find a definitive answer in the provided regulations." ' +
    'Do not invent specific numeric values or requirements. Be concise, practical and professional.'
  );
}
