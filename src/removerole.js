const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'removerole',
  description: "removes a role from a user",
  execute(message, args, Discord) {
    if(!args.length){
      message.channel.send("Make sure you have a user mentioned and a role after")
    } else if(args){
      const roles=args.slice(1).join(' ')
      const role = message.guild.roles.cache.find(role => role.name === roles);
      const member = message.mentions.members.first();
      if(role === undefined){
      const noroleembed2=new Discord.MessageEmbed()
        .setTitle("No Role")
        .setColor("#5271ff")
        .setDescription(`This role doesn't exist!`)
        .setFooter("Add Role Command")
        .setTimestamp()
        message.channel.send(noroleembed2)  
      } else {
      member.roles.remove(role);
      const removeroleembed=new Discord.MessageEmbed()
      .setTitle("Remove Role")
      .setColor("#5271ff")
      .setDescription(`The ${role} role has been removed from ${member}`)
      .setFooter("Remove Role Command")
      .setTimestamp()
      message.channel.send(removeroleembed)
      }
    }
  }
}