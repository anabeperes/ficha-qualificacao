export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'GEMINI_API_KEY não configurada na Vercel' } });
  }

  const { system, text } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: { message: 'Texto da ficha ausente' } });
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system || '' }] },
          contents: [{ role: 'user', parts: [{ text }] }],
          generationConfig: { maxOutputTokens: 4096 },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const msg = (data.error && data.error.message) || 'Erro na API do Gemini';
      return res.status(response.status).json({ error: { message: msg } });
    }

    const out =
      (data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.map((p) => p.text || '').join('')) ||
      '';

    if (!out) {
      return res.status(502).json({ error: { message: 'Resposta vazia do Gemini' } });
    }

    res.status(200).json({ text: out });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
}
