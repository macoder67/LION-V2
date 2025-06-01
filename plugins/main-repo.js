const fetch = require('node-fetch');
const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch GitHub repository information",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/macoder67/LION-V2';

    try {
        const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return reply("❌ ERROR : URL enter is invalid. please try again.");

        const [, username, repoName] = match;

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
            headers: {
                'User-Agent': 'LION-V2'
            }
        });

        if (response.status === 503) {
            return reply("❌ Github repo is unavailable or 404 error is taking place so please try again later.");
        }

        if (!response.ok) {
            return reply(`❌ Could not get main repo.please try again later: ${response.status}`);
        }

        const repoData = await response.json();

        const message = `┌──────────────────────┐
│  💫 *𝗟𝗜𝗢𝗡-𝗩2 𝗥𝗘𝗣𝗢*  💫  
├──────────────────────
│ *• Name: ${repoData.name}*
│ *• Owner: ${repoData.owner.login*}
│ *• Stars: ${repoData.stargazers_count}*
│ *• Forks: ${repoData.forks_count}*
│ *• URL: ${repoData.html_url}*
│ *• Desc: ${repoData.description || 'None'}*
└──────────────────────┘
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀᴄᴏᴅᴇʀ_ᴛᴇᴄʜ*`;

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/73mlk5.jpg` },
            caption: message,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401658098220@newsletter',
                    newsletterName: config.OWNER_NAME || 'MACODER',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Repo command error:", error);
        reply("❌ Could not achieve the desired command.please try again later.");
    }
});
