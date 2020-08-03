// ==============================================
//                                      FUNCTIONS
// ==============================================
function addMSG() {
  var newMSG = $('#nova-mensagem');
  var now = new Date;

  var texto = newMSG.text();
  var hora = now.getHours();
  var minutos = now.getMinutes();

  if (texto !== 'Escreva sua mensagem...') {

    $('ul.messages').append('<li class="item"><div class="item-head"><p><strong>Você</strong></p><p class="data-hora">' + hora + ':' + minutos + '</p></div><div class="item-body"><p>' + texto + '</p></div></li>')

  }
  newMSG.text('Escreva sua mensagem...').focus();
}

function activeButtonNewVisit() {
  if ($('.input-visit').val() !== '' && $('.control .select select').val() !== null) {
    $('#btn-finish-visit').removeClass('disabled');
  } else {
    $('#btn-finish-visit').addClass('disabled');
  }
}



$(document).ready(function () {
  var newMSG = $('#nova-mensagem');
  var btnSendMSG = $('[data-id="send-message"]');

  // ==============================================
  //                              ENVIO DE MENSAGEM
  // ==============================================
  btnSendMSG.click(function (e) {
    e.preventDefault();

    addMSG();
  })

  newMSG.on('keypress', function (e) {
    if (e.which == 13) {
      e.preventDefault();
      addMSG();
    }
  });


  // ==============================================
  //                                  REMOVER NOVAS
  // ==============================================
  newMSG.focus(function () {
    var dividerNews = $('ul.messages .item .news');

    dividerNews.parent().hide();

    if (newMSG.text() == 'Escreva sua mensagem...') {
      newMSG.text('')
    }
  });


  // ==============================================
  //                                     OPEN MODAL
  // ==============================================
  $('[open-is-modal]').click(function () {
    var isModal = $(this).attr('open-is-modal');

    $('.modal').attr('is-modal', isModal);
  });


  // ==============================================
  //                                 AGENDAR VISITA
  // ==============================================
  console.log($('.control .select select').val());

  $('.input-visit').change(function() {
    activeButtonNewVisit();
  });

  $('.control .select select').change(function () {
    activeButtonNewVisit();
  });
});
