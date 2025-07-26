const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
    SESSION_ID: process.env.SESSION_ID || "Maria-X~uMklnS5Q#-1AahU48K2s1H6zvb1yg6-39zBVsVI0QfdbGLUV02hU",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/gzrefm.jpg",
    ALIVE_MSG: process.env.ALIVE_MSG || "Hey there, I'm alive",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2347032411938",
    MODE: process.env.MODE || "private",
    PREFIX: process.env.PREFIX || "#",
    BOT_NANE: process.env.BOT_NAME || "Mᴀʀɪᴀ-ᴍᴅ",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",
    OWNER_NAME: process.env.OWNER_NAME || "Abby¹",
};
