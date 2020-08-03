/* globals hopscotch: false */

/* ============ */
/* EXAMPLE TOUR */
/* ============ */
var tour = {
    id: 'hello-hopscotch',
    onStart: function() {
        hopscotchBackground();
    },
    onClose: function() {
        hopscotchBackground('remove');
    },
    onEnd: function () {
        hopscotchBackground('remove');
    },
    i18n: {
        nextBtn: "Próximo",
        prevBtn: "Anterior",
        doneBtn: "Pronto",
        skipBtn: "Sair",
        closeTooltip: "Fechar",
        stepNums : ["1 de 5", "2 de 5", "3 de 5", "4 de 5", "5 de 5"]
    },
    steps: [
        {
            title: "Gostou do imóvel?",
            content: "Basta salvar em sua lista que iremos te ajudar a avaliar a possibilidade de compra.",
            target: document.querySelector("#saveCard"),
            placement: "top",
            xOffset: 'center',
            arrowOffset: 'center'
        },
        {
            title: "Não gostou do imóvel?",
            content: "Sem problema, é só eliminar  que, automaticamente a Kimi busca e retira todos os imóveis similares do Match.",
            target: document.querySelector("#removeCard"),
            placement: "top",
            xOffset: 'center',
            arrowOffset: 'center'
        },
        {
            title: "Match System",
            content: "Quanto maior número do Match, mais compatível com você e com seu bolso. :D",
            target: document.querySelector(".match-score .icon"),
            placement: "bottom",
            xOffset: 'center',
            arrowOffset: 'center'
        },
        {
            title: "Está difícil decidir?",
            content: "Quanto maior número do Match, mais compatível com você e com seu bolso. :D",
            target: document.querySelector(".content-foot .button"),
            placement: "top",
            xOffset: 'center',
            arrowOffset: 'center'
        },
        {
            title: "Apresentamos sua lista",
            content: "Todos os imóveis que você salvar ficarão acessíveis para você aqui na sua lista.",
            target: document.querySelector("#button-saveList"),
            placement: "bottom",
            xOffset: 'center',
            arrowOffset: 'center'
        }
    ],
    showPrevButton: true,
    scrollTopMargin: 100
},

/* ========== */
/* TOUR SETUP */
/* ========== */
    
    
    
addClickListener = function(el, fn) {
    if (el.addEventListener) {
        el.addEventListener('click', fn, false);
    }
    else {
        el.attachEvent('onclick', fn);
    }
},

init = function() {
    var startBtnId = 'button-startTour',
        calloutId = 'startTourCallout',
        mgr = hopscotch.getCalloutManager(),
        state = hopscotch.getState();
    
    addClickListener(document.getElementById(startBtnId), function() {
        
        setTimeout(function() {
            hopscotch.startTour(tour);
        }, 750);

    });

};



init();
