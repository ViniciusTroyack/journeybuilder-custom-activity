"use strict";

// Cria uma instância da sessão Postmonger para interagir com o SDK Salesforce Marketing Cloud
var connection = new Postmonger.Session();

// Objeto que armazena os dados do payload, do email padrão, e da chave do evento de interação
var payload = {};
var defaultEmail = null;
var eventDefinitionKey = null;

// Função chamada quando a janela está pronta para renderizar
$(window).ready(onRender);

// Registra manipuladores de eventos para a sessão Postmonger
connection.on("initActivity", initialize);
connection.on("requestedInteraction", requestedInteractionHandler);
connection.on("clickedNext", save);
connection.on('requestedInteractionDefaults', function(data) {
  defaultEmail = data;
});

// Função chamada quando a janela está pronta para renderizar
function onRender() {
  connection.trigger("ready");
  connection.trigger("requestTokens");
  connection.trigger("requestEndpoints");
  connection.trigger("requestInteraction");
  connection.trigger('requestInteractionDefaults');
  connection.trigger('requestSchema');
}

// Inicializa a atividade com os dados fornecidos
function initialize(data) {
  if (data) {
    payload = data;
  }
  
  // Verifica se há argumentos de entrada
  const hasInArguments = Boolean(
    payload["arguments"] &&
    payload["arguments"].execute &&
    payload["arguments"].execute.inArguments &&
    payload["arguments"].execute.inArguments.length > 0
  );

  // Se não houver argumentos de entrada, não faz nada
  if (!hasInArguments) return;

  // Preenche os campos da interface com os valores dos argumentos
  const args = payload.arguments.execute.inArguments[0];
  document.querySelector("#assunto").value = args.assunto;
  document.querySelector("#comentario").value = args.comentario;
  document.querySelector("#prioridade").value = args.prioridade;
}

// Manipulador de evento para processar os dados da interação solicitada
function requestedInteractionHandler(settings) {
  try {
    eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
  } catch (err) {
    console.log(err);
  }
}

// Função chamada ao clicar em "Next" na configuração da atividade
function save() {
  // Obtém as propriedades da atividade configuradas pelo usuário
  const props = getConfigActivityVars();
  
  // Cria um objeto com os campos extras a serem incluídos nos argumentos de entrada
  const camposExtras = props.camposExtras.reduce((acc, chave) => {
    acc[chave] = `{{Event.${eventDefinitionKey}."${chave}"}}`;
    return acc;
  }, {});

  // Atualiza os argumentos de entrada com os dados configurados
  payload["arguments"].execute.inArguments = [
    {
      contactIdentifier: "{{Contact.Key}}",
      contactDefaultEmail: defaultEmail,
      assunto: props.assunto,
      prioridade: props.prioridade,
      comentario: props.comentario,
      status: props.status,
      camposExtras: camposExtras,
    },
  ];

  // Marca a atividade como configurada
  payload["metaData"].isConfigured = true;

  // Dispara o evento para atualizar a atividade com os novos dados
  connection.trigger("updateActivity", payload);
}

// Função auxiliar para obter as variáveis de configuração da atividade
const getConfigActivityVars = () => {
  // Obtém os valores selecionados para os campos extras
  var valoresSelecionados = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function (checkbox) {
    valoresSelecionados.push(checkbox.getAttribute('name'));
  });

  // Retorna um objeto com as variáveis de configuração
  return {
    assunto: document.querySelector("#assunto").value,
    prioridade: document.querySelector("#prioridade").value,
    comentario: document.querySelector("#comentario").value,
    status: document.querySelector("#status").value,
    camposExtras: valoresSelecionados,
  };
};

// Manipulador de evento para processar o esquema da interação solicitado
connection.on('requestedSchema', function (data) {
  var camposDiv = $('#checkboxes');

  // Itera sobre os campos do esquema e cria caixas de seleção correspondentes
  data['schema'].forEach(function (item) {
    var novoCampo = $('<input type="checkbox" name="' + item.name + '" id="' + item.name + '" + value="' + item.name + '">');
    var labelCampo = $('<label for="' + item.name + '">' + item.name + '</label><br>');
    camposDiv.append(novoCampo);
    camposDiv.append(labelCampo);
  });
});
