
const zendeskService = require('../services/zendeskService')

function createZendeskTicket(req, res) {
    const ticketData = {
        ticket: {
            comment: {
                body: req.body.inArguments[0].comentario || 'Default comment body'
            },
            priority: req.body.inArguments[0].prioridade || 'Low',
            subject: req.body.inArguments[0].assunto || 'Default ticket subject'
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
