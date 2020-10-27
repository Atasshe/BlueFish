const Discord = require("discord.js")
module.exports = {
  name: "ajuda",
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.user.username} - Ajuda`, client.user.displayAvatarURL())
     .setColor("BLUE")
     .setThumbnail(message.guild.iconURL({dynamic: true}))
    .setFooter(`© ${client.user.username}`)
    .addField("Comandos dos membros", `__.addbot__ » Adiciona o seu bot no servidor\n__.remover__ » Remove seu bot do servidor\n__.ajuda__ » Mostra essa aba\n__.bot__ » Vê as informações de um bot\n__.ping__ » Vê a latência do bot\n__.votar__ » vote no seu bot preferido\n__.rank__ » veja o rank dos bots mais votados`,false)
    .addField("Comandos verificador", `__.verificar__ » Começa a verificar um bot\n__.nota__ » Adiciona uma nota para um bot, ex: precisa arrumar o comando de ban.\n__.aprovar__ » Aprova um bot depois de ser verificado\n__.reprovar__ » Reprova um bot após ser verificado`, false)
    .addField("Comandos coordenador", "__.remover__ » Remove o bot de um membro\n__.force__ » Faz uma reprovação forçada para o membro poder enviar o bot novamente", false)
    message.channel.send(embed)
  }
}