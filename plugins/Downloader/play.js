import yts from 'yt-search';
import axios from "axios";

let handler = async (m, { conn, text, setReply, usedPrefix, command }) => {
    if (!text) throw (`Contoh : ${usedPrefix + command} dj aku meriang`);
    setReply("_Tunggu sebentar kak..._");
    try {
        let look = await yts(text);
        
        if (!look.all || look.all.length === 0) {
            throw new Error("Video tidak ditemukan.");
        }

        let convert = look.all[0];
        let res = await axios.get(`https://api.nasirxml.my.id/download/ytmp3?url=${convert.url}`);      

        let audioUrl = res.data.result.downloadUrl;       

        let caption = '';
        caption += `*∘ Title :* ${convert.title}\n`;
        caption += `*∘ Duration :* ${convert.timestamp}\n`;
        caption += `*∘ Viewers :* ${convert.views}\n`;
        caption += `*∘ Upload At :* ${convert.ago}\n`;
        caption += `*∘ Author :* ${convert.author.name}\n`;
        caption += `*∘ Description :* ${convert.description}\n`;
        caption += `*∘ Url :* ${convert.url}\n`;

        conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: convert.title,
                        body: convert.author.name,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: convert.image,
                        sourceUrl: null
                    }
                },
                mentions: [m.sender]
            }
        }, {});

        conn.sendMessage(m.chat, {
            audio: {
                url: audioUrl
            },
            mimetype: 'audio/mpeg' }, {
            quoted: m
        });
    } catch (e) {
        console.error(e);  
        m.reply('lagi error kak');
    }
};

handler.command = handler.help = ['play'];
handler.tags = ['downloader'];
handler.limit = true;

export default handler;