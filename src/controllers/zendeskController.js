
const zendeskService = require('../services/zendeskService')

function createZendeskTicket(req, res) {
    const ticketData = {
        ticket: {
            comment: {
                body: req.body.body || 'Default comment body'
            },
            priority: req.body.priority || 'normal',
            subject: req.body.subject || 'Default ticket subject'
        }
    };

    zendeskService.createTicket(ticketData)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.status(500).json({ error: error.message });
        });
}

module.exports = {
    createZendeskTicket
};
