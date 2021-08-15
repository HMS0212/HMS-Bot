//Important Stuff
const Discord = require("discord.js")
const keepAlive = require("./server")
const weather = require('weather-js')
const Database = require("@replit/database")
const fetch = require("node-fetch");
const bot = new Discord.Client();
const db = require('quick.db')
const PREFIX="!"
const Enmap = require("enmap")
const canvacord = require("canvacord")
bot.points = new Enmap({ name: "points" });
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
  bot.user.setPresence({
        activity: { 
            name: '7 Servers with 492 Members',
            type: 'WATCHING'
        },
        status: 'idle'
    })
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
  if (message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296') {
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
  if (message.member.hasPermission("MANAGE_ROLES","ADMINISTRATOR")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296') {
	bot.commands.get("addrole").execute(message, args, Discord)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
//Remove Role
if (command === "removerole") {
  if (message.member.hasPermission("MANAGE_ROLES","ADMINISTRATOR")||message.author.id==='821736517012815882'||message.author.id==='782391596648759296') {
	bot.commands.get("removerole").execute(message, args, Discord)
  }
  else{
    message.channel.send("You cant use that!")
  }
}
//Avatar
if (command === "avatar"){
  bot.commands.get('avatar').execute(message, args, Discord)
}
//Create Channel
if (command === "cchannel"){
  bot.commands.get('cchannel').execute(message, args, Discord)
}
//Delete Channel
if (command === "dchannel"){
    bot.commands.get('dchannel').execute(message, args, Discord)
}
if (command === "restart"){
  bot.commands.get('restart').execute(message, args, Discord)
}
});
//Snipe
const sniping = require("./src/snipe");
sniping(bot)
//YT and Twitch Promo and Disable Invite Links
bot.on("message", message => {
  if (message.content.includes("uploaded a new youtube video!")&&message.guild.id == '800469764341366795') {
    message.channel.send("If you want your YouTube Channel to be shown here, ping NLHMS#2100.<:youtube:863441892947132436>");
  } 
  else if (message.content.includes("is now streaming")&&message.guild.id == '800469764341366795') {
    message.channel.send("If you want your Twitch Channel to be shown here, ping NLHMS#2100.<a:twitch:863441893119885332>");
  }
  else if(message.content.includes("discord.gg/"||"discord.gg/invite")&&message.guild.id == '800469764341366795'){
    message.delete()
    message.channel.send("No Promoting Discord Servers. Rule 4 <a:read_rules:853016245783887891>")
    .then (message=>{
    message.delete({timeout:5000})
    })
    const user2=message.author.id
    const user =bot.users.cache.get('821736517012815882');
    user.send(`${user2} sent an invite link O.o`);
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
//Banned Hey Lol
bot.on('guildMemberAdd', member => {
  if(member.guild.id == '816838874549583883'){
    member.ban()
  }
});
//Welcome 
bot.on('guildMemberAdd', member=>{
  if(member.guild.id == '875049238504038400'){
    member.guild.channels.cache.get('875049238504038403').send(`${member} just joined. We should check out the situation. <:suseyes:875058230089371658>`);
  }
})
//Ranking
const leveling = require("./src/ranking");
leveling(bot)

keepAlive()
bot.login(process.env.TOKEN)