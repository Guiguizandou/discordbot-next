const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', () => {
    bot.user.setActivity('=help', { type: 'WATCHING'});
    console.log('The bot is now online');
    });

bot.on('message', function (message) {
    if (message.content === '=help') {
        message.channel.send({embed: {color: 5483232, title: 'Voici les commandes disponibles :',
                                      description: "=help : Voir toutes les commandes\n =radio-ng : Allumer NG-Radio\n =radio-funradio : Allumer Funradio\n =radio-mouv : Allumer Mouv'\n =radio-off : Éteindre la radio"}})
    }
})

bot.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '=radio-ng') {
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

bot.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '=radio-funradio') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      console.log('Radio On');
      const dispatcher = connection.play('http://streaming.radio.funradio.fr/fun-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg', {
        volume: 0.5,
      });
    } else {
      message.reply('Vous devez être connecté à un channel pour mettre Funradio');
    }
  }
});

bot.on('message', async message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === '=radio-mouv') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      console.log('Radio On');
      const dispatcher = connection.play('http://direct.mouv.fr/live/mouv-midfi.mp3', {
        volume: 0.5,
      });
    } else {
      message.reply('Vous devez être connecté à un channel pour mettre Mouv\'');
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
