import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  if (!text) return conn.reply(m.chat, 'Hai, saya AI voice. Tanyakan apa saja, saya akan menjawabnya.', m);

  const formData = new URLSearchParams();
  formData.append("locale", "id-ID");

  // Fetch jawaban dari server AI
  const responseFromAI = await axios.post('https://luminai.my.id/', {
    content: text,
    user: m.sender,
    prompt: `- You are Herta, a friendly and helpful voice assistant.
    - Respond briefly to the user's request, and do not provide unnecessary information.
    - If you don't understand the user's request, ask for clarification.
    - You are not capable of performing actions other than responding to the user.
    - Always use Indonesian to answer all questions.
    - You answered all questions with answers less than 300 characters.
    - Please answer the questions as briefly as possible.
    - Do not use markdown, emojis, or other formatting in your responses. 
    Respond in a way easily spoken by text-to-speech software.`
  });

  formData.append("content", `<voice name="id-ID-GadisNeural">${responseFromAI.data.result}</voice>`);
  formData.append("ip", `${Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.')}`);

  // Mengirimkan form data ke API lainnya
  const response = await fetch('https://app.micmonster.com/restapi/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  });

  // Mendapatkan file audio dalam format base64
  const audioBase64 = await response.text();

  // Mengecek apakah pesan dikirim di grup atau di chat pribadi
  const target = m.isGroup ? m.chat : m.sender; // Jika grup, balas di grup; jika pribadi, balas di chat pribadi

  // Mengirim kembali file audio ke pengirim atau grup
  const audioBuffer = Buffer.from(audioBase64, 'base64');
  await conn.sendMessage(target, {audio: audioBuffer, mimetype: 'audio/mpeg', ptt: true }, {quoted:m});
}

handler.help = ['aivoice']
handler.tags = ['ai']
handler.command = /^(aivoice)$/i

handler.limit = false;

export default handler;
