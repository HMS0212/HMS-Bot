//Important Stuff
const Discord = require("discord.js")
const keepAlive = require("./server")
const weather = require('weather-js')
const Database = require("@replit/database")
const fetch = require("node-fetch")
const bot = new Discord.Client();
const db = require('quick.db')
const PREFIX='!';
//Commands Stuff
const fs = require('fs');
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./src/${file}`);
  bot.commands.set(command.name, command);
}
//Ready
bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`)
  bot.user.setStatus('idle');
  bot.user.setActivity('THE BUCKS WIN A TITLE 🔥', {type: 'WATCHING'});
})
//Commands
bot.on('message', async message => {
if (!message.content.startsWith(PREFIX)) return;
let args = message.content.slice(PREFIX.length).split(/ +/);
let command = args.shift().toLowerCase()
//Ping
if (command === "ping"){
bot.commands.get('ping').execute(message, args, Discord)
}
//Quote
if (command === "quote"){
  bot.commands.get('quote').execute(message, args, Discord)
}
//Weather
if (command === "weather") {
  bot.commands.get("weather").execute(message, args, Discord, weather)
}
//8ball Command
if (command === "8ball") {
  bot.commands.get('8ball').execute(message, args, Discord)
}
//Send DMs
if(command==="dm"){
  bot.commands.get('dm').execute(message, args, Discord)
}
//Help
if(command==="help"){
  bot.commands.get('help').execute(message, args, Discord)
}
//Purge
if (command === "delete") {
  bot.commands.get("delete").execute(message, args)
}
});
//Spam DM
bot.on('message', message=>{
  if(message.content.includes("kljhiuyft")){
    const user = bot.users.fetch("691348965945245781").then(user => {
      user.send("N.L ON TOP!😈<a:100gif:860208013067812885>")
    })
    message.channel.send("DM Sent")
  }
})
//Snipe
bot.on('messageDelete', async (message) => {
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
})

bot.on('message', message => {
    if(message.content === '!snipe') {
        let msg = db.get(`snipemsg_${message.channel.id}`)
        let senderid = db.get(`snipesender_${message.channel.id}`)
        if(!msg) {
            return message.channel.send(`There is nothing to snipe smh.`)
        }
        let snipeembed = new Discord.MessageEmbed()
        .setTitle(bot.users.cache.get(senderid).username)
        .setDescription(msg)
        .setThumbnail("https://creazilla-store.fra1.digitaloceanspaces.com/emojis/53918/camera-with-flash-emoji-clipart-xl.png")
        .setColor("#ff0000")
        .setTimestamp()
        .setFooter("Snipe Command")
        message.channel.send(snipeembed)
    }
})
//YT and Twitch Promo
bot.on("message", message => {
  if (message.content.includes("uploaded a new youtube video!")) {
    message.channel.send("If you want your YouTube Channel to be shown here, ping NLHMS#2100.<:youtube:863441892947132436>");
  }
})
bot.on("message", message => {
  if (message.content.includes("is now streaming")) {
    message.channel.send("If you want your Twitch Channel to be shown here, ping NLHMS#2100.<a:twitch:863441893119885332>");
  }
})

keepAlive()
bot.login(process.env.TOKEN)