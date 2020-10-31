const Discord = require("discord.js")
const Timeout = new Discord.Collection()
module.exports = {
  name: "votar",
  aliases: ["vote"],
  run: async (client, message, args) => {
    var bot = message.mentions.members.first()
    if(!bot) {
       return message.reply("Você esqueceu de mencionar o bot")
    }
    if(!bot.user.bot) {
      return message.reply(`Você não mencionou um bot e sim um usuário!`)
    }
    if(bot.user.id == cliente.user.id) {
      return message.reply("Não quero seus votos.")
    }
    var ref = `BotList/Bots/${bot.user.id}/Infos`
    client.db.ref(ref).once("value").then(async function(snap) {
      if(snap.val() != null) {
      
 if(!Timeout.has("votar")){
           Timeout.set("votar", new Discord.Collection())
         }
         const now = Date.now()
         const pegar = Timeout.get("votar")
         const amount = (1*60*60*8 || 3) * 1000
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
        
        var quan
        if(message.member.roles.cache.has("752652782875574427")) {
          quan = 2
        } else {
          quan = 1
        }
          
        var votos = snap.val().votos
        if(votos == null) votos = 0
        var votosnew = votos + quan
        client.db.ref(`BotList/Bots/${bot.user.id}/Infos`).update({
          votos: votosnew
        })
        message.reply(`Voto realizado com sucesso, o bot recebeu \`${quan}\` voto(s)`)
        var canal = "id do canal de logs'"
        var canalm = client.channels.cache.get(canal)
        canalm.send(`<:voto:746416781416988752> | ${message.author} acabou de votar no bot \`${bot.user.username}\` e agora ele tem \`${votos + quan}\` votos!`)
      } else {
      return message.reply("Este bot não está registrado na minha database!")
    }
    })
  }
}
