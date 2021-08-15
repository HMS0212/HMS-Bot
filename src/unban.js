const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'unban',
  description: "unban cmd",
  execute(message, args, Discord) {
    if (!args.length){
      message.channel.send("Make sure you have a user's id after")
    } else{
  let id = args[0];
  message.guild.members.unban(id)
    const unbanembed=new Discord.MessageEmbed()
  .setTitle("Unban")
  .setColor("#5271ff")
  .setDescription(`User is now unbanned`)
  .setFooter("Unban Command")
  .setTimestamp()
  message.channel.send(unbanembed)
    }
  }
}