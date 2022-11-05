import { Client, EmbedBuilder, MessageActivityType } from "discord.js";


export default{
    name: 'ping',
    execute(message){
        
        const discordPing = message.client.ws.ping;
        const botPing = Date.now() - message.createdTimestamp;

        const response = new EmbedBuilder()
            .setColor('#f51302')
            .setTitle(message.author.username)
            .addFields(
                {name:'Discord Ms',value: `${discordPing} ms` ,inline:true},
                {name:'Bot Ms',value: `${botPing} ms`,inline:true},
            )
        message.reply({embeds: [response]});
    }
}