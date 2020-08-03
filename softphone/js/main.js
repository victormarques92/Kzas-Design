// ==============================================
//                                      Preloader
// ==============================================
$(document)
  .ajaxStart(function () {
    $('body').css('overflow', 'auto')
    $('body').append('<div class="preloader"><i class="fas fa-spinner fa-spin"></i></div>');
  })
  .ajaxStop(function () {
    $('.body').removeClass('.preloader');
    $('body').removeClass('preloader-site');
    $('body').css('overflow', 'auto');
  });

$('body').addClass('animated fadeIn');


// ==============================================
//                                   Start Select
// ==============================================
$(document).ready(function () {
  $('select').niceSelect();
});


// ==============================================
//                               Add Participante
// ==============================================
$(document).ready(function () {
  var button = $('[data-id="btn-add-participante"]');
  var tipoParticipante = $('[data-id="select-tipo-participante"]');
  var nomeParticipante = $('[data-id="select-nome-participante"]');

  button.removeAttr('href');

  tipoParticipante.change(function () {
    checkSelects()
  });

  nomeParticipante.change(function () {
    checkSelects()
  });

  button.click(function () {
    addParticipante()
  });

  $('body').keyup(function () {
    if ($('#nome-nao-cadastrado').val() !== '' && $('#telefone-nao-cadastrado').val().length >= 15) {
      button.removeClass('opacity-06');
    } else {
      button.addClass('opacity-06');
    }

  });


  function checkSelects() {
    if (tipoParticipante.val() == 'Participante não cadastrado') {
      $('.box-tipo').removeClass('col-12 col-lg-6').removeClass('lg__pad-right-8').addClass('col-12');

      $('.box-participante').hide();
      $('.box-nao-cadastrado').show();
    } else {
      $('.box-tipo').removeClass('col-12').addClass('lg__pad-right-8').addClass('col-12 col-lg-6');
      $('.box-participante').show();
      $('.box-nao-cadastrado').hide();
    }

    if (tipoParticipante.val() !== 'Selecione' && nomeParticipante.val() !== 'Selecione') {
      button.removeClass('opacity-06');
    } else {
      button.addClass('opacity-06');
    }
  }

  function addParticipante() {
    if (tipoParticipante.val() !== 'Participante não cadastrado') {
      $('.lista-chamada').append('<li class="row valign-middle halign-between chamada"><div><p class="font12 on-bold">' + nomeParticipante.val() + '</p><p class="font12">' + tipoParticipante.val() + '</p></div><a class="font-12 bg-warning-dark br-4 cl-white halign-middle mg-top-16 pad-both-8 pad-sides-8 opacity-06 pointer" href="#">Aguardando</a></li>');
    } else {
      $('.lista-chamada').append('<li class="row valign-middle halign-between chamada"><div><p class="font12 on-bold">' + $('#nome-nao-cadastrado').val() + '</p><p class="font12">Não cadastrado</p></div><a class="font-12 bg-warning-dark br-4 cl-white halign-middle mg-top-16 pad-both-8 pad-sides-8 opacity-06 pointer" href="#">Aguardando</a></li>')
    }

    tipoParticipante.val('');
  }

});
