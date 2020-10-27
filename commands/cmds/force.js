const db = require("quick.db")
module.exports = {
  name: "force",
  run: async (client, message, args) => {
    if(!message.member.roles.cache.has('745339972155998278')) {
      return message.reply("Você não é um coordenador!")
    }
    let mem = message.mentions.members.first()
    if(!mem) {
      return message.reply("Você não mencionou ninguém!")
    }
    let b = db.get(`botid_${mem.user.id}`)
     
     db.delete(`veri_${b}`)
     db.delete(`nota_${b}`)
     db.delete(`verificador_${b}`)
     db.delete(`fim_${b}`)
     db.delete(`hbot_${mem.user.id}`)
     db.delete(`botid_${mem.user.id}`)
     db.delete(`botq_${mem.user.id}`)
     message.reply("Reprovação forçada, este membro agora pode enviar outro bot!")
  }
}