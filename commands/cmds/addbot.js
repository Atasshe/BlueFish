
const Discord = require("discord.js")
const axios = require("axios")
module.exports = {
  name: 'addbot',
  run: async (client, message, args) => {
    var db = client.db
    if(message.channel.id != "745360456016986235") {
      return message.reply("Use esse comando somente no canal <#745360456016986235>")
    }
    message.reply("Veja seu privado, caso você não receber nada verifique se sua dm está aberta e use o comando novamente.").then(d => d.delete({timeout: 10000}))
    message.author.send(`Qual o **ID** do seu bot?`).then(msg => {
      let cp = message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, {max: 1, time: 120000}).on('collect', async i => {
        msg.delete()
        
        let id = i.content
        if(isNaN(id)) {
          return message.author.send("Você precisa dar um id válido! use o comando novamente e tente de novo.")
        }
  
        let mem = message.guild.members.cache.map(u => u.user.id)
        
        
        if(mem.includes(id)){
          return message.author.send("Ei, não tente dar o id de um membro do servidor!")
        }
        var data = await axios.get(`https://discord.com/api/v6/users/${id}`,{
         headers: { Authorization: `Bot ${client.token}`}
       }).catch(e => {
         let errorCode = e.response.status
         if(errorCode == "404") {
            message.author.send("Ops, algo deu errado ao tentar achar o seu bot tente novamente mais tarde! (ID Invalido)")
         }
         else {
           message.author.send(`Houve um erro inesperado, tente novamente mais tarde! Erro: \`${e}\``)
         }
       }) 
       if(!data) return;
       var nome = data.data.username
            message.author.send(`Qual o **PREFIXO** do seu bot?`).then(msg3 => {
              let cp3 = message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, {max: 1, time: 120000}).on('collect', p => {
                msg3.delete()
                
                let prefixo = p.content
                message.author.send("Para finalizaremos qual a **LINGUAGEM** do seu bot?\nLinguagens disponíveis: Javascript, DBD, Python, outra").then(msg4 => {
                  let cp4 = message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, {max: 1, time: 120000}).on('collect', l => {
                    msg4.delete()
                    
                    let lingua = l.content.toLowerCase()
                    if(lingua != "javascript" && lingua != "dbd" && lingua != "python" && lingua != "outra") {
                      return message.author.send("Você não escolheu uma linguagem válida! use o comando novamente e de as informações corretas.")
                    }
                    
                    message.author.send("Você realmente deseja enviar o bot para verificação? digite **sim** para enviar ou **não** para cancelar.").then(fim => {
                      let cp5 = message.author.dmChannel.createMessageCollector(x => x.author.id === message.author.id, {max: 1, time: 120000}).on('collect', f => {
                         fim.delete()
                        let choice = f.content.toLowerCase()
                        if(choice == "nao" || choice == "não") {
                          return message.author.send("Operação cancelada!")
                        } else if(choice == "sim") {
                          let soli = client.channels.cache.get('745390110249582732')
                          const embed = new Discord.MessageEmbed()
                          .setAuthor(`Novo bot enviado por ${message.author.username}`)
                          .addField("Nome", nome, false)
                          .addField("ID", id, false)
                          .addField("Prefixo", prefixo, false)
                          .addField("Linguagem", lingua, false)
                          .setColor("#78271").addField("Link", `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=0&scope=bot`, false)
                          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                         soli.send('<@&745342351953625098>',embed).then(msg => {
                          
                         })
                         let bl = client.channels.cache.get('745387874324840539')
                         bl.send(`<:mns1:746470605653803181> | O membro ${message.author} enviou o bot \`${nome}\` para verificação!`)
                         message.author.send(`✅  | O bot \`${nome}\` foi enviado para verificação, por favor aguarde ele ser analisado, fique de olho no canal ${bl}.`)
                 db.ref(`BlueF/Bots/${id}/Infos`).set({
                   nota: "nao",
                   prefixo: prefixo,
                   nome: nome,
                   id: id,
                   dono: message.author.id,
                   desc: "Não definido",
                   verificado: "nao",
                   fim: "nao",
                   votos: 0,
                   verificador: "nao",
                   lingua: lingua
                 })
                        
                 db.ref(`BlueF/Donos/${message.author.id}/Bot`).set({
                   bot: id
                 })
                        
                        }
                      })
                    })
                  })
                })
              })
            })
            
          })
        })
      }
}