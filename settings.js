import { createRequire } from "module";
import { fileURLToPath } from "url";
import fs from 'fs-extra'
import chalk from "chalk";
const require = createRequire(import.meta.url);
const version = require("baileys/package.json").version;
const stringSimilarity = require("string-similarity");

//======== OWNER SETTINGS =======\\
global.nomerOwner = "6285840098044";
global.nomerOwner2 = "6285840098044";
global.nomerBot = "6288272179918";
global.botName = "Ceciliaaa"
global.ownerName = "© Lycaaa"; 
global.sgc = 'https://whatsapp.com/channel/0029VafEhDUIXnlyGgMSgH2u'


//======= BOT SETTINGS ======\\
global.pairingCode = true // true / false
global.botName = "Ceciliaaa"
global.session = "session" 
global.runWith = "Heroku"
global.language = "id"
global.Qoted = "ftoko" 
global.baileysMd = true
global.antiSpam = true
global.fake = botName
global.Console = false
global.print = true
global.copyright = `© ${botName}`
global.fake1 = "© Lycaaa X Ceciliaaa"
global.packName = `Bot Name : ${botName}\nBot Number : ${nomerBot}`
global.authorName = '© Ceciliaaa'
global.autoblockcmd = false;
global.ownerBot = `${nomerOwner}@s.whatsapp.net`
global.gamewaktu = 60;
global.limitCount = 30;
global.Intervalmsg = 1000; //detik
global.mongodb ="mongodb+srv://liaa:liaa@liaa.vxabnoo.mongodb.net/?retryWrites=true&w=majority&appName=liaa"
global.dbName = "liaa"
global.redisdb = ''//'default:h9uWVPicTOatFOmZHsmyO4YJb83X5Pgy@redis-10292.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:10292'//'default:nfsmwROCK909@redis-10292.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:10292'
global.myUrl = "https://wa.me/c/6281401689098"
global.newsletterJid = "120363282851754043@newsletter"
global.newsletterName = "HERTA LOVER"
global.gcounti = {
  prem: 60,
  user: 20,
};


global.Exif = {
  packId: "https://linktr.ee/NotNpc.Id",
  packName: "Herta Chan",
  packPublish: `extream`,
  packEmail: "techprototypex@gmail.com",
  packWebsite: "https://linktr.ee/NotNpc.Id",
  androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
  iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
  emojis: [],
  isAvatar: 0,
}

global.fotoRandom = [
  "https://telegra.ph/file/e8f257845f899f34cd560.jpg",
];


global.apiMiftah = 'officialdittaz'
global.apiNazmy = 'Reyosaka'
global.apiLolhuman = 'ichanZX'
global.apiNekohime = '37b374ef'
global.fileStackApi = "AlDgaKtdiT1iL6CwlXMpWz"; //daftar di filestack.com,api untuk menyimpan file
global.apiflash = "39fc26a0f40048eb838b8c35e0789947"; //
global.apiUrl = 'https://api.tioo.eu.org'; // Base API URL



global.multiplier = 38

/*============== EMOJI ==============*/
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      level: "📊",
      limit: "🎫",
      tiketcn: "🔖",
      health: "❤️",
      stamina: "⚡",
      exp: "✨",
      atm: "💳",
      money: "💰",
      bank: "🏦",
      potion: "🥤",
      diamond: "💎",
      rawdiamond: "💠",
      common: "📦",
      uncommon: "🛍️",
      mythic: "🎁",
      legendary: "🗃️",
      superior: "💼",
      pet: "🔖",
      trash: "🗑",
      armor: "🥼",
      sword: "⚔️",
      pickaxe: "⛏️",
      axe: "🪓",
      fishingrod: "🎣",
      pistol: "🔫",
      peluru: "🔋",
      kondom: "🎴",
      coal: "⬛",
      wood: "🪵",
      rock: "🪨",
      string: "🕸️",
      horse: "🐴",
      cat: "🐱",
      dog: "🐶",
      fox: "🦊",
      robo: "🤖",
      dragon: "🐉",
      dino: "🦖",
      tano: "🦕",
      kirana: "👩🏻",
      unicorn: "🦄",
      pizza: "🍕",
      burger: "🍔",
      kepitingbakar: "🦀",
      ayambakar: "🍖",
      steak: "🥩",
      
      wine: "🍷",
      beer: "🍺",
      petfood: "🍖",
      iron: "⛓️",
      rawiron: "◽",
      gold: "🪙",
      rawgold: "🔸",
      emerald: "❇️",
      upgrader: "🧰",
      bibitanggur: "🌱",
      bibitjeruk: "🌿",
      bibitapel: "☘️",
      bibitmangga: "🍀",
      bibitpisang: "🌴",
      anggur: "🍇",
      jeruk: "🍊",
      apel: "🍎",
      mangga: "🥭",
      pisang: "🍌",
      botol: "🍾",
      kardus: "📦",
      kaleng: "🏮",
      plastik: "📜",
      gelas: "🧋",
      chip: "♋",
      umpan: "🪱",
      skata: "🧩",
      defense: "🛡️",
      strength: "💪🏻",
      speed: "🏃",
      tbox: "🗄️",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};



//============================================\\




async function similarity(one,two) {
const treshold = stringSimilarity.compareTwoStrings(one, two)
return treshold.toFixed(2)
}


async function reloadFile(file) {
file = file.url || file;
let fileP = fileURLToPath(file);
fs.watchFile(fileP, () => {
fs.unwatchFile(fileP);
console.log(
chalk.bgGreen(chalk.black("[ UPDATE ]")),
chalk.white(`${fileP}`)
);
import(`${file}?update=${Date.now()}`);
});
}

reloadFile(import.meta.url);


function transformText(text) {
  const charMap = {
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
    'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
    'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  };

  return text.toUpperCase().split('').map(char => {
    return charMap[char] || char;
  }).join('');
}

function transformText2(text) {
  const charMap = {
    'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
    'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
    'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  };

  return text.split('').map(char => {
    return charMap[char.toUpperCase()] || char;
  }).join(' ');
}


function transformText3(text) {
  const superscriptMap = {
      'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ',
      'i': 'ᶦ', 'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ',
      'q': 'q', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ',
      'y': 'ʸ', 'z': 'ᶻ',
      '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '0': '⁰',
      '.': '·'
  };

  return [...text.toLowerCase()].map(char => superscriptMap[char] || char).join('');
}


function transformText4(text) {
  const stylishMap = {
      'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪',
      'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳',
      's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
      '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵', '0': '𝟬',
      '.': '.', ' ': ' '
  };

  return [...text.toLowerCase()].map(char => stylishMap[char] || char).join('');
}


function getRandomFile (ext){
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

 function makeid(length){
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};



async function totalCase(filePath, command) {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    let found = false;
    const lines = data.split('\n');
    lines.forEach((line) => {
      const caseMatch = line.match(/case\s+['"]([^'"]+)['"]/);
      if (caseMatch && caseMatch[1] === command) {
        found = true;
      }
    });

    return found;
  } catch (err) {
    throw err;
  }
}


async function randomNames(){
  const indonesianNames = [
      "Agus", "Budi", "Dewi", "Eka", "Fitri", "Gita", "Hadi", "Indra", "Joko", "Kartika",
      "Lina", "Mega", "Nur", "Putra", "Rini", "Sari", "Tono", "Wahyu", "Yanti", "Zain",
      "Adi", "Bayu", "Cahya", "Dian", "Edi", "Fandi", "Ganda", "Hendra", "Ika", "Jati",
      "Kurnia", "Lusi", "Murni", "Nana", "Oky", "Prita", "Rina", "Santo", "Tika", "Umar",
      "Vera", "Wulan", "Yani", "Zul", "Abdi", "Bagus", "Cindy", "Dinda", "Eko", "Fajar",
      "Gita", "Hesti", "Iwan", "Jaya", "Krisna", "Laras", "Mira", "Nindy", "Olla", "Panda",
      "Rudy", "Sinta", "Tina", "Utami", "Vina", "Windi", "Yoga", "Zaki", "Agung", "Bambang",
      "Citra", "Dhika", "Endah", "Fina", "Galih", "Hesty", "Indah", "Jajang", "Kiki", "Laila",
      "Mita", "Nia", "Omar", "Purna", "Rahayu", "Sakti", "Tari", "Usman", "Vino", "Wulan"
  ];
      const randomName = indonesianNames[Math.floor(Math.random() * indonesianNames.length)];
 return randomName      
}


const toFirstCase = (str) => {
  let first = str
  .split(" ") // Memenggal nama menggunakan spasi
  .map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)) // Ganti huruf besar kata-kata pertama
  .join(" ");
  
  return first;
  }

  const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  
  function tmp(file) {
    return file + ".tmp";
    }
    
    const Log = (text) => {
      console.log(text);
      };
      
      let d = new Date();
      let locale = "id";
      let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime();
      let week = d.toLocaleDateString(locale, { weekday: "long" });
      const calender = d.toLocaleDateString("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
      });
      
      function clockString(ms) {
        let months = isNaN(ms) ? "--" : Math.floor(ms / (86400000 * 30.44));
        let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
        let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
        let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
        let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
        let monthsDisplay = months > 0 ? months + " bulan, " : "";
        let dDisplay = d > 0 ? d + " hari, " : "";
        let hDisplay = h > 0 ? h + " jam, " : "";
        let mDisplay = m > 0 ? m + " menit, " : "";
        let sDisplay = s > 0 ? s + " detik" : "";
        let time = months > 0 ? monthsDisplay + dDisplay : d > 0 ? dDisplay + hDisplay : h > 0 ? hDisplay + mDisplay  : mDisplay + sDisplay
      
        return time;
      }
      
      
      
      
      
     
   



global.require = require;
global.reloadFile = (file) => reloadFile(file);
global.baileysVersion = `Baileys ${version}`;
global.similarity = (one,two) => similarity(one,two);
global.transformText = transformText
global.transformText2 = transformText2
global.transformText3 = transformText3
global.transformText4 = transformText4
global.getRandomFile = getRandomFile
global.makeid = makeid
global.totalCase = totalCase
global.randomName = randomNames
global.toFirstCase = toFirstCase;
global.sleep = sleep;
global.tmp = tmp;
global.clockString = clockString;
global.week = week;
global.calender = calender;
global.Log = Log;
global.log = Log;
