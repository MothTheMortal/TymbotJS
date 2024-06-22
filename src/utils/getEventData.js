require('dotenv').config();
const axios = require('axios');

module.exports = async function (objData, client, guildId) {
    for (let date of objData.date) {
        const guild = await client.guilds.fetch(guildId)

        const TOKEN = process.env.BOT_TOKEN;

        axios.get(`https://discord.com/api/v10/guilds/${guildId.toString()}/scheduled-events`, {
            headers: {
                'Authorization': `Bot ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const result = []
                for (let event of response.data) {
                    const eventStartDate = event.scheduled_start_time.slice(0, 10)
                    if (date === eventStartDate) {
                        result.push(event)
                    }
                }
                return result

            })
            .catch(error => {
                console.error(error);
            });
    }

}