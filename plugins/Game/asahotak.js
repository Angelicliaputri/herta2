import fs from 'fs-extra';
let timeout = 120000;
let poin = 4999;
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.game = conn.game ? conn.game : {};
  let id = "asahotak-" + m.chat;
  if (id in conn.game)
    return conn.reply(
      m.chat,
      "Masih ada soal belum terjawab di chat ini",
      conn.game[id][0]
    );
  let src = JSON.parse(fs.readFileSync("./lib/game/asahotak.json", "utf-8"));
  let json = src[Math.floor(Math.random() * src.length)];
  let caption = `
Soal:  
*${json.soal}*

Timeout: *${(timeout / 1000).toFixed(2)} detik*  
Ketik ${usedPrefix}hasah untuk bantuan  
Bonus: ${poin} XP  
`.trim();
  conn.game[id] = [
    await conn.reply(m.chat, caption, m),
    json,
    poin,
    setTimeout(() => {
      if (conn.game[id])
        conn.reply(
          m.chat,
          `Waktu habis!\nJawabannya adalah *${json.jawaban}*`,
          conn.game[id][0]
        );
      delete conn.game[id];
    }, timeout),
  ];
};
handler.help = ["asahotak"];
handler.tags = ["game"];
handler.command = /^asahotak$/i;

handler.onlyprem = true;
handler.game = true;

export default handler;
