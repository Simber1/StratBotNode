const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');
const env = require("dotenv").config();
const csv = require('csv-parser');
const fs = require('fs');
const rand = require('random-int');

const client = new Discord.Client();

const results = [];

fs.createReadStream('source.tsv').pipe(csv({ separator: '\t'})).on('data', (data) => results.push(data)).on('end', () => {return;});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author === client.user || msg.author.id === "592481949743054889"){
    return;
  }
  msg.channel.send(embed(results[0]));
});

function embed(strat){
  const embed = new RichEmbed();
  embed.addField("Name",strat.Name);
  embed.addField("Desc",strat.Description);
  embed.addField("Team",strat.Team);
  embed.addField("TileSet",strat.Tileset);

  embed.setColor(0xFF0000);
  return embed;
}

function randStrat(team,tileset){
  num = rand(1,results.length);
  if(team === "both"){
    return num;
  }
  
}

client.login(process.env.token);