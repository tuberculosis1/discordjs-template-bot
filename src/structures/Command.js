/**
 * @typedef {Object} CommandOptions Class Properties
 * @property {string} name Name for the command
 * @property {?import('discord.js').ApplicationCommandOption} options Slash Command options
 * @property {?string} category The category the command belongs to
 */

 module.exports = class Command {
    /**
     *
     * @param {import('@structures/Client')} client
     * @param {CommandOptions} options
     */
    constructor(client, options) {
        /**
         * @type {import('@structures/Client')} Extended Client
         */
        this.client = client;
        this.name = options.name;
        this.description = options.description ? (options.description || 'No description provided') : 'No description provided',
        this.permissions = {
            client: options.permissions ? (options.permissions.client || []) : ['SendMessages', 'ViewChannel', 'EmbedLinks'],
            user: options.permissions ? (options.permissions.user || []) : [],
        };
        this.options = options.options || [];
        this.category = options.category || 'general';
    }
};
