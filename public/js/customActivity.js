// app.js

// Função para carregar checkboxes dinâmicos para cada campo da Data Extension
function carregarCheckboxesDaDataExtension() {
  // Simulação de dados estáticos para os campos da Data Extension
  const camposDataExtension = [
    { name: 'Campo1', label: 'Campo 1' },
    { name: 'Campo2', label: 'Campo 2' },
    { name: 'Campo3', label: 'Campo 3' }
    // Simule ou obtenha dinamicamente os campos da Data Extension aqui
  ];

  // Selecionar o elemento do fieldset para os checkboxes
  const checkboxesFieldset = $('#checkboxes');

  // Preencher o fieldset com os checkboxes para cada campo da Data Extension
  camposDataExtension.forEach((campo) => {
    checkboxesFieldset.append(`
      <input type="checkbox" id="${campo.name}" value="${campo.name}">
      <label for="${campo.name}">${campo.label}</label><br>
    `);
  });
}

// Evento de carregamento da página
$(document).ready(() => {
  // Chamar a função para carregar checkboxes dos campos da Data Extension
  carregarCheckboxesDaDataExtension();
});

// Evento de clique no botão "Enviar Dados"
$('#enviarDados').on('click', () => {

  const assunto = $('#assunto').val();
  const comentario = $('#comentario').val();
  const abriuEmail = $('#abriuEmail').val();
  const respondeuSMS = $('#respondeuSMS').val();

  // Array para armazenar os campos da Data Extension selecionados
  const camposSelecionados = [];
  // Percorrer todos os checkboxes e verificar se estão selecionados
  $('[type="checkbox"]').each(function () {
    if ($(this).is(':checked')) {
      camposSelecionados.push($(this).val());
    }
  });

  // Exibir no console os valores selecionados para teste
  console.log('Assunto:', assunto);
  console.log('Comentário:', comentario);
  console.log('Campos da Data Extension selecionados:', camposSelecionados);
  console.log('Abriu o e-mail:', abriuEmail);
  console.log('Respondeu o SMS:', respondeuSMS);

  // Aqui você pode enviar os dados para a Salesforce Marketing Cloud
  // utilizando o SDK ou API fornecidos pela plataforma
});