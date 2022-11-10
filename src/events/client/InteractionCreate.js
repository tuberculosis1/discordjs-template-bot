const { InteractionType, Collection, PermissionFlagsBits, ActionRowBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const Event = require('@structures/Event');
const Context = require('@structures/Context');

module.exports = class InteractionCreate extends Event {
    constructor(...args) {
        super(...args);
    }
    async run(interaction) {
        const color = this.client.config.color ? this.client.config.color : 'Red';

        if (interaction.type === InteractionType.ApplicationCommand) {
            const { commandName } = interaction;
            if (!commandName) return await interaction.reply({ content: 'Unknow interaction!' }).catch(() => { });
            const prefix = this.client.config.prefix;
            const cmd = this.client.commands.get(interaction.commandName);
            if (!cmd || !cmd.slashCommand) return;
            const command = cmd.name.toLowerCase();

            const ctx = new Context(interaction, interaction.options.data);

            this.client.logger.cmd('%s used by %s from %s', command, ctx.author.id, ctx.guild.id);
            if (!interaction.inGuild() || !interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.ViewChannel)) return;

            if (cmd.permissions) {
                if (cmd.permissions.client) {
                    if (!interaction.guild.members.me.permissions.has(cmd.permissions.client)) return await interaction.reply({ content: 'I don\'t have enough permissions to execute this cmd.', ephemeral: true }).catch(() => { });
                }

                if (cmd.permissions.user) {
                    if (!interaction.member.permissions.has(cmd.permissions.user)) return await interaction.reply({ content: 'You don\'t have enough permissions to execute this cmd.', ephemeral: true }).catch(() => { });
                }
               
            }

            


            try {

                return await cmd.run(ctx, ctx.args);

            } catch (error) {
                console.error(error);
                await interaction.reply({
                    ephemeral: true,
                    content: 'An unexpected error occured, the developers have been notified.',
                }).catch(() => { });
            }
        }


    }
};
