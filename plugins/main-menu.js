const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: "menu",
  alias: ["allmenu", "gotar"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "🐍",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const totalCommands = commands.length;
    const date = moment().tz("America/Port-au-Prince").format("dddd, DD MMMM YYYY");

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    // Menu principal
    let menuText = `
*╭══      𝗟𝗜𝗢𝗡-𝗩2*
*┃❃* *ᴜsᴇʀ* : @${m.sender.split("@")[0]}
*┃❃* *ʀᴜɴᴛɪᴍᴇ* : ${uptime()}
*┃❃* *ᴍᴏᴅᴇ* : *${config.MODE}*
*┃❃* *ᴘʀᴇғɪx* : *${config.PREFIX}*
*┃❃* *ᴩʟᴜɢɪɴ* : ${totalCommands}
*┃❃* *ᴏʀɢᴀɴɪsᴀsᴀᴛɪᴏɴ* : *ᴍᴀᴄᴏᴅᴇʀ_ᴛᴇᴄʜ*
*┃❃* *ᴠᴇʀsɪᴏɴs* : *1.0.0*
*╰════════════════⊷*

`;

    // Categories of commands
    let category = {};
    for (let cmd of commands) {
      if (!cmd.category) continue;
      if (!category[cmd.category]) category[cmd.category] = [];
      category[cmd.category].push(cmd);
    }

    const keys = Object.keys(category).sort();
    for (let k of keys) {
      menuText += `\n\n*╭─* ${k.toUpperCase()} MENU*`;
      const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
      cmds.forEach((cmd) => {
        const usage = cmd.pattern.split('|')[0];
        menuText += `\n├❃ \`${config.PREFIX}${usage}\``;
      });
      menuText += `\n*┕──────────────❒*`;
    }

    // Affecter à la variable caption
    const selectedStyle = menuText;

    // Envoyer l'image avec le menu
    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/73mlk5.jpg' },
      caption: selectedStyle,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363401658098220@newsletter',
          newsletterName: 'LION-V2',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
