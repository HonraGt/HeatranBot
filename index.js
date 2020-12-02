const express = require('express');
const app = express();
app.get('/', (request, response) => {
    const ping = new Date();
    ping.setHours(ping.getHours() - 3);
    console.log(
        `Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
    );
    response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    if (
        message.content.startsWith(`<@!${client.user.id}>`) ||
        message.content.startsWith(`<@${client.user.id}>`)
    )
        return;

    const args = message.content
        .trim()
        .slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error('Erro:' + err);
    }
});

client.on('ready', () => {
    let activities = [
            `Utilize ${config.prefix}help para obter ajuda.`,
            `${client.guilds.cache.size} servidores!`,
            `${client.channels.cache.size} canais!`,
            `${client.users.cache.size} usuários!`
        ],
        i = 0;
    setInterval(
        () =>
        client.user.setActivity(`${activities[i++ % activities.length]}`, {
            type: 'WATCHING'
        }),
        1000 * 60
    ); // WATCHING, LISTENING, PLAYING, STREAMING

    client.user
        .setStatus('online') // idle, dnd, online, invisible
        .catch(console.error);
    console.log('Estou Online!');
});

client.on("guildMemberAdd", async(member) => {

    let guild = await client.guilds.cache.get("715975302227951619");
    let channel = await client.channels.cache.get("715997496786157599");
    let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "doge");
    if (guild != member.guild) {
        return console.log("Bem vindo!.");
    } else {
        let embed = await new Discord.MessageEmbed()
            .setColor("#03d6ff")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`${emoji} Boas-vindas ${emoji}`)
            .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png" && "gif", size: 1024 }))
            .setFooter("Siga HonraGT no Twitch")
            .setTimestamp();

        channel.send(embed);
    }
});

client.on("guildMemberRemove", async(member) => {

    let guild = await client.guilds.cache.get("715975302227951619");
    let channel = await client.channels.cache.get("715997566755405934");
    let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "Elmofire");
    if (guild != member.guild) {
        return console.log("Alguem Saiu do Servidor :(");
    } else {
        let embed = await new Discord.MessageEmbed()
            .setColor("#0500ff")
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setTitle(`${emoji} Adeus! ${emoji}`)
            .setDescription(`**${member.user.username}**, saiu do servidor! Espero que um dia volte.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png" && "gif", size: 1024 }))
            .setFooter("Siga HonraGT no Twitch")
            .setTimestamp();

        channel.send(embed);
    }
});
//xp
const leveling = require('discord-leveling');

client.on("message", async message => {
    if (message.guild.id !== '715975302227951619') return;
    if (message.channel.id === '716037677006323783') return;
    if (message.author.bot) return
    let profile = await leveling.Fetch(message.author.id);
    let amount = 15;
    if (message.member.roles.cache.get('715989732684726617')) amount = parseInt(amount * 3);
    if (message.member.roles.cache.get('716050837385773077')) amount = parseInt(amount * 2);
    if (message.member.roles.cache.get('716050915970515084')) amount = parseInt(amount * 1.5);

    leveling.AddXp(message.author.id, amount);

    if (profile.xp + 15 > 150) {
        leveling.AddLevel(message.author.id, 1);
        leveling.SetXp(message.author.id, 0)
        message.channel.send(`🆙 **|** ${message.author} foi para o level ${profile.level + 1}`)
            .then(m => {
                m.delete({ timeout: 10000 }).catch();
            });
    }

    if (profile.level == 1) {
        message.member.roles.add('')
    }
    if (profile.level == 20) {
        message.member.roles.add('')
    }
    if (profile.level == 40) {
        message.member.roles.add('')
    }
    if (profile.level == 80) {
        message.member.roles.add('')
    }
    if (profile.level == 100) {
        message.member.roles.add('')
    }
    if (profile.level == 200) {
        message.member.roles.add('')
    }
    if (profile.level == 375) {
        message.member.roles.add('')
    }
    if (profile.level == 500) {
        message.member.roles.add('')
    }
});

client.on('raw', async dados => {
    if (dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if (dados.d.message_id != "716052793567346698") return

    let servidor = client.guilds.get("715975302227951619")
    let membro = servidor.members.get(dados.d.user_id)

    let menino = servidor.roles.get('715983823455911997'),
        menina = servidor.roles.get('715991295788712057'),
        desoito = servidor.roles.get('715991298120745414'),
        menor = servidor.roles.get('715991300222222407'),
        daycarer = servidor.roles.get('715991301212078294'),
        Sorteios = servidor.roles.get('715990647382999120'),
        Eventos = servidor.roles.get('715991157645115505')


    if (dados.t === "MESSAGE_REACTION_ADD") {
        if (dados.d.emoji.id === "716750897648238711") {
            if (membro.roles.has(menino)) return
            membro.addRole(menino)
        } else if (dados.d.emoji.id === "716750884268408964") {
            if (membro.roles.has(menino)) return
            membro.addRole(menina)
        } else if (dados.d.emoji.id === "716751097221480579") {
            if (membro.roles.has(desoito)) return
            membro.addRole(desoito)
        } else if (dados.d.emoji.id === "716751083464032273") {
            if (membro.roles.has(menor)) return
            membro.addRole(menor)
        } else if (dados.d.emoji.id === "716751216457285713") {
            if (membro.roles.has(daycarer)) return
            membro.addRole(daycarer)
        } else if (dados.d.emoji.id === "716751236996792351") {
            if (membro.roles.has(Eventos)) return
            membro.addRole(Eventos)
        } else if (dados.d.emoji.id === "716751039881150544") {
            if (membro.roles.has(Sorteios)) return
            membro.addRole(Sorteios)

        }
    }
    if (dados.t === "MESSAGE_REACTION_REMOVE") {
        if (dados.d.emoji.id === "716750897648238711") {
            if (membro.roles.has(menino)) return
            membro.removeRole(menino)
        } else if (dados.d.emoji.id === "716750884268408964") {
            if (membro.roles.has(menino)) return
            membro.removeRole(menina)
        } else if (dados.d.emoji.id === "716751097221480579") {
            if (membro.roles.has(desoito)) return
            membro.removeRole(desoito)
        } else if (dados.d.emoji.id === "716751083464032273") {
            if (membro.roles.has(menor)) return
            membro.removeRole(menor)
        } else if (dados.d.emoji.id === "716751216457285713") {
            if (membro.roles.has(daycarer)) return
            membro.removeRole(daycarer)
        } else if (dados.d.emoji.id === "716751236996792351") {
            if (membro.roles.has(Eventos)) return
            membro.removeRole(Eventos)
        } else if (dados.d.emoji.id === "716751039881150544") {
            if (membro.roles.has(Sorteios)) return
            membro.removeRole(Sorteios)
        }
    }

})

client.login(process.env.TOKEN);