const db = require("quick.db")
const ms = require("ms")
const Discord = require("discord.js")
const Timeout = new Discord.Collection()
const { dprefix } = require("../../config.json")
module.exports = async (client, message) => {
   
  

  
    
   
    

    
   if(message.author.bot) return
    if(!message.content.toLowerCase().startsWith(dprefix)) return;
    if(!message.guild) return;
    
    let args = message.content.slice(dprefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    if(cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd))
    
    if(command){
    if(command.timeout) {
        if(!Timeout.has(command.name)){
           Timeout.set(command.name, new Discord.Collection())
         }
         const now = Date.now()
         const pegar = Timeout.get(command.name)
         const amount = (command.timeout || 3) * 1000
         if(Timeout.has(message.author.id)){
           const exp = Timeout.get(message.author.id) + amount
           if(now < exp) {
             const left = (exp - now).toFixed(0) / 1000
             
             var segundos = (left % 60).toFixed(0)
             var minutos = Math.floor(left/60) % 60
             var horas = Math.floor(left/3600) % 24
             var fim = (horas < 10 ? "0" + horas : horas) + "h " + (minutos < 10 ? "0" + minutos : minutos) + "m " + (segundos < 10 ? "0" + segundos : segundos) + "s "
             
             return message.reply(`Por favor espere mais **${fim}** para executar este comando novamente!`)
           }
         } else {
           Timeout.set(message.author.id, now)
           setTimeout(() => {
             Timeout.delete(message.author.id)
           }, amount)
         }
       }
    command.run(client, message, args)
    message.delete()
    }
  }

