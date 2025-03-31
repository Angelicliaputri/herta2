import fs from "fs-extra";
import uploadImage from "../../lib/uploadImage.js";

let handler = async (m, { usedPrefix, text }) => {
  let chat = db.data.chats[m.chat];
  let p = m.quoted ? m.quoted : m;
  let mime = (p.msg || p).mimetype || "";

  if (/image/.test(mime)) {
    await m.reply("Proses kak...");
    let media = await p.download();
    
    // Menggunakan fungsi uploadImage untuk mengunggah gambar
    let link = await uploadImage(media); 
    chat.leaveImage = link; // Set link image sebagai leave image
    m.reply(`Berhasil mengganti leave image`);
  } else {
    m.reply("Reply dengan gambar yang valid!");
  }
};

handler.command = ['setleaveimage', 'setimageleave'];
handler.group = true;
handler.admin = true;

export default handler;
