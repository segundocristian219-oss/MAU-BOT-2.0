"use strict";

import axios from "axios";

// === Config API ===
const API_BASE = (process.env.API_BASE || "https://api-sky.ultraplus.click").replace(/\/+$/, "");
const API_KEY  = process.env.API_KEY || "Russellxz";
const MAX_TIMEOUT = 30000;

async function react(conn, chatId, key, emoji) {
  try {
    await conn.sendMessage(chatId, { react: { text: emoji, key } });
  } catch {}
}

async function getSpotifyMp3(input) {
  const endpoint = `${API_BASE}/spotify`;

  const isUrl = /spotify\.com/i.test(input);
  const body = isUrl ? { url: input } : { query: input };

  const { data: res, status } = await axios.post(
    endpoint,
    body,
    {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: MAX_TIMEOUT,
      validateStatus: () => true,
    }
  );

  let data = res;
  if (typeof data === "string") {
    try { data = JSON.parse(data.trim()); }
    catch { throw new Error("Respuesta no JSON del servidor"); }
  }

  const ok = data?.status === true || data?.status === "true";
  if (!ok) throw new Error(data?.message || data?.error || `HTTP ${status}`);

  const mp3Url   = data.result?.media?.audio;
  if (!mp3Url) throw new Error("No se encontró el MP3");

  return {
    mp3Url,
    title: data.result?.title || "Spotify Track",
    artist: data.result?.artist || "Desconocido",
    duration: data.result?.duration || "Desconocida",
    thumbnail:
      data.result?.thumbnail ||
      data.result?.image ||
      "https://i.imgur.com/0Z8FQkF.jpg",
    api: data.result?.api || "Spotify"
  };
}

function safeBaseFromTitle(title) {
  return String(title || "spotify")
    .slice(0, 70)
    .replace(/[^A-Za-z0-9_\-.]+/g, "_");
}

export default async function handler(msg, { conn, args }) {
  const chatId = msg.key.remoteJid;
  const pref = global.prefixes?.[0] || ".";
  const text = (args.join(" ") || "").trim();

  if (!text) {
    return conn.sendMessage(
      chatId,
      {
        text:
`✳️ Usa:
${pref}sp <canción o URL>

Ejemplo:
${pref}sp bad bunny tití me preguntó`
      },
      { quoted: msg }
    );
  }

  // ⏰ Reacción inmediata al detectar el comando
  await react(conn, chatId, msg.key, "🕒");

  try {
    const {
      mp3Url,
      title,
      artist,
      duration,
      thumbnail,
      api
    } = await getSpotifyMp3(text);

    const infoText = `
> *𝚅𝙸𝙳𝙴𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*

⭒ ִֶָ७ ꯭🎵˙⋆｡ - *𝚃𝚒́𝚝𝚞𝚕𝚘:* ${title}
⭒ ִֶָ७ ꯭🎤˙⋆｡ - *𝙰𝚛𝚝𝚒𝚜𝚝𝚊:* ${artist}
⭒ ִֶָ७ ꯭🕑˙⋆｡ - *𝙳𝚞𝚛𝚊𝚌𝚒ó𝚗:* ${duration}
⭒ ִֶָ७ ꯭📺˙⋆｡ - *𝙲𝚊𝚕𝚒𝚍𝚊𝚍:* 64kbps
⭒ ִֶָ७ ꯭🌐˙⋆｡ - *𝙰𝚙𝚒:* ${api}

*» 𝘌𝘕𝘝𝘐𝘈𝘕𝘋𝘖 𝘈𝘜𝘋𝘐𝘖  🎧*
*» 𝘈𝘎𝘜𝘈𝘙𝘋𝘓𝘌 𝘜𝘕 𝘗𝘖𝘊𝘖...*

⇆‌ ㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤ↻

> \`\`\`© 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝗁𝖾𝗋𝗇𝖺𝗇𝖽𝖾𝗓.𝗑𝗒𝗓\`\`\`
`;

    // 📸 Info + imagen
    await conn.sendMessage(
      chatId,
      {
        image: { url: thumbnail },
        caption: infoText
      },
      { quoted: msg }
    );

    // 🎧 Audio
    await conn.sendMessage(
      chatId,
      {
        audio: { url: mp3Url },
        mimetype: "audio/mpeg",
        fileName: `${safeBaseFromTitle(title)} - ${artist}.mp3`
      },
      { quoted: msg }
    );

  } catch (err) {
    console.error("❌ Spotify error:", err?.message || err);
    await conn.sendMessage(
      chatId,
      { text: "❌ Error al procesar la canción." },
      { quoted: msg }
    );
  }
}

handler.command = ["spotify", "sp"];
handler.help = ["spotify <canción o url>", "sp <canción o url>"];
handler.tags = ["descargas"];