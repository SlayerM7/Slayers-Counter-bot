const { MessageEmbed, Client } = require('discord.js')
const { prefix, token, counter_channel } = require('./config.json')
const client = new Client();
let count = 0;
client.on("ready", () => {
    console.log("Ready");
});
client.on("message", message => {
    if (message.author.id === client.user.id) return;
    const takeAway = Math.floor(Math.random() * 40);
    if (message.channel.id !== counter_channel) return; 
    if (message.content.includes(count)) {
        count++
        let Number = Math.floor(Math.random() * 51);
        const curse = Math.floor(Math.random() * 100)
        if (Number === 50) {
            const bonusEmbed = new MessageEmbed()
                .setColor()
                .setTitle("You just found a powerup!")
                .setDescription(`I have added ${takeAway} to the Count! \n \n Start counting from ${count + takeAway}`);
            console.log('Takeaway is ' + takeAway)
            message.channel.send(`<@${message.author.id}> You have found a power up!`, bonusEmbed)
            console.log("Before " + count)
            count += takeAway
            console.log("After: " + count)
        }
        if (Number === 1) {
            if (count < curse) return;
            const curseEmbed = new MessageEmbed()
                .setColor()
                .setDescription(`U found a curse! \n \n Taking away ${curse} \n Start counting from ${count - curse}`)
        //    message.channel.send(`U found a curse! \n \n Taking away ${curse} \n Start counting from ${count - curse}`);
            count -= curse
            message.channel.send(curseEmbed)
        }
    } else {
        message.delete().then(() => {
            message.member.send(`That is the counter channel! Start at \`${count}\``);
        })
    }
})
client.login(token);