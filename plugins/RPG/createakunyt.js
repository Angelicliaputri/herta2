// Handler function
let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender];

    try {
        if (command === 'createakunyt') {
            if (args.length === 0) {
                return m.reply("Silakan masukkan nama akun YouTube Anda.\nContoh: .createakunyt Sanz YT");
            }

            // Menggabungkan semua argumen menjadi satu string (nama akun YouTube)
            let youtubeAccountName = args.join(' ');

            // Set nama akun YouTube untuk pengguna
            user.youtube_account = youtubeAccountName;
            m.reply(`Akun YouTube Anda telah berhasil dibuat/diedit\nchannel: ${youtubeAccountName}`);
        } else if (/live/i.test(command) && args[0] === 'youtuber') {
            // Periksa apakah pengguna memiliki akun YouTube
            if (!user.youtube_account) {
                return m.reply("Buat akun terlebih dahulu\nKetik: .createakunyt");
            }

            // Kode eksisting untuk perintah 'live youtuber'
            // ...
        } else {
            return await m.reply("Perintah tidak dikenali.\n*.akunyt*\n> ᴜɴᴛᴜᴋ ᴍᴇɴɢᴇᴄᴇᴋ ᴀᴋᴜɴ ʏᴏᴜᴛᴜʙᴇ ᴀɴᴅᴀ\n*.liveyt [judul live]*\n> ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀᴋᴛɪᴠɪᴛᴀs ʟɪᴠᴇ sᴛʀᴇᴀᴍɪɴɢ.");
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

// Metadata
handler.help = ['createakunyt'];
handler.tags = ['rpg'];
handler.command = /^(createakunyt)$/i;
handler.register = true;
handler.group = true;

export default handler;
