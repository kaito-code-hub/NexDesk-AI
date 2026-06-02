const express = require('express');
const app = express();
app.use(express.json());

app.post('/xander', async (req, res) => {
  try {
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
        system: "Tu es Xander, une IA directe, cash, style street français. Tu aides avec les projets et questions. Langage familier, franc, utile.",
        messages
      })
    });
    const data = await response.json();
    res.json({ reply: data.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Erreur serveur." });
  }
});

app.listen(process.env.PORT || 3000);
