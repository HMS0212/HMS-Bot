const Discord = require("discord.js")
const fetch = require("node-fetch")
const bot = new Discord.Client();
module.exports = {
  name: 'help',
  description: "shows the help message",
  execute(message, args, Discord) {
    const helpembed= new Discord.MessageEmbed()
  .setTitle("Commands for HMS Bot")
  .setColor("#5271ff")
  .setDescription(`Thanks for using HMS Bot! The prefix for this bot is "!". This bot has many features that can be used. If u have something you would like to add, DM Hammad.S#0001`)
  .addField('Fun','The commands include:\n1. 8Ball+Question\n2.DM+User+\nMessage\n3. Flight+Flight Number\n4. Joke\n 5. Quote\n 6. Snipe\n 7. Weather+City\n 8. Avatar+User',true)
  .addField('Utilities','The commands include:\n1. AddRole+\nUser+Role\n2. RemoveRole+\nUser+Role\n3. Ban+User\n4. Delete+Messages to Delete\n5. Kick+User\n6. Unban+User ID',true)
  .addField('Custom','Request these for your server:\n1. Disable Invites\n2. Welcome Message\n3. Leave Message\n4. Rank\n5. Leaderboard',true)
  .setThumbnail('https://i.ibb.co/TBHfwsw/Neon-Light-Glow-Vegan-Noodles-Logo-2.png')
  .setFooter("Help Command")
  .setTimestamp()
    message.channel.send(helpembed)
  }
}
bot.login(process.env.TOKEN)