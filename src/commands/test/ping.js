const Command = require('@structures/Command');

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Returns the latency of the bot.',
            category: 'in',
            permissions: {
                client: ['SendMessages', 'ViewChannels', 'EmbedLinks'],
                user: [],
            },
            
        });
    }
    async run(ctx, args) {
        const msg = await ctx.sendDeferMessage('Pinging...');

        return await ctx.editMessage(`Latency: \`${msg.createdTimestamp - ctx.createdTimestamp}ms.\` \nAPI Latency: \`${Math.round(ctx.client.ws.ping)}ms.\``);
    }
};
