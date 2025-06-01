const config = require("../config");
const { cmd } = require('../command');
const { getAnti, setAnti, initializeAntiDeleteSettings } = require('../data/antidel');

initializeAntiDeleteSettings();

cmd({
    pattern: "antidelete",
    alias: ['antidel', 'antid'],
    desc: "Configure the  AntiDelete funtion",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { reply, q, isOwner }) => {
    if (!isOwner) {
      return await client.sendMessage(from, {
        text: "*📛 This is an owner command.*"
      }, { quoted: message });
    }
    try {
        const command = q?.toLowerCase();

        switch (command) {
            case 'on':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('_AntiDelete active for groups._');

            case 'off gc':
                await setAnti('gc', false);
                return reply('_AntiDelete inactive for groups._');

            case 'off dm':
                await setAnti('dm', false);
                return reply('_AntiDelete inactive for private messages._');

            case 'set gc':
                const gcStatus = await getAnti('gc');
                await setAnti('gc', !gcStatus);
                return reply(`_AntiDelete groups for group management ${!gcStatus ? 'active' : 'inactive'}._`);

            case 'set dm':
                const dmStatus = await getAnti('dm');
                await setAnti('dm', !dmStatus);
                return reply(`_AntiDelete Private messages mangement ${!dmStatus ? 'activé' : 'inactive'}._`);

            case 'set all':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('_AntiDelete active for chats chats._');

            case 'status':
                const currentDmStatus = await getAnti('dm');
                const currentGcStatus = await getAnti('gc');
                return reply(`_Statut AntiDelete_\n\n*DM:* ${currentDmStatus ? 'Active' : 'inactive'}\n*Groupes:* ${currentGcStatus ? 'Active' : 'inactive'}`);

            default:
                return reply(`-- *Guide for Antilink commands  AntiDelete* --
• \`\`.antidelete on\`\` – Active AntiDelete global
• \`\`.antidelete off gc\`\` – Desactivate for group
• \`\`.antidelete off dm\`\` – Desactivat for DM
• \`\`.antidelete set gc\`\` – Activate/Desactivate for groups
• \`\`.antidelete set dm\`\` – Activate/Desactivate for DM
• \`\`.antidelete set all\`\` – Activate for all chats
• \`\`.antidelete status\`\` – Vérify now`);
        }
    } catch (e) {
        console.error("Error occured for .antidelete:", e);
        return reply("Error occured when executing the ANTI-DELETE function.");
    }
});
