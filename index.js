const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot LS Custom est en ligne !');
});

app.listen(port, () => {
  console.log(`Serveur web démarré sur le port ${port}`);
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

const AUTHORIZED_ROLE_ID = '1389671691759779840';

client.once('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Vérifier que l'auteur a le rôle autorisé
  const member = message.member;
  if (!member.roles.cache.has(AUTHORIZED_ROLE_ID)) {
    // Optionnel : tu peux envoyer un message d'erreur ou juste ignorer
    // return message.reply("❌ Vous n'avez pas la permission d'utiliser cette commande.");
    return; // Ici on ignore simplement
  }

  try {
    if (message.content === '!acc') {
      await message.delete().catch(() => {
        console.warn('Impossible de supprimer le message !acc');
      });

      const embedAcc = new EmbedBuilder()
        .setColor('#2ecc71') // Vert agréable
        .setTitle('🎉 Félicitations, ta candidature est acceptée !')
        .setDescription(
`Bonjour,

Nous sommes ravis de t'accueillir officiellement dans l’équipe LS Custom. Ton profil a su nous convaincre et nous sommes impatients de collaborer avec toi.

Nous comptons sur ton engagement pour faire vivre une ambiance positive et professionnelle, et contribuer au succès de notre garage.

Bienvenue parmi nous ! 🚗🔧`
        )
        .setFooter({ text: 'LS Custom • Ensemble vers la réussite' })
        .setTimestamp();

      await message.channel.send({ embeds: [embedAcc] });
      console.log(`Commande !acc utilisée par ${message.author.tag}`);
    }

    if (message.content === '!ref') {
      await message.delete().catch(() => {
        console.warn('Impossible de supprimer le message !ref');
      });

      const embedRef = new EmbedBuilder()
        .setColor('#e74c3c') // Rouge doux
        .setTitle('🤝 Merci pour ta candidature')
        .setDescription(
`Hello,

Après une étude attentive de ta candidature, nous ne pouvons malheureusement pas donner suite cette fois-ci.

Ne te décourage pas, chaque expérience est une étape vers le succès. Nous te souhaitons le meilleur pour tes projets à venir.

N’hésite pas à postuler à nouveau lors de nos prochains recrutements. Bonne chance ! 🔧✨`
        )
        .setFooter({ text: 'LS Custom • Merci de ton intérêt' })
        .setTimestamp();

      await message.channel.send({ embeds: [embedRef] });
      console.log(`Commande !ref utilisée par ${message.author.tag}`);
    }

    if (message.content === '!th') {
      await message.delete().catch(() => {});

      const embedTh = new EmbedBuilder()
        .setColor('#f1c40f')
        .setTitle('🚨 INFORMATION IMPORTANTE - LS CUSTOM 🚨')
        .setDescription(
`Tous les candidats ayant postulé pour travailler au LS Custom doivent impérativement choisir une tranche horaire qui leur convient pour assurer leurs prestations.

⏰ Obligation : Une fois la tranche choisie, vous devez prester minimum 2 heures dans cette tranche horaire.
❌ Si ce quota n’est pas respecté, cela sera considéré comme un non-respect de vos engagements, et entraînera un licenciement automatique pour non-respect du quota horaire.

Merci de votre compréhension et de votre professionnalisme.🔧`
        )
        .setFooter({ text: 'LS Custom • Règlement interne' })
        .setTimestamp();

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('select_time_slot')
        .setPlaceholder('Choisissez votre tranche horaire')
        .addOptions([
          {
            label: 'Horaire Matin (6h / 12h)',
            description: 'Tranche horaire du matin',
            value: 'morning',
            emoji: '⏰',
          },
          {
            label: 'Horaire Après-midi (12h/16h)',
            description: 'Tranche horaire de l\'après-midi',
            value: 'afternoon',
            emoji: '🌞',
          },
          {
            label: 'Horaire Début Soirée (16h/20h)',
            description: 'Tranche horaire début soirée',
            value: 'early_evening',
            emoji: '🌆',
          },
          {
            label: 'Horaire Fin Soirée (20h/00h)',
            description: 'Tranche horaire fin soirée',
            value: 'late_evening',
            emoji: '🌙',
          },
          {
            label: 'Horaire Nuit (00h/6h)',
            description: 'Tranche horaire nuit',
            value: 'night',
            emoji: '🌌',
          },
        ]);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await message.channel.send({ embeds: [embedTh], components: [row] });
      console.log(`Commande !th utilisée par ${message.author.tag}`);
    }

    if (message.content === '!form') {
      await message.delete().catch(() => {});

      const embedForm = new EmbedBuilder()
        .setColor('#3498db') // Bleu
        .setTitle('📚 FORMATION OBLIGATOIRE – LS CUSTOM 📚')
        .setDescription(
`Félicitations à ceux qui ont été retenus pour rejoindre l’équipe du LS Custom ! Avant de commencer officiellement, certaines démarches sont obligatoires pour valider votre entrée dans l’entreprise :

**Recensement au LSPD :**
Vous devez vous rendre au commissariat pour vous faire recenser en tant qu’employé civil.

**Certificat d’aptitude au travail :**
Prenez rendez-vous aux EMS pour obtenir un certificat médical d’aptitude au travail.
👉 Ce certificat est à vos frais. Aucune prise en charge ne sera faite par l'entreprise.

**Permis de conduire obligatoires :**
Vous devez être en possession du permis B (voiture) et du permis C (poids lourds) pour pouvoir travailler en toute légalité.

⏳ Merci d’effectuer ces démarches au plus vite afin de ne pas retarder votre intégration.

En cas de questions, n’hésitez pas à contacter un responsable.🔧`
        )
        .setFooter({ text: 'LS Custom • Formation' })
        .setTimestamp();

      await message.channel.send({ embeds: [embedForm] });
      console.log(`Commande !form utilisée par ${message.author.tag}`);
    }

  } catch (error) {
    console.error('Erreur lors du traitement d\'une commande :', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'select_time_slot') {
    const selectedValue = interaction.values[0];

    const labels = {
      morning: 'Horaire Matin (6h / 12h)',
      afternoon: 'Horaire Après-midi (12h/16h)',
      early_evening: 'Horaire Début Soirée (16h/20h)',
      late_evening: 'Horaire Fin Soirée (20h/00h)',
      night: 'Horaire Nuit (00h/6h)'
    };

    const channelNames = {
      morning: '6h-12h',
      afternoon: '12h-16h',
      early_evening: '16h-20h',
      late_evening: '20h-00h',
      night: '00h-6h'
    };

    const chosenLabel = labels[selectedValue] || 'tranche horaire inconnue';
    const newChannelName = channelNames[selectedValue] || null;

    // Message public de confirmation dans le salon
    await interaction.channel.send(`✅ ${interaction.user}, vous avez choisi la tranche horaire : **${chosenLabel}**. Merci de votre engagement !`);

    // Acknowledge l'interaction sans message visible
    await interaction.deferUpdate();

    // Renommer le salon (si possible)
    if (newChannelName && interaction.channel && interaction.channel.edit) {
      try {
        await interaction.channel.setName(newChannelName);
        console.log(`Salon renommé en "${newChannelName}" suite au choix de ${interaction.user.tag}`);
      } catch (error) {
        console.error('Erreur lors du renommage du salon :', error);
      }
    }
  }
});

client.login(process.env.TOKEN);
