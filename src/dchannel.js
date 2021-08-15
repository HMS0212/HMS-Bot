const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'dchannel',
  description: "deletes a channel",
  execute(message, args, Discord) {
    message.channel.delete()
  }
}
