const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js")
const { Client, Collection } = require("discord.js")
const fs = require("fs")
const { prefix } = require("./config.json")
const client = new Discord.Client({
    disableEveryone: true
})



client.token = process.env.TOKEN
client.commands = new Collection()
client.aliases = new Collection()
client.categories = fs.readdirSync("./commands/");
["command", "event", "database"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});



client.login(process.env.TOKEN)
