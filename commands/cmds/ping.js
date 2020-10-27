module.exports= {
  name: "ping",
  timeout: 1,
  run: async (client, message, args) => {
  message.channel.send(`**Estou rodando a \`${client.ws.ping}\` ms!**`)
}
}