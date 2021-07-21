const Discord = require("discord.js")
const fetch = require("node-fetch")
const bot = new Discord.Client();
module.exports = {
  name: 'help',
  description: "shows the help message",
  execute(message, args, Discord) {
    const helpembed= new Discord.MessageEmbed()
  .setTitle("Commands for HMS Bot")
  .setColor("#ff0000")
  .setDescription(`1. Prefix is !\n2. 8ball\n3. DM(Currently Being Worked On)\n4. Ping\n5. Quote\n6. Weather\n7. Snipe\n8. Delete\nThese are all the commands available for HMS Bot.`)
  .setFooter("Help Command")
  .setTimestamp()
    message.channel.send(helpembed)
  }
}
bot.login(process.env.TOKEN)