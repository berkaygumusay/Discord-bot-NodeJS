import { Collection,} from "discord.js"
const cooldowns = new Collection();
export default (command , userID) => {
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timeStamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;

    if(timeStamps.has(userID)){
        const expiration = timeStamps.get(userID) + cooldownAmount;
        if(expiration > now){
            const leftTime = Math.round((expiration - now) / 1000);
            return leftTime;
        }
        return false
    }
    else{
        timeStamps.set(userID, now);
        setTimeout(() => {
            timeStamps.delete(userID);
        },cooldownAmount);
        return false
    }

}