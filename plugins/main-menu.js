const config = require('../config');
const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { tiny } = require("../lib/fancy_font/fancy");

// Path configuration
const mediaPath = {
    audio: path.join(__dirname, '../lib/media/menu-audio.mp3')
};

cmd({
    pattern: "menu",
    desc: "Get command list with media",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply }) => {
    try {
        const categories = {
            ai: '𝙰𝙸',
            main: '𝙼𝙰𝙸𝙽',
            anime: '𝙰𝙽𝙸𝙼𝙴',
            whatsapp: '𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿', 
            group: '𝙶𝚁𝙾𝚄𝙿',
            admin: '𝙰𝙳𝙼𝙸𝙽',
            fun: '𝙵𝚄𝙽', 
            other: '𝙾𝚃𝙷𝙴𝚁',
            owner: '𝙾𝚆𝙽𝙴𝚁',
            settings: '𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂',
            general: '𝙶𝙴𝙽𝙴𝚁𝙰𝙻',
            tools: '𝚃𝙾𝙾𝙻𝚂',
        };

        let menu = {};

        // Initialize categories
        for (const category in categories) {
            menu[category] = '';
        }

        // Populate commands
        commands.forEach(command => {
            if (command.pattern && !command.dontAddCommandList && categories[command.category]) {
                menu[command.category] += `│ ❉ ${command.pattern}\n`;
            }
        });
        
        
//fake status and quoted.  
// Changed from "voltage" to a name more fitting for MULAA XMD if this is meant to be a bot identity, or remove if not needed.
// This part is for creating a fake "quoted" message with a specific name for branding.
const mullaXMDStatus = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: {
newsletterAdminInviteMessage: {
newsletterJid: '120363292215098632@newsletter', // You might want to keep this or change if you have a specific newsletter JID
    newsletterName: '⏤͟͟͞͞★𝐌𝐔𝐋𝐀𝐀-𝐗𝐌𝐃★ ͟͞͞⏤', // Replaced Voltage name with MULAA XMD
    caption: '𝐌𝐔𝐋𝐀𝐀-𝐗𝐌𝐃 𝐁𝐨𝐭 𝐃𝐞𝐯\n𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐌𝐔𝐋𝐀𝐀' // Customized caption for your bot
}}}
        
        // Date and time configuration
        const dateOptions = {
            timeZone: 'Africa/Lagos', // Change this to your desired timezone (e.g., 'America/New_York', 'Asia/Kolkata', 'Europe/London')
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const timeOptions = {
            timeZone: 'Africa/Lagos', // Change this to your desired timezone
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const date = new Date().toLocaleDateString('en-US', dateOptions);
        const time = new Date().toLocaleTimeString('en-US', timeOptions);

        // Uptime calculation
        const uptime = process.uptime();  // Get uptime in seconds
        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        
        // Build menu sections
        let madeMenu = 
            `╭───〔 💡 *𝐌𝐔𝐋𝐀𝐀-𝐗𝐌𝐃* 💡 〕───⬣\n` + // 
            `│ *Dᴀᴛᴇ:* ${date}\n` +
            `│ *Tɪᴍᴇ:* ${time}\n` +
            `│ *Uᴘᴛɪᴍᴇ:* ${days}d ${hours}h ${minutes}m ${seconds}s\n` +
            `│ *Oᴡɴᴇʀ:* YOUR_OWNER_NAME_HERE\n` + // <<< IMPORTANT: Replace with your actual owner name
            `│ *Rᴀᴍ:* ${(os.totalmem() - os.freemem()) / 1024 / 1024} MB / ${os.totalmem() / 1024 / 1024} MB\n` +
            `│ *Pʟᴜɢɪɴs:* ${commands.length}\n` +
            `│ *Usᴇʀ:* ${pushname}\n` +
            `│ *Pʀᴇғɪx:* ${config.PREFIX}\n` +
            `│ *Mᴏᴅᴇ:* ${config.MODE}\n` +
            `╰──────────────\n`;

        for (const [category, title] of Object.entries(categories)) {
            if (menu[category]) {
                madeMenu += `
┅┅┅✦《 ${title} 》✦┅┅┅
${menu[category]}╰───────────❍`;
            }
        }

        madeMenu += "\n\n> *𝐌𝐔𝐋𝐀𝐀 𝐗𝐌𝐃 | 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐌𝐔𝐋𝐀𝐀*"; // Updated branding at the bottom
        let kenu = tiny(madeMenu); // Apply fancy font

        await conn.sendMessage(
            from,
            {
                text: kenu,
                contextInfo: {
                        mentionedJid: [sender],
                        forwardingScore: 9999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363420003990090@newsletter', // You might want to keep this or change if you have a specific newsletter JID
                            newsletterName: '⏤͟͟͟͟͞͞͞͞𝐌𝐔𝐋𝐀𝐀-𝐗𝐌𝐃⏤' // Replaced MARIA-MD with MULAA-XMD
                        },
                    externalAdReply: {
                        showAdAttribution: false,
                        containsAutoReply: true,
                        title: "✧ 𝐌𝐔𝐋𝐀𝐀 𝐗𝐌𝐃 - 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐏𝐀𝐍𝐄𝐋 ✧", // Replaced MARIA MD with MULAA XMD
                        body: "𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐌𝐔𝐋𝐀𝐀", // Replaced Abby with MULAA
                        thumbnailUrl: "YOUR_THUMBNAIL_IMAGE_URL_HERE", // <<< IMPORTANT: Replace with your bot's actual image URL
                        sourceUrl: "YOUR_BOT_REPOSITORY_OR_WEBSITE_URL", // <<< IMPORTANT: Replace with your bot's GitHub repo or website URL
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: mullaXMDStatus } // 
        );

    } catch (e) {
        console.error('Menu Error:', e);
        await reply(`❌ Error: ${e.message}`);
    }
});

/* Coded by MULAA XMD Team */ 
