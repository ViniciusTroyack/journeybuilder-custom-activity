
const zendeskService = require('../services/zendeskService')

function joinCommentAndExtraFields(jsonData) {
    try {
        //const data = JSON.parse(jsonData);
        const data = jsonData;
        if (Object.keys(data.camposExtras).length > 0) {
            for (const prop in data.camposExtras) {
                data.comentario += `\n${prop}: ${data.camposExtras[prop]}`;
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
    console.log(data.contactDefaultEmail.email[0])
    const ticketData = {
        ticket: {
            comment: {
                body: data.comentario || 'Sem Comentários'
            },
            priority: data.prioridade || 'low',
            subject: data.assunto || 'Default ticket subject',
            requester: {
                name: data.assunto || data.contactDefaultEmail.email[0],
                email: data.contactDefaultEmail.email[0]
            },
            status: data.status,
            tags: ['Marketing-Cloud-Journey']
        }
    };

    console.log(ticketData)
    
    zendeskService.createTicket(ticketData)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json({ error: error.message });
        });
}

module.exports = {
    createZendeskTicket
};
