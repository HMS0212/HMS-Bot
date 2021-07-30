module.exports = {
  name: 'delete',
  description: "Used to delete messages a channel",
  async execute(message, args) {

    try {

    const amount = Number(args[0], 10)

    const messages = await message.channel.messages.fetch({
      limit: amount + 1
    })

    message.channel.bulkDelete(messages)

    message.channel.send(`${amount} messages were deleted from this channel.`)
      .then(message=>{
        setTimeout(()=>message.delete(), 10000)
      })

    }

    catch(e) { 
      console.log(e)
      message.channel.send("Something went wrong.. please try again.")
    }

  }
}