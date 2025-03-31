const rewards = {
  exp: 5000,
  money: 50000,
  potion: 10,
};
const premiumBonus = {
  exp: 1.5, // 50% more EXP for premium users
  money: 2,  // 100% more money for premium users
  potion: 1.2, // 20% more potions for premium users
};
const cooldown = 604800000;
let handler = async (m, { usedPrefix }) => {
  let user = global.db.data.users[m.sender];

  if (new Date() - user.lastweekly < cooldown)
    return m.reply(
      `ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ ᴄʟᴀɪᴍᴇᴅ *ᴡᴇᴇᴋʟʏ ʀᴇᴡᴀʀᴅꜱ*, ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ꜰɪɴɪꜱʜ.\n\n${(
        user.lastweekly +
        cooldown -
        new Date()
      ).toTimeString()}`
    );
  let text = "";
  for (let reward of Object.keys(rewards)) {
    if (!(reward in user)) continue;

    let rewardAmount = rewards[reward];
    // Check if the user is premium, and apply bonus
    if (user.premium) {
      rewardAmount = Math.floor(rewardAmount * premiumBonus[reward]);
    }
    
    user[reward] += rewardAmount;
    text += `*+${rewardAmount}* ${global.rpg.emoticon(reward)}${reward}\n`;
  }
  m.reply(text.trim());
  user.lastweekly = new Date() * 1;
};
handler.help = ["weekly"];
handler.tags = ["rpg"];
handler.command = /^(weekly)$/i;
handler.register = true;
handler.group = true;
handler.cooldown = cooldown;
handler.rpg = true;
export default handler;
