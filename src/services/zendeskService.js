const axios = require('axios');
require('dotenv').config();

function createTicket(ticketData) {
    const data = JSON.stringify(ticketData);
    const config = {
        method: 'POST',
        url: 'https://vinicervejas.zendesk.com/api/v2/tickets',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.ZENDESK_AUTH}`,
        },
        data: data,
    };

    return axios(config);
}

module.exports = {
    createTicket
};