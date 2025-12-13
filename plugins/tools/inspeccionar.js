import { getUrlFromDirectPath } from "@whiskeysockets/baileys"

let handler = async (m, { conn, text, command }) => {
  if (!text)
    return conn.reply(
      m.chat,
      "📢 Usa:\n.inspeccionar <link del canal | id@newsletter>",
      m
    )

  let channelId = null
  let inviteCode = text.match(
    /whatsapp\.com\/channel\/([0-9A-Za-z]{22,24})/i
  )?.[1]

  try {
    let data

    if (text.includes("@newsletter")) {
      channelId = text.trim()
      data = await conn.newsletterMetadata("jid", channelId)
    } else if (inviteCode) {
      data = await conn.newsletterMetadata("invite", inviteCode)
      channelId = data.id
    } else {
      return conn.reply(m.chat, "❌ Link o ID de canal inválido.", m)
    }

    let thumb = data.preview
      ? getUrlFromDirectPath(data.preview)
      : null

    let info = `
📡 *INSPECTOR DE CANALES*

🆔 *ID*
${data.id}

📛 *Nombre*
${data.name || "No disponible"}

📝 *Descripción*
${data.description || "Sin descripción"}

👥 *Seguidores*
${data.subscribersCount ?? "Desconocido"}

📅 *Creado*
${data.creationTime ? new Date(data.creationTime * 1000).toLocaleString() : "No disponible"}

🔕 *Silenciado*
${data.muted ? "Sí" : "No"}

👍 *Reacciones*
${data.reactionMode || "No definido"}
`.trim()

    await conn.sendMessage(
      m.chat,
      {
        text: info,
        contextInfo: {
          externalAdReply: {
            title: "Inspector de Canales",
            body: data.name,
            thumbnailUrl: thumb,
            sourceUrl: text,
            mediaType: 1,
            showAdAttribution: false
          }
        }
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { text: data.id }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, "⚠️ No se pudo obtener información del canal.", m)
  }
}

handler.command = /^(inspect|inspeccionar)$/i
export default handler