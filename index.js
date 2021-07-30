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
  bot.user.setStatus('dnd');
  bot.user.setActivity('!help', {type: 'PLAYING'});
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
  if (message.member.hasPermission("MANAGE_MESSAGES")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296') {
	bot.commands.get("delete").execute(message, args)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
//Flight Status
if (command === "flight") {
  bot.commands.get('flight').execute(message, args, Discord)
}
//Joke
if (command === "joke"){
  bot.commands.get('joke').execute(message, args, Discord)
}
//Unban
if (command === "unban") {
  if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296'){
    bot.commands.get("unban").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
//Ban
if (command === "ban") {
  if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296'){
    bot.commands.get("ban").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
//Kick
if (command === "kick") {
  if (message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296'){
    bot.commands.get("kick").execute(message, args, Discord)
    }
  else{
    message.channel.send("You cant use that!")
    }
}
//Add Role
if (command === "addrole") {
  if (message.member.hasPermission("MANAGE_ROLES")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296') {
	bot.commands.get("addrole").execute(message, args, Discord)
  }
  else{
    message.channel.send("You cant use that!")
  }
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
        .setColor("#5271ff")
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
  else if (message.content.includes("is now streaming")) {
    message.channel.send("If you want your Twitch Channel to be shown here, ping NLHMS#2100.<a:twitch:863441893119885332>");
  }
})
//Disbale Invite Links in 2k for Switch
bot.on("message", message => {
  if (message.content.includes("discord.gg/"||"discord.gg/invite")) { 
    if(message.guild.id == '800469764341366795')     
    message.delete()
    message.channel.send("No Promoting Discord Servers. Rule 4 <a:read_rules:853016245783887891>")
    .then (message=>{
    message.delete({timeout:5000})
    })
    const user =bot.users.cache.get('821736517012815882');
    user.send('Someone sent an invite link O.o');
  } 
})
//Welcome
bot.on('guildMemberAdd', member => {
  if(member.guild.id == '813532301521846282'){
  const role = member.guild.roles.cache.find(role => role.name === "Tryouts");
  member.roles.add(role);
  const welcomeembed= new Discord.MessageEmbed()
    .setColor("#5271ff")
    .setDescription(`Wassuh ${member}, welcome to **🗡N.L No Life🗡**!`)
    .setThumbnail("https://cdn.mee6.xyz/guild-images/813532301521846282/3db1c99151af8cbff41e59614d0052d534eb5d2d8273f66fd6bf85c0e87cbc51.jpeg")
    .setImage("https://cdn.mee6.xyz/guild-images/813532301521846282/fbf2c9cd6557cce329bf28a39eaf4df9e9437fcbbb7b62086dc9004f9e08f895.gif")
    member.guild.channels.cache.get('813538856427192342').send(welcomeembed);
  } 
});
//Leave
bot.on('guildMemberRemove', member => {
  if(member.guild.id == '813532301521846282'){
    member.guild.channels.cache.get('846947148012716042').send(`${member} just lost his virginity and fucked off`);
  } 
});
keepAlive()
bot.login(process.env.TOKEN)