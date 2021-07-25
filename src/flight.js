const Discord = require("discord.js")
const client = new Discord.Client();
module.exports = {
  name: 'flight',
  description: "flight cmd",
  execute(message, args, Discord) {
  if(!args.length){
      message.channel.send("Make sure you have a flight number after.")
  } else if(args){
    const flightembed=new Discord.MessageEmbed()
  .setTitle(`Flight Link for ${args}`)
  .setColor("#ff0000")
  .setDescription(`https://flightaware.com/live/flight/${args}`)
  .setFooter("Flight Command")
  .setTimestamp()
    message.channel.send(flightembed)
  }
  }
}
