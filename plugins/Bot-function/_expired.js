import fs from 'fs-extra';
import toMs from 'ms';
import ms from 'parse-ms';
const { generateWAMessageFromContent, proto } = (await import("baileys")).default;

let handler = m => m;

handler.before = async function (m) {
    try {
        const data = db.data.chats;

        async function checkExpiration() {
            const currentTime = Date.now();

            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const item = data[key];

                    if (item.expired !== 0 && item.expired < currentTime) {
                        console.log(`Sewa '${key}' telah berakhir!`);
                        delete global.db.data.chats[key];

                        let photo = fotoRandom.getRandom();
                        let Ownerin = `${nomerOwner}@s.whatsapp.net`;
                        let text = `
––––––『 *SEWA EXPIRED* 』––––––
🔰 *Group*: ${item.name}
👤 *Creator*: ${item.creator}
🆔 *Group ID*: ${item.id}
⏳ *Waktu Order*: ${item.timeOrder}
📆 *Expired*: ${item.timeEnd}
`;

                        // Mengirim pesan ke owner
                        conn.sendMessage(Ownerin, { image: { url: photo }, caption: text });

                        // Mengirim pesan ke grup dengan tombol interaktif
                        let buttonMsg = generateWAMessageFromContent(key, {
                            viewOnceMessage: {
                                message: {
                                    interactiveMessage: proto.Message.InteractiveMessage.create({
                                        body: proto.Message.InteractiveMessage.Body.create({
                                            text: `⚠️ *Waktu sewa grup ini telah habis!* ⚠️\n\nHubungi owner untuk memperpanjang sewa atau biarkan bot keluar otomatis.`,
                                        }),
                                        footer: proto.Message.InteractiveMessage.Footer.create({
                                            text: "© Bot-V2",
                                        }),
                                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                            buttons: [                    
                                                {
                                                    name: "cta_url",
                    buttonParamsJson:
                      '{\"display_text\":\"Creator\",\"url\":\"https://wa.me/6281401689098\",\"merchant_url\":\"https://wa.me/+6281401689098\"}"}',
                                                }
                                            ],
                                        }),
                                    }),
                                },
                            },
                        }, { quoted: m, userJid: m });

                        await conn.relayMessage(key, buttonMsg.message, { messageId: buttonMsg.key.id });

                        // Menunggu 3 detik sebelum keluar dari grup
                        await sleep(3000);
                        await conn.groupLeave(key);
                    }
                }
            }
        }

        setTimeout(checkExpiration, 2000);

        setInterval(async () => {
            try {
                Object.values(db.data.chats).forEach(async (chat) => {
                    if (chat.expired <= 0) return;

                    let timeLeft = ms(chat.expired - Date.now());
                    if (timeLeft.days === 3 || timeLeft.days === 10 || timeLeft.days === 1) {
                        let teks = `⏳ *Masa sewa tersisa*\n\n📌 *Group*: ${chat.name}\n🆔 *ID*: ${chat.id}\n⏱ *Expire*: ${timeLeft.days} Hari, ${timeLeft.hours} Jam, ${timeLeft.minutes} Menit`;

                        let buttonReminder = generateWAMessageFromContent(chat.id, {
                            viewOnceMessage: {
                                message: {
                                    interactiveMessage: proto.Message.InteractiveMessage.create({
                                        body: proto.Message.InteractiveMessage.Body.create({ text: teks }),
                                        footer: proto.Message.InteractiveMessage.Footer.create({ text: "© Bot-V2" }),
                                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                            buttons: [
                                                {
                                                    name: "cta_url",
                    buttonParamsJson:
                      '{\"display_text\":\"Creator\",\"url\":\"https://wa.me/6281401689098\",\"merchant_url\":\"https://wa.me/+6281401689098\"}"}',
                                                }
                                            ],
                                        }),
                                    }),
                                },
                            },
                        }, { quoted: m, userJid: m });

                        await conn.relayMessage(chat.id, buttonReminder.message, { messageId: buttonReminder.key.id });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }, 3000);
    } catch (err) {
        console.log(err);
    }
};

export default handler;
