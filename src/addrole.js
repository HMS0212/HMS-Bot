const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'addrole',
  description: "adds a role to a user",
  execute(message, args, Discord) {
    if(!args.length){
      message.channel.send("Make sure you have a user mentioned and a role after")
    } else if(args){
      const roles=args.slice(1).join(' ')
      const role = message.guild.roles.cache.find(role => role.name === roles);
      const member = message.mentions.members.first();
      if (member.roles.cache.some(role => role.name === roles)){
        const hasroleembed=new Discord.MessageEmbed()
        .setTitle("Has Role")
        .setColor("#5271ff")
        .setDescription(`${member} already has the ${role} role`)
        .setFooter("Add Role Command")
        .setTimestamp()
        message.channel.send(hasroleembed)
      } else if(role === undefined){
      const noroleembed=new Discord.MessageEmbed()
        .setTitle("No Role")
        .setColor("#5271ff")
        .setDescription(`This role doesn't exist!`)
        .setFooter("Add Role Command")
        .setTimestamp()
        message.channel.send(noroleembed)  
      } else {
      const addroleembed=new Discord.MessageEmbed()
      .setTitle("Add Role")
      .setColor("#5271ff")
      .setDescription(`${member} now has the ${role} role`)
      .setFooter("Add Role Command")
      .setTimestamp()
      message.channel.send(addroleembed)
      member.roles.add(role).catch(error => {
        if (error.code == Discord.Constants.APIErrors.MISSING_PERMISSIONS) {
          console.log('Add Role Command Error')
          message.channel.bulkDelete(1)
          message.channel.send("There was an error, HMS role is too low in the hierarchy")
          }});
      }
    }
  }
}
