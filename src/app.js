import {Client , Collection} from "discord.js";
import 'dotenv/config';
import {readdirSync} from 'fs';
const client = new Client({
    intents: ["Guilds","GuildMessages","MessageContent"],
    // Presence
    presence: {
        // Status
        status:"online",
        // Activity
        activities :[{name:'Spotify',type:2}] 
    }
});


// Event Loader
readdirSync('./events').forEach(async (file) => {
    const event = await import(`./events/${file}`).then(m => m.default);
    event(client);
})

// Command Loader
client.commands = new Collection();
readdirSync('./commands').forEach((category) => {
    readdirSync(`./commands/${category}`).forEach( async (file) => {
        const command = await import(`./commands/${category}/${file}`).then(m => m.default);
        client.commands.set(command.name,command);
    })
})





client.login(process.env.token);






