const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Du kannst dies nicht machen!/You can´t do this!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Diese Person kann nicht gekickt werden!/That person can't be kicked!");


    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);


    let kickChannel = message.guild.channels.find(`name`, "kicked_banned");
    if(!kickChannel) return message.channel.send("Can't find kicked_banned channel.");


    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}


module.exports.help = {
    name: "kick"
}