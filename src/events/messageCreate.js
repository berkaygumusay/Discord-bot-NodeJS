import {EmbedBuilder} from 'discord.js';
import cooldownControl from '../utils/cooldownControl.js';
export default (client) => {
    const prefix = process.env.prefix; 
    //console.log(prefix);
    client.on("messageCreate", message => {
        if(message.content.startsWith(prefix) === false){  
            switch (message.content.toLowerCase()) {
                case "ping":
                        message.reply("pong");
                    break;
                case "bilgi":
                        const response = new EmbedBuilder()
                        /* .addFields(
                            {name: 'name1' , value: '1'},
                            {name: 'name2' , value: '2'}
                        ) */
                        .setAuthor({ name:'Berkay Gümüşay' , iconURL: client.user.displayAvatarURL() , url:'https://www.youtube.com/watch?v=YwS8FUv_HzA'})
                        .setDescription('!! Çok Önemli Açıklama !!')
                        .setColor("#631454") 
                        .setTitle("!! Çok Önemli Açıklamanın Başlığı !!")
                        //.setImage("https://media.tenor.com/OL5iubJC4wUAAAAM/american-psycho.gif")
                        .setThumbnail("https://media.tenor.com/OL5iubJC4wUAAAAM/american-psycho.gif") 
                        message.channel.send({ content:'Selam',embeds:[response] })
                    break;
                default:
                    break;
            }
        }
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if(!command){
            return
        }
        // Permission Control
        if(command.permission && !message.member.permissions.has(command.permission)){
            return message.reply("You Don't Have The Permission"); 
        }

        // Cooldown Control
        if(message.member.id !== process.env.OWNER_ID){
            const cooldown = cooldownControl(command , message.member.id);
            if(cooldown){
                return message.reply(`\`${cooldown}\` Seconds Left`);
            }
        }

        try {
            command.execute(message);

        } catch (error) {
            console.log(error);
            message.reply('An Error Occured')
        }
    })
}