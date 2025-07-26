const fs = require('fs');
// It's good practice to load .env for local development
if (fs.existsSync('config.env')) {
    require('dotenv').config({ path: './config.env' });
}

function convertToBool(text, fault = 'false') { // Changed default fault to 'false' for boolean conversion safety
    return text === fault ? false : true; // Inverted logic for 'fault' to 'false'
}

module.exports = {
    // Session ID is highly sensitive and should ALWAYS be loaded from environment variables.
    // The hardcoded value below is for demonstration/initial setup only.
    // In production, ensure it's loaded from process.env and not committed to public repositories.
    SESSION_ID: process.env.SESSION_ID || "YOUR_GENERATED_SESSION_ID_HERE", // <<< IMPORTANT: Replace with your actual session ID or get from environment
    
    // Customize your bot's "alive" image
    ALIVE_IMG: process.env.ALIVE_IMG || "https://example.com/your_mulaa_xmd_alive_image.jpg", // <<< IMPORTANT: Replace with a URL to your bot's image
    
    // Customize your bot's "alive" message
    ALIVE_MSG: process.env.ALIVE_MSG || "Hey there! MULAA XMD is online and ready to assist.", // Customized message
    
    // Owner's WhatsApp number (used for owner-only commands)
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2347032411938", // Your default owner number
    
    // Bot operation mode: "public" allows all users, "private" restricts to owner/admins
    MODE: process.env.MODE || "public", // Consider setting to "public" or "private" based on your needs
    
    // Default command prefix
    PREFIX: process.env.PREFIX || ".", // Common prefixes are '.', '!', '/', or '#'
    
    // Bot's display name
    BOT_NAME: process.env.BOT_NAME || "MULAA XMD", // Corrected typo (BOT_NANE to BOT_NAME) and updated name
    
    // Automatically view WhatsApp statuses (converted to boolean)
    AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS || "false"), // Ensured boolean conversion
    
    // Owner's display name
    OWNER_NAME: process.env.OWNER_NAME || "MULAA XMD Owner", // Customized owner name
    
    // Timezone for date/time displays (e.g., in the menu command)
    TIME_ZONE: process.env.TIME_ZONE || "Africa/Lagos", // Default timezone for your bot's operations
    
    // Add other configurations as needed for professional features
    // DATABASE_URL: process.env.DATABASE_URL || "", // Example for a database connection string
    // API_KEY_EXTERNAL_SERVICE: process.env.API_KEY_EXTERNAL_SERVICE || "", // Example for external API keys
};
