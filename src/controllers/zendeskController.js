
const zendeskService = require('../services/zendeskService')

function joinCommentAndExtraFields(jsonData) {
    try {
        //const data = JSON.parse(jsonData);
        const data = jsonData;
        if (Object.keys(data.camposExtras).length > 0) {
            for (const prop in data.camposExtras) {
                data.comentario += ` ${prop}: ${data.camposExtras[prop]}`;
            }  
            delete data.camposExtras;

            return data;
        }

        return data;
    } catch (error) {
        console.error('Erro ao processar o JSON:', error.message);
        return null;
    }
}  

function createZendeskTicket(req, res) {
    console.log(JSON.stringify(req.body.inArguments[0]))
    const data = joinCommentAndExtraFields(req.body.inArguments[0])
    const ticketData = {
        ticket: {
            comment: {
                body: data.comentario || 'Sem Comentários'
            },
            priority: data.prioridade || 'low',
            subject: data.assunto || 'Default ticket subject',
            requester: {
                name: data.nome || data.contactIdentifier,
                email: data.contactDefaultEmail
            },
            status: 'closed',
            tags: ['Marketing Cloud Journey']
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
