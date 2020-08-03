$(document).ready(function () {
  // Permitir Camera
  $('[data-id="permitir-camera"]').click(function () {
    $('#modal-id-confirmation-tirar-foto .button.disabled').removeClass('disabled');

    $('#modal-id-confirmation-tirar-foto .box-text').hide();
    $('#modal-id-confirmation-tirar-foto .box-image').show();
  });

});
