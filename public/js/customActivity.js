"use strict";
const Postmonger = require('./libs/postmonger')
var connection = new Postmonger.Session();


function carregarCheckboxesDaDataExtension() {

  const camposDataExtension = [
    { name: 'Campo1', label: 'Campo 1' },
    { name: 'Campo2', label: 'Campo 2' },
    { name: 'Campo3', label: 'Campo 3' }
  ];

  const checkboxesFieldset = $('#checkboxes');


  camposDataExtension.forEach((campo) => {
    checkboxesFieldset.append(`
      <input type="checkbox" id="${campo.name}" value="${campo.name}">
      <label for="${campo.name}">${campo.label}</label><br>
    `);
  });
}


$(document).ready(() => {
  carregarCheckboxesDaDataExtension();
});

connection.on('done', function () {

  const assunto = $('#assunto').val();
  const comentario = $('#comentario').val();
  const abriuEmail = $('#abriuEmail').val();
  const respondeuSMS = $('#respondeuSMS').val();
  const prioridade = $('prioridade').val()
  // Array para armazenar os campos da Data Extension selecionados
  const camposSelecionados = [];
  // Percorrer todos os checkboxes e verificar se estão selecionados
  $('[type="checkbox"]').each(function () {
    if ($(this).is(':checked')) {
      camposSelecionados.push($(this).val());
    }
  });

  const payload = {
    assunto: assunto,
    prioridade: prioridade,
    comentartios: {
      comentario: comentario,
      abriuEmail: abriuEmail,
      respondeuSMS: respondeuSMS,
      camposSelecionados: camposSelecionados
    },
  }

  connection.trigger('updateActivity', payload);
});