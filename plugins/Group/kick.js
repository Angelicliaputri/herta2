let handler = async (m, { q, conn, isOwner, setReply }) => {
  const jsonformat = (string) => {
    return JSON.stringify(string, null, 2);
  };
  const numberQuery =
    q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`;
  const Input = m.mentionByTag[0]
    ? m.mentionByTag[0]
    : m.mentionByReply
    ? m.mentionByReply
    : q
    ? numberQuery
    : false;

  if (!m.isAdmin && !isOwner) return setReply(mess.only.admin);
  if (!m.isGroup) return setReply(mess.only.group);
  if (!m.isBotAdmin) return setReply(mess.only.Badmin);
  if (!Input) return setReply("Tag/Mention/Masukan nomer target");
  if (Input.startsWith("08")) return setReply("Awali nomor dengan 62");
  if (Input == m.botNumber)
    return setReply("Gunakan fitur out untuk mengeluarkan bot");

  await conn
    .groupParticipantsUpdate(m.chat, [Input], "remove")
    .then((res) =>
      setReply(
        `Done Bosku, Wkwkwk`
      )
    )
    .catch((err) => setReply(jsonformat(err)));
};
handler.help = ["kick"];
handler.tags = ["admin"];
handler.command = ["kick", "dorr"];
handler.group = true;
export default handler;
