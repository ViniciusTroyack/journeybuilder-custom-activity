// Importa o serviço Zendesk necessário para criar tickets
const zendeskService = require('../services/zendeskService');

/**
 * Junta os campos de comentário e extras em um objeto JSON.
 *
 * @param {Object} jsonData - Os dados JSON recebidos.
 * @returns {Object} - Objeto JSON processado.
 */
function joinCommentAndExtraFields(jsonData) {
    try {
        const data = jsonData;

        // Verifica se há campos extras a serem adicionados ao comentário
        if (Object.keys(data.camposExtras).length > 0) {
            for (const prop in data.camposExtras) {
                data.comentario += `\n${prop}: ${data.camposExtras[prop]}`;
            }

            // Remove a propriedade "camposExtras" do objeto
            delete data.camposExtras;

            return data;
        }

        return data;
    } catch (error) {
        console.error('Erro ao processar o JSON:', error.message);
        return null;
    }
}

/**
 * Cria um ticket no Zendesk com base nos dados fornecidos.
 *
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
function createZendeskTicket(req, res) {
    // Loga o JSON recebido
    console.log(JSON.stringify(req.body.inArguments[0]));

    // Processa os dados e junta comentários e campos extras
    const data = joinCommentAndExtraFields(req.body.inArguments[0]);

    // Configura os dados do ticket Zendesk
    const ticketData = {
        ticket: {
            comment: {
                body: data.comentario || 'Sem Comentários'
            },
            priority: data.prioridade || 'low',
            subject: data.assunto || 'Default ticket subject',
            requester: {
                name: data.nome || data.contactDefaultEmail.email[0],
                email: data.contactDefaultEmail.email[0]
            },
            status: data.status,
            tags: ['Marketing-Cloud-Journey']
        }
    };

    // Loga os dados do ticket
    console.log(ticketData);

    // Chama o serviço Zendesk para criar o ticket
    zendeskService.createTicket(ticketData)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json({ error: error.message });
        });
}

// Exporta a função de criação de ticket Zendesk
module.exports = {
    createZendeskTicket
};
