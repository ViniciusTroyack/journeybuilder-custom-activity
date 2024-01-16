"use strict";

var connection = new Postmonger.Session();

var payload = {};
var defaultEmail = null
var eventDefinitionKey = null;
var whatsappAccount = null;

$(window).ready(onRender);

connection.on("initActivity", initialize);
connection.on("requestedInteraction", requestedInteractionHandler);
connection.on("clickedNext", save);
connection.on('requestedInteractionDefaults', function(data) {
  defaultEmail = data
});


function onRender() {
  connection.trigger("ready");
  connection.trigger("requestTokens");
  connection.trigger("requestEndpoints");
  connection.trigger("requestInteraction");
  connection.trigger('requestInteractionDefaults')
  connection.trigger('requestSchema');
}

// function requestEmail(contact){
//   defaultEmail = contact
// }

function initialize(data) {
  if (data) {
    payload = data;
  }
  const hasInArguments = Boolean(
    payload["arguments"] &&
    payload["arguments"].execute &&
    payload["arguments"].execute.inArguments &&
    payload["arguments"].execute.inArguments.length > 0
  );

  if (!hasInArguments) return;

  const args = payload.arguments.execute.inArguments[0];

  document.querySelector("#assunto").value = args.assunto;
  document.querySelector("#comentario").value = args.comentario;
  document.querySelector("#prioridade").value = args.prioridade;
}

function requestedInteractionHandler(settings) {
  try {
    eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
  } catch (err) {
    console.log(err);
  }
}

function save() {
  const props = getConfigActivityVars();
  const camposExtras = props.camposExtras.reduce((acc, chave) => {
    acc[chave] = `{{Event.${eventDefinitionKey}."${chave}"}}`;
    return acc;
  }, {});
  payload["arguments"].execute.inArguments = [
    {
      contactIdentifier: "{{Contact.Key}}",
      contactDefaultEmail: defaultEmail.email[0],
      assunto: props.assunto,
      prioridade: props.prioridade,
      comentario: props.comentario,
      camposExtras: camposExtras,
    },
  ];
  payload["metaData"].isConfigured = true;
  connection.trigger("updateActivity", payload);
}

const getConfigActivityVars = () => {
  var valoresSelecionados = []
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function (checkbox) {
    valoresSelecionados.push(checkbox.getAttribute('name'));
  });
  return {
    assunto: document.querySelector("#assunto").value,
    prioridade: document.querySelector("#prioridade").value,
    comentario: document.querySelector("#comentario").value,
    camposExtras: valoresSelecionados,
  };
};

connection.on('requestedSchema', function (data) {
  var camposDiv = $('#checkboxes')

  data['schema'].forEach(function (item) {
    var novoCampo = $('<input type="checkbox" name="' + item.name + '" id="' + item.name + '" + value="' + item.name + '">');
    var labelCampo = $('<label for="' + item.name + '">' + item.name + '</label><br>');
    camposDiv.append(novoCampo);
    camposDiv.append(labelCampo);
  });
});