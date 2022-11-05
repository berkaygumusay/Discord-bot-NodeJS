export default{
    name:'ban',
    permission:"BAN_MEMBERS",
    cooldown: 10,
    execute(message){
        message.reply("Banned");
    }
}