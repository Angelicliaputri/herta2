import fetch from 'node-fetch'

let handler = async (m) => {
  try {
    let who

    if (m.isGroup) {
      if (m.mentionedJid[0]) {
        who = m.mentionedJid[0]
      } else if (m.quoted) {
        who = m.quoted.sender
      } else {
        who = m.sender
      }
    } else {
      who = m.sender
    }

    let url = await conn.profilePictureUrl(who, 'image')
    await conn.sendFile(
      m.chat,
      url,
      'profile.jpg',
      `@${who.split`@`[0]}`,
      m,
      null,
      { mentions: [who] }
    )
  } catch (e) {
    m.reply('Pp Nya Di Privasi :(')
  }
}

handler.command = /^(get(pp|profile))$/i
handler.help = ['getprofile [@users]']
handler.tags = ['tools']
handler.group = true
handler.limit = true

export default handler
