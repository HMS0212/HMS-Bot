const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'restart',
  description: "restarts bot",
  execute(message, args, Discord) {
    const restartembed=new Discord.MessageEmbed()
  .setColor("#5271ff")
  .setAuthor("Restarting...",'https://cdn.discordapp.com/emojis/769935094285860894.gif')
  .setFooter("Restart Command")
  .setTimestamp()
  message.channel.send(restartembed).then(message=>{
        setTimeout(()=>message.channel.bulkDelete(2), 5000)
      })
    client.destroy();
    client.login(process.env.TOKEN);
  }
}
