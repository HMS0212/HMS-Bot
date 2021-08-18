const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'cchannel',
  description: "creates a channel",
  execute(message, args, Discord) {
    if(!args.length){
      message.channel.send("Make sure you have the name and type of channel you want to create")
    } else if (args){
    message.guild.channels.create(args.slice(1).join(' '),{
      type: args[1]
    })
    }
  }
}
