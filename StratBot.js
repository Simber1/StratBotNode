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
  valid = false

  if (msg.content.includes("kh")){
    if (msg.content.includes("def")){
      while(!valid){
        valid = randStrat("Defenders","Killhouse");
      }
      msg.channel.send(embed(valid));
      return;
    }
    if (msg.content.includes("att")||msg.content.includes("atk")){
      while(!valid){
        valid = randStrat("Attackers","Killhouse");
      }
      msg.channel.send(embed(valid));
      return;
    }
  }
  //console.log(randStrat("both","all"))
  msg.channel.send(embed(randStrat("Both","All")));
  
});

function embed(strat){
  const embed = new RichEmbed();
  embed.addField("Name",strat.Name);
  embed.addField("Description",strat.Description);
  embed.addField("Team",strat.Team);
  embed.addField("TileSet",strat.Tileset);

  embed.setColor(0xFF0000);
  return embed;
}

function randStrat(team,tileset){

  num = rand(1,results.length)-1;

  console.log(results[num].Tileset.toLowerCase())
  console.log(team.toLowerCase())
  
  if(team === results[num].Team||"Both" === results[num].Team){
    if(tileset === results[num].Tileset||"All" === results[num].Tileset){
      return results[num];
    }
  }
  console.log(team === "Both")
  if(team === "Both"){
    console.log(results[num]);
    return results[num];
  }

  return false;
}

client.login(process.env.token);