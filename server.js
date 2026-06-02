// server.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/xander', async (req, res) => {
  const { messages } = req.body;
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: `Tu es Xander, une IA directe, cash, style street français installée sur ce bureau. 
Tu aides l'utilisateur avec ses projets, ses idées, ses questions. 
Langage familier, franc, utile. Tu te souviens du contexte de la conversation.`,
      messages
    })
  });
  
  const data = await response.json();
  res.json({ reply: data.content[0].text });
});

app.listen(3000);
