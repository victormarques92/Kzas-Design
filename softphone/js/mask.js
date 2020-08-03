$(function () {
  var arrMasks = [{
      value: 'date',
      format: '00/00/0000'
    },
    {
      value: 'time',
      format: '00:00:00'
    },
    {
      value: 'date_time',
      format: '00/00/0000 00:00:00'
    },
    {
      value: 'cep',
      format: '00000-000'
    },
    {
      value: 'phone',
      format: '0000-0000'
    },
    {
      value: 'phone_with_ddd',
      format: '(00) 0000-0000'
    },
    {
      value: 'cellphone',
      format: '00000-0000'
    },
    {
      value: 'cellphone_with_ddd',
      format: '(00) 00000-0000'
    },
    {
      value: 'cpf',
      format: '000.000.000-00',
      settings: {
        reverse: true
      }
    },
    {
      value: 'cnpj',
      format: '00.000.000/0000-00',
      settings: {
        reverse: true
      }
    },
    {
      value: 'money',
      format: '000.000.000.000.000,00',
      settings: {
        reverse: true
      }
    },
    {
      value: 'money2',
      format: '#.##0,00',
      settings: {
        reverse: true
      }
    },
    {
      value: 'validation_code',
      format: '000000',
      settings: {
        reverse: true
      }
    }
  ]

  arrMasks.forEach(function (mask) {
    if (mask.settings)
      $('.' + mask.value).mask(mask.format, mask.settings);
    else
      $('.' + mask.value).mask(mask.format);
  })
});
