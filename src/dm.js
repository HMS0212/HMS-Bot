const Discord = require("discord.js")
const bot = new Discord.Client();
const fetch = require("node-fetch")
module.exports = {
  name: 'dm',
  description: "dm a user with a certain message",
  execute(message, args, Discord) {
    
    if(!args.length){
      message.channel.send("Make sure you have a user mentioned and a message after")
    }
    else if(args){
      const user = bot.users.fetch(message.mentions.users.first().id)
      .then(user => {
      user.send(`${args.slice(1).join(' ')}`+" -"+`${message.author.username}`)
      })
      const dmembed=new Discord.MessageEmbed()
    .setTitle("DM")
    .setColor("#5271ff")
    .setDescription("DM Sent!<a:yoshi:853016247980523540>")
    .setFooter("DM Command")
    .setTimestamp()
    message.channel.send(dmembed)
    }
}
}
bot.login(process.env.TOKEN)