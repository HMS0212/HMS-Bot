const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'ban',
  description: "bans a user",
  execute(message, args, Discord) {
    const user = message.mentions.users.first();
    message.guild.members.ban(user);

    const banembed=new Discord.MessageEmbed()
  .setTitle("Ban")
  .setColor("#5271ff")
  .setDescription(`${user} is now banned`)
  .setFooter("Ban Command")
  .setTimestamp()
  message.channel.send(banembed)
  }
}