let handler = async (m, { conn, text }) => {
    if (!text && !m.quoted) return m.reply(`Masukkan teks untuk status atau reply gambar/video/audio dengan caption`);
    let media = null;
    let options = {};
    const jids = [m.sender, m.chat];
 
    if (m.quoted) {
        const mime = m.quoted.mtype || m.quoted.mediaType;
 
        if (mime.includes('image')) {
            media = await m.quoted.download();
            options = {
                image: media,
                caption: text || m.quoted.text || '',
            };
        } else if (mime.includes('video')) {
            media = await m.quoted.download();
            options = {
                video: media,
                caption: text || m.quoted.text || '',
            };
        } else if (mime.includes('audio')) {
            media = await m.quoted.download();
            options = {
                audio: media,
                mimetype: 'audio/mp4', // Pastikan format sesuai
                ptt: true, // Jika ingin dikirim sebagai voice note
            };
        } else {
            options = {
                text: text || m.quoted.text || '',
            };
        }
    } else {
        options = {
            text: text,
        };
    }
 
    return conn.sendMessage("status@broadcast", options, {
        backgroundColor: "#7ACAA7",
        textArgb: 0xffffffff,
        font: 1,
        statusJidList: await (await conn.groupMetadata(m.chat)).participants.map((a) => a.id),
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: jids.map((jid) => ({
                            tag: "to",
                            attrs: { jid: m.chat },
                            content: undefined,
                        })),
                    },
                ],
            },
        ],
    });
};
handler.help = handler.command = ['upsw2'];
handler.tags = ['owner'];
handler.owner = true;
 
export default handler;