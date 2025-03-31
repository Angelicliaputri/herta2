let handler = async (m, { conn, usedPrefix, participants }) => {
  conn.misi = conn.misi ? conn.misi : {};
  let id = "fight-" + m.sender;
  let user = global.db.data.users[m.sender];

  if (typeof conn.misi[id] != "undefined" && conn.misi[id] == true)
    return m.reply(`Kamu masih bertarung.`);
  
  let users = participants.map((u) => u.id);
  let lawan;

  // Pilih lawan secara acak, dengan pengecekan berulang sampai menemukan lawan yang valid
  do {
    lawan = users[Math.floor(users.length * Math.random())];
  } while (typeof global.db.data.users[lawan] == "undefined" || lawan == m.sender);

  // Jika data lawan tidak ada di db, buat data default untuk lawan
  if (!global.db.data.users[lawan]) {
    global.db.data.users[lawan] = {
      level: 0, // Default level menjadi 0
      money: 0,
      limit: 0,
      speed: 0,
      strength: 0,
      defense: 0,
    };
  }

  // Pastikan level lawan tidak undefined
  global.db.data.users[lawan].level = global.db.data.users[lawan].level || 0;

  // Jika nama lawan tidak ditemukan, gunakan nama "Villain"
  const opponentName = conn.getName(lawan) || "Villain";

  // Fungsi untuk membuat bar berdasarkan nilai
  const createBar = (value, max) => {
    const filled = Math.max(0, Math.min(10, Math.round((value / max) * 10)));
    const empty = 10 - filled;
    return "▰".repeat(filled) + "▱".repeat(empty);
  };

  // Statistik pemain dan lawan
  const playerStats = {
    speed: user.speed || 0,
    strength: user.strength || 0,
    defense: user.defense || 0,
  };
  const opponentStats = {
    speed: global.db.data.users[lawan].speed || 0,
    strength: global.db.data.users[lawan].strength || 0,
    defense: global.db.data.users[lawan].defense || 0,
  };

  m.reply(
    `*Kamu* (level ${user.level}) menantang *${opponentName}* (level ${
      global.db.data.users[lawan].level
    }) dan sedang dalam pertarungan.\n\n` +
      `📊 *Statistik Kamu:*\n` +
      `🏃‍♂️ Speed: ${createBar(playerStats.speed, 100)} (${playerStats.speed})\n` +
      `💪 Strength: ${createBar(playerStats.strength, 100)} (${playerStats.strength})\n` +
      `🛡️ Defense: ${createBar(playerStats.defense, 100)} (${playerStats.defense})\n\n` +
      `📊 *Statistik Lawan:*\n` +
      `🏃‍♂️ Speed: ${createBar(opponentStats.speed, 100)} (${opponentStats.speed})\n` +
      `💪 Strength: ${createBar(opponentStats.strength, 100)} (${opponentStats.strength})\n` +
      `🛡️ Defense: ${createBar(opponentStats.defense, 100)} (${opponentStats.defense})\n\n` +
      `⏳ Tunggu 5 menit lagi dan lihat siapa yg menang.`
  );
  
  conn.misi[id] = true;

  await delay(300000); // Tunggu 5 menit

  let kesempatan = [];
  for (let i = 0; i < user.level; i++) kesempatan.push(m.sender);
  for (let i = 0; i < global.db.data.users[lawan].level; i++)
    kesempatan.push(lawan);

  let pointPemain = 0;
  let pointLawan = 0;
  for (let i = 0; i < 10; i++) {
    let unggul = getRandom(0, kesempatan.length - 1);
    if (kesempatan[unggul] == m.sender) pointPemain += 1;
    else pointLawan += 1;
  }

  if (pointPemain > pointLawan) {
    let hadiah = (pointPemain - pointLawan) * 10000;
    user.money += hadiah;
    user.limit += 1;
    m.reply(
      `*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${
        pointLawan * 10
      }] *${opponentName}*\n\n*Kamu* (level ${
        user.level
      }) menang melawan *${opponentName}* (level ${
        global.db.data.users[lawan].level
      }) karena kamu ${
        alasanMenang[getRandom(0, alasanMenang.length - 1)]
      }\n\nHadiah: ${hadiah.toLocaleString()}\n+1 Limit`
    );
  } else if (pointPemain < pointLawan) {
    let denda = (pointLawan - pointPemain) * 100000;
    user.money -= denda;
    user.limit += 1;
    m.reply(
      `*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${
        pointLawan * 10
      }] *${opponentName}*\n\n*Kamu* (level ${
        user.level
      }) kalah melawan *${opponentName}* (level ${
        global.db.data.users[lawan].level
      }) karena kamu ${
        alasanKalah[getRandom(0, alasanKalah.length - 1)]
      }\n\nMoney kamu berkurang ${denda.toLocaleString()}\n+1 Limit`
    );
  } else {
    m.reply(
      `*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${
        pointLawan * 10
      }] *${opponentName}*\n\nHasil imbang, tidak ada yang menang atau kalah.`
    );
  }

  delete conn.misi[id];
};

handler.help = ["fighting"];
handler.tags = ["rpg"];
handler.command = /^(fight(ing)?)$/i;

handler.register = true;
handler.group = true;
handler.rpg = true;

export default handler;

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const alasanKalah = [
  "Noob",
  "Cupu",
  "Kurang hebat",
  "Ampas kalahan",
  "Gembel kalahan",
];
const alasanMenang = [
  "Hebat",
  "Pro",
  "Master Game",
  "Legenda game",
  "Sangat Pro",
  "Rajin Nge-push",
];

const delay = (time) => new Promise((res) => setTimeout(res, time));
