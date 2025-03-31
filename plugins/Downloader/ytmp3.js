import axios from "axios";

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    if (!text) return m.reply("Mana link YouTube-nya?");

    await m.reply(wait);

    try {
        let res = await axios.get(`https://api.nasirxml.my.id/download/ytmp3?url=${encodeURIComponent(text)}`);
        let audioUrl = res.data.result.downloadUrl;

            await conn.sendMessage(m.chat, { audio: { url: audioUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
            
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat mengambil data. Coba lagi nanti.');
    }
}

handler.help = ["ytmp3", "yta", "ytaudio"].map(a => a + " *[YouTube url]*");
handler.tags = ["downloader"];
handler.command = ["ytmp3", "yta", "ytaudio"];

export default handler;
