// src/controllers/chatController.js

import { buildSystemPrompt } from '../utils/promptHelper.js';

export async function chat(req, res) {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: 'The message field is required' });
  }

  try {
    const systemPrompt = await buildSystemPrompt();

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ];

    const payload = {
      model: 'openai/gpt-oss-120b', // or llama3-70b-8192 if you prefer
      messages,
      stream: false,
    };

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorText = (await response.text().catch(() => '')) || '';
      return res.status(response.status).json({
        message: `Groq API error: ${response.status} ${response.statusText}`,
        details: errorText,
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? '';

    return res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
