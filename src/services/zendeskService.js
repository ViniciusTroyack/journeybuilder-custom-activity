import axios from 'axios';
require('dotenv').config();

function createTicket(ticketData) {
    const data = JSON.stringify(ticketData);
    const config = {
        method: 'POST',
        url: 'https://example.zendesk.com/api/v2/tickets',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.ZENDESK_AUTH}`,
        },
        data: data,
    };

    return axios(config);
}

export default {
    createTicket
};
