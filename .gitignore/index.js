const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', () => {
    console.log('The bot is now online');
    });

bot.on('ready', () => {
    bot.user.setGame('=help')
    });

bot.on('message', function (message) {
    if (message.content === '=help') {
        message.channel.send({embed: {color: 5483232, title: 'Voici les commandes disponibles :', description: "=help : Voir toutes les commandes\n =radio-on : Allumer NG-Radio\n =radio-off : Éteindre NG-Radio"}})
    }
})

bot.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '=radio-on') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      console.log('Radio On');
      const dispatcher = connection.play('https://streaming.nationsglory.fr/NGRadio', {
        volume: 0.5,
      });
    } else {
      message.reply('Vous devez être connecté à un channel pour mettre NG-Radio');
    }
  }
});

bot.on('message', function (message) {
    if (message.content === '=radio-off') {
        message.member.voice.channel.leave();
        console.log('Radio Off');
    }
})

bot.login(process.env.TOKEN)
