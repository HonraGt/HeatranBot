const leveling = require('discord-leveling');

module.exports = {
    name: "level",
    description: "mostra o level do usuario",

    async run(client, message, args) {

        if (message.guild.id !== '661163930101612545') return;

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

        let output = await leveling.Fetch(user.id)
        message.channel.send(`Hey ${user}, o seu nível atual é ${output.level} com ${output.xp} xp!`);
    }
}