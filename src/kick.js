const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'kick',
  description: "kicks a user",
  execute(message, args, Discord) {
    if(!args.length){
      message.channel.send("Make sure you have someone mentioned")
    } else if(args){
    const member = message.mentions.members.first()
    member.kick();

    const kickembed=new Discord.MessageEmbed()
  .setTitle("Kick")
  .setColor("#5271ff")
  .setDescription(`${member} is now kicked`)
  .setFooter("Kick Command")
  .setTimestamp()
  message.channel.send(kickembed)
  }
  }
}