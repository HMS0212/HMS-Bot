const Discord=require('discord.js')
const categories = [
  {
    emoji: '1️⃣',
    name: 'Fun Commands',
    color: "#5271ff",
    title: 'Fun Commands',
    description: 'Use these commands for fun',
    commands:[
      {
        name:'\u200b',
        value:'1. 8Ball+Question\n2.DM+User+Message\n3. Flight+Flight Number\n4. Joke\n5. Quote\n 6. Snipe\n 7. Weather+City\n 8. Avatar+User',
      },
    ],
  },
  {
    emoji: '2️⃣',
    name: 'Utility Commands',
    color: "#5271ff",
    title: 'Utility Commands',
    description: 'Use these commands for moderation and other things',
    commands:[
      {
        name:'\u200b',
        value:'1. AddRole+User+Role\n2. RemoveRole+User+Role\n3. Ban+User\n4. Delete+Messages to Delete\n5. Kick+User\n6. Unban+User ID\n7. Create Channel(Cchannel+type+name)\n8. Delete Channel(Dchannel [Deletes channel you are currently in, DOES NOT WORK FOR VOICE CHANNEL])',
      },
    ],
  },
  {
    emoji: '3️⃣',
    name: 'Custom',
    color: "#5271ff",
    title: 'Custom Commands',
    description: 'Request these commands for your server',
    commands: [
      {
        name: '\u200b',
        value: '1. Disable Invites(setconf invites on/off)\n2. Rank and Leaderboard(setconf levels on/off)'
      },
    ],
  },
  {
    emoji: '4️⃣',
    name: 'Music Commands',
    color: "#5271ff",
    title: 'Music Commands',
    description: 'Use these commands for playing music',
    commands:[
      {
        name:'\u200b',
        value:'1. Play+Song\n2. Skip\n3. Queue\n4. Pause\n5. Resume\n6. Jump+Number\n7. Disconnect\n8. Loop\n9. Shuffle\n10. Volume+Number\n11. Autoplay',
      },
    ],
  },
];

module.exports = {
  name: 'help',
  description: 'Overview of all commands!',
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor("#5271ff")
      .setTitle('Commands for HMS Bot')
      .setDescription('Thanks for using HMS Bot! The prefix for this bot is "!". If u have something you would like to add, DM Hammad.S#0001. React to the message to see commands of a specific category!')
      .addFields(
        // add fields for each category
        categories.map((cat) => ({
          name: `${cat.emoji}   ${cat.name}`,
          value: '\u200b',
        }))
      )
      .setFooter('Help Command')
      .setThumbnail('https://i.ibb.co/TBHfwsw/Neon-Light-Glow-Vegan-Noodles-Logo-2.png')
      .setTimestamp();

    message.channel.send(embed).then((embedMsg) => {
      // send reactions for each emojis
      const emojis = categories.map((cat) => cat.emoji);
      emojis.forEach((emoji) => embedMsg.react(emoji));

      // the filter checks if the reaction emoji is in the categories
      // it also checks if the person who reacted shares the same id
      // as the author of the original message
      const filter = (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id === message.author.id;

      const collector = embedMsg.createReactionCollector(filter, {
        // max number of reactions is the number of categories
        max: emojis.length,
        // it won't accept reactions after 60 seconds
        // optional, you can remove/change it
        time: 30000,
      });

      collector.on('collect', (reaction, user) => {
        // find the category by its emoji
        const selectedCategory = categories.find(
          (category) => category.emoji === reaction.emoji.name,
        );

        if (!selectedCategory) {
          return message.channel.send('Oops, there was an error... Try again?!');
        }

        const embed = new Discord.MessageEmbed()
          .setColor(selectedCategory.color)
          .setTitle(selectedCategory.title)
          .setDescription(selectedCategory.description)
          .addFields(selectedCategory.commands)
          .setFooter('Help Command')
          .setThumbnail('https://i.ibb.co/TBHfwsw/Neon-Light-Glow-Vegan-Noodles-Logo-2.png')
          .setTimestamp();
          embedMsg.delete();
          message.channel.send(embed);
      });
    });
  },
};
