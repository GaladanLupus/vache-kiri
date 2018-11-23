const Discord = require('discord.js');
const client = new Discord.Client();
var dispatcher;
var prefix = "!";

client.login("NTE1MDk4NjI1MDcyNjkzMjQ4.DtgtTQ.pkUcUxbWM_1DkSOPsMRwiM7m6iw");

client.on('ready', () => {
    console.log('Je suis opérationnel !')
    client.user.setGame('area-serveur.eu')
});

// SUPORT

client.on('message', message => {

    if(message.content === prefix + "support") {
    const embed = new Discord.RichEmbed()
        .setTitle('__**Demande de support :**__')
        .setColor(0xFF0000)
        .setDescription('Besoin d\'aide ? J\'ai été programmé pour répondre aux questions courantes afin de vous permettre une réponse rapide. \n\n Il vous suffit d\'écrire la commande **!help** pour voir les demandes de support que je peux traiter.\n')
        .setFooter(`requête envoyée par ${message.author.username}`)
    message.channel.send(embed);
    }



    if (message.content === prefix + 'help') {
    const embed = new Discord.RichEmbed()
        .setTitle('__**Demande d\'aide :**__')
        .setColor(0xFF0000)
        .setDescription('**!adobe** — *Un problème de message adobe qui ne part pas en acceptant ?* \n' +
                        '**!install** — *Des fichiers manquants ou des problèmes en jeu ? Sûrement une mauvaise installation !* \n' +
                        '**!vote** — *Vous avez récemment voté, et vous n\'avez pas reçu vos points ?');
    message.channel.send(embed);
};

    if (message.content === prefix + 'adobe') {
    const embed = new Discord.RichEmbed()
        .setTitle('__**Adobe :**__')
        .setColor(0xFF0000)
        .setDescription('__Pour tous ceux ayant le problème d\'adobe "Accepter ou Refuser" lors de l\'installation d\'Area, merci de suivre étape par étape les consignes suivantes :__\n\n' +
            '- Assurez-vous qu\'Area a bien été installer dans un dossier vide\n' +
            '- Acceder donc a ce dossier, et supprimer les fichier nommés : Dofus.exe et Dofus.dll\n' +
            '- Copier le dossier Area.zip dans ce dossier, clique droit : Extraire ici\n' +
            '- Au prochain lancement d\'Area ce message ne devrait plus vous bloquer');
    message.channel.send(embed);
};


 // MODERATION

 if(message.content.startsWith(prefix + "kick")) {
     if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas la permission pour effectuer cette commande !");
     if(message.mentions.users.size === 0) return message.channel.send("Tu n'as pas mentionné de membre pour effectuer cette commande !")
     
     var kick = message.guild.member(message.mentions.users.first());
     if(!kick){
         return message.channel.send("Utilisateur inconnu !");
     }
     if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
         return message/channel.send("Je n'ai pas la permission d'effectuer cette commande !");
     }
     kick.kick().then(member =>{
         message.channel.send(`${member.user.username} a été exclu du serveur par ${message.author.username} !`)
     });
 }

 if(message.content.startsWith(prefix + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n'as pas la permission pour effectuer cette commande !");
    if(message.mentions.users.size === 0) return message.channel.send("Tu n'as pas mentionné de membre pour effectuer cette commande !")
    
    var ban = message.guild.member(message.mentions.users.first());
    if(!ban){
        return message.channel.send("Utilisateur inconnu !");
    }
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return message/channel.send("Je n'ai pas la permission d'effectuer cette commande !");
    }
    ban.ban().then(member =>{
        message.channel.send(`${member.user.username} a été banni du serveur par ${message.author.username} !`)
    });
}

if(message.content.startsWith(prefix + 'clear')) {

    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n\'as pas la permission d\'utiliser cette commande !");

    let args = message.content.split(" ").slice(1);
    
    if (!args[0]) return message.channel.send("Tu n\'as pas précisé un nombre !")

        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés !`);

        })
    }


// MUSIC
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const broadcast = client.createVoiceBroadcast();

if(message.content === prefix + 'play') {
    if(message.member.voiceChannel) {
        message.member.voiceChannel.join().then(connection => {
              const stream = ytdl('https://www.youtube.com/watch?v=w_DKWlrA24k', { filter : 'audioonly' });
              broadcast.playStream(stream);
              const dispatcher = connection.playBroadcast(broadcast);
            }).catch(console.error);
        
    } else sendError(message, "Erreur, vous devez d'abord rejoindre un canal vocal !");
}



});
