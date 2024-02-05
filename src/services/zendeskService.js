// Importa a biblioteca Axios para fazer requisições HTTP
const axios = require('axios');

// Configura as variáveis de ambiente do projeto
require('dotenv').config();

/**
 * Cria um ticket no Zendesk usando a API Zendesk v2.
 *
 * @param {Object} ticketData - Objeto contendo dados para criar o ticket.
 * @returns {Promise} - Promise representando a solicitação HTTP para criar o ticket.
 */
function createTicket(ticketData) {
    // Converte os dados do ticket para uma string JSON
    const data = JSON.stringify(ticketData);

    // Configuração para a requisição HTTP POST para criar o ticket no Zendesk
    const config = {
        method: 'POST',
        url: 'https://circulotestes.zendesk.com/api/v2/tickets',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.ZENDESK_AUTH}`, // Usa a chave de autenticação do ambiente
        },
        data: data,
    };

    // Faz a requisição HTTP usando Axios e retorna a Promise resultante
    return axios(config);
}

// Exporta a função de criação de ticket Zendesk para uso em outros módulos
module.exports = {
    createTicket
};
