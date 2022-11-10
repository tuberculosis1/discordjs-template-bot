const Event = require('@structures/Event');

module.exports = class Ready extends Event {
    constructor(...args) {
        super(...args);
    }
    async run() {

        this.client.logger.ready('Logged in as ', this.client.user.tag);

        this.client.user.setPresence({
            activities: [
                {
                    name: 'discord | /ping',
                    type: 5,
                },
            ],
            status: 'online',
        });

    }
};
