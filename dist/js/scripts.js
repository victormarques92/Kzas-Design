/*
FUNCTIONS
*/

var signupVerify = function(a) {
    if ($body.hasClass('page-signup') && !$body.hasClass('signup-'+a+'') ) {
        
    } else {
        return false;
    }
}

// SCROLL CHECK
var scrollCheck = function(a) {
    var body = $('body');
    var scroll = $(window).scrollTop();
    var viewport = $(window).height();
    var height =$(document).height();
    var limit = parseInt(a);

    if (scroll >= limit) {
        body.addClass('scrolled')
    } else if (scroll < limit) {
        body.removeClass('scrolled');
    }

    if(scroll + viewport == height) {
        body.addClass('at-bottom')
    } else {
        body.removeClass('at-bottom');
    }
}

// ACCORDIONS
var accordions = function(a)  {
    
    // SETUP
    var title = $(".accordions .accordion-header");
    var more = $(".accordions .buttons .button");
    
    title.click(function(){
        var $this = $(this);
        var titleText = $this.text();
        
        var el = $this.closest('.accordion');
        var sib = el.siblings('.accordion');
        
        el.toggleClass('is-active');
        sib.removeClass('is-active');
        
        ga('send', 'event', 'acoes', 'faq', titleText);
        
        return false;
    });
    
    more.click(function(){
        var $this = $(this);
        var icon = $this.find('.icon').find('i');
        var more = $this.closest('.buttons').siblings('.accordion[data-hided]');
        
        icon.toggleClass('fa-plus fa-minus');
        more.each(function(){
            $(this).slideToggle('fast');
        })
        return false;
    });
}

// FORM MASKS
var formMasks = function() {
    var $el = $('input[data-mask]');
    $el.each(function(){
        $this = $(this);
        var mask = $this.attr('data-mask');
        $this.mask(mask);
    });
}

// FORM MASKS
var formMasksMoney = function() {
    var $el = $('input[data-maskMoney]');
    $el.each(function(){
        $this = $(this);
        var currency = $this.attr('data-maskMoney')+' ';
        $this.maskMoney({prefix:currency, allowNegative: true, thousands:'.', decimal:',', affixesStay: true})
    });
}

// FORM VALIDATION
var formValidation = function() {
    
    var $form = $('form[data-validation]');
    
    $form.each(function(){
        var $this = $(this);
        var $button = $this.find('.button[role="submit"]');
        
        if ($this.is(':valid')) {
            $button.prop('disabled', false);
        } else {
            $button.prop('disabled', true);
        }
    });
    
}

// BUTTON FEEDBACK
var buttonFeedback = function(a,b) {
    var $el = $(a);
    var status = b;

    if(b == 'start') {
        // ENVIANDO
        $el.attr('disabled', true);
        $el.addClass('is-loading');
    } else if (b == 'done') {
        // ENVIADO
        $el.attr('disabled', false);
        $el.removeClass('is-loading');
    }
}

// FEEDBACK MESSAGE
var feedbackMessage = function(a,b,c) {
    var name = a;
    var type = b;
    var action = c;
    
    var $el = $('[data-feedback="'+name+'"].is-'+type);
    var $elx = $('[data-feedback="'+name+'"]');
    
    var $form = $el.closest('form[data-validation]');
    var $button = $form.find('.button[role="close"]');
    
    $el.addClass('is-active');
    
    // FEEDBACK CLOSE
    $button.click(function(){
        $elx.removeClass('is-active');
        return false;
    });
}

// MODAL OPEN
var modalOpen = function() {
    
    $('[data-modal]').click(function(){
        var $body = $('body');
        var $this = $(this);
        var modal_id = $this.attr('data-modal');
        $('#'+modal_id).addClass('is-active');
        $body.addClass('modal-open');
        return false;
    });
    
}

// MODAL CLOSE
var modalClose = function(a) {
    
    if(a=='byclick') {
        var $body = $('body');
        $('.modal').removeClass('is-active');
        $body.removeClass('modal-open');
        return false;
    }
    
    $('.modal [aria-label="close"]').click(function(){
        var $body = $('body');
        var $this = $(this);
        var $modal = $this.closest('.modal');
        $modal.removeClass('is-active');
        $body.removeClass('modal-open');
        return false;
    });
    $('.modal .modal-background').click(function(){
        var $body = $('body');
        $('.modal').removeClass('is-active');
        $body.removeClass('modal-open');
        return false;
    });
    $(document).on('keyup',function(evt) {
        if (evt.keyCode == 27) {
            var $body = $('body');
            $('.modal').removeClass('is-active');
            $body.removeClass('modal-open');
        }
    });
    
}

// TOPBAR CLOSE
var topbarClose = function() {
    $(function() {
        $('.topbar .button[role="close"]').click(function(){
            var $this = $(this);
            $this.closest('.topbar').remove();
            return false;
        });
    });
}

// CODE COUNTDOWN
var counter = 60;
var codeCountdown = setInterval(function() {
    counter--;
    // Display 'counter' wherever you want to display it.
    if (counter <= 0) {
        clearInterval(codeCountdown);
      	$('#codeForwarder #counter').closest('button').attr('disabled', false);
        $('#codeForwarder #timer').remove();
        return;
    } else {
    	$('#counter').text(counter);
    }
}, 1000);

/*
end FUNCTIONS
*/

/*
DROPDOWN
*/

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // Dropdowns

    var $dropdowns = getAll('.dropdown:not(.is-hoverable)');

    if ($dropdowns.length > 0) {
        $dropdowns.forEach(function ($el) {
            $el.addEventListener('click', function (event) {
                event.stopPropagation();
                $el.classList.toggle('is-active');
            });
        });

        document.addEventListener('click', function (event) {
            closeDropdowns();
        });
    }

    function closeDropdowns() {
        $dropdowns.forEach(function ($el) {
            $el.classList.remove('is-active');
        });
    }

    // Close dropdowns if ESC pressed
    document.addEventListener('keydown', function (event) {
        var e = event || window.event;
        if (e.keyCode === 27) {
            closeDropdowns();
        }
    });

    // Functions

    function getAll(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    }
    
});

/*
end DROPDOWN
*/

/*
AUTOCOMPLETE
*/

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        
        if (!val) { return false;}
        
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                closeAllLists();
                });
                a.appendChild(b);
            }
        }
        
    });
    
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*
end AUTOCOMPLETE
*/

/*
TAGSUGGEST
*/

// TAG CREATE
function tagCreate (text, target, tagType) {
    tag = document.createElement("SPAN");
    tag.setAttribute("class", "tag "+tagType);
    
    tag.innerHTML = '<span class="text">'+text+'</span>';
    tag.innerHTML += '<button type="button" class="delete is-small"></button>';
    tag.innerHTML += '<input type="hidden" value="'+text+'">';    
    
    target.appendChild(tag);
}

// TAG DELETE
var tagDelete = function () {
    
    var delName = '.tag .delete';
    
    $('body').on('click', delName, function () {
        $(this).closest('.tag').remove();
        return false;        
    });
    
};


function tagsuggest(inp, arr, tar, tag) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    
    // TAGBAG
    var bag = tar;
    
    // TAGINPUT
    
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        
        if (!val) { return false; }
        
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    
                    var tagText = this.getElementsByTagName("input")[0].value;
                    tagCreate(tagText, tar, tag);                    
                    inp.value = '';
                    
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        
    });
    
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

/*
end TAGSUGGEST
*/

/*
STEPS
*/

// STEPS
var steps = function() {
    
    var $body = $('body');
    
    if ($body.hasClass('page-signup') && !$body.hasClass('signup-00') ) {
        
    } else {
        return false;
    }
    
    var $section = $('.section-steps');
    var $steps = $('.steps');
    var $active = $('.steps').find('.is-active');
    var $disabled = $('.steps').find('.is-disabled');
    
    var sectionWidth = $section.width();
    var stepWidth = $steps.width();
    var activePos = $active.position().left;
    
    //console.log('sectionWidth: '+sectionWidth+' / stepWidth: '+stepWidth+' / activePos: '+activePos);
    
    if ( sectionWidth < stepWidth && sectionWidth < activePos*2) {
        $section.scrollLeft(activePos-(sectionWidth/2)+30);
    }
    
    $disabled.click(function(){
        return false;
    });
    
    $active.click(function(){
        return false;
    });
    
}

/*
end STEPS
*/

/*
DATA DELETE
*/

var dataDelete = function() {
    
    var dataElm = '[data-delete]';
    var dataBtn = '[data-delete-button]';
    var $del = $(dataBtn);
    
    $('body').on('click', dataBtn, function () {
        $(this).closest(dataElm).remove();
        return false;
    });
}


/*
end DATA DELETE
*/

/*
DATA CLONE
*/

var dataClone = function(a,op1,op2){
    
    if(!op1) {
        var op1 = false;
    }
    
    if(!op2) {
        var op2 = false;
    }
    
    var $add = $('[data-clone="'+a+'"][data-clone-button]');
    var $tem = $('[data-clone="'+a+'"][data-clone-template]');
    //var $tar = $('[data-clone="'+a+'"][data-clone-target]');
    
    var i = 0;
    
    $add.click(function(){
        i = i+1;
        
        var $clon = $tem.clone();
        $clon.removeAttr('data-clone');
        $clon.removeAttr('data-clone-template');
        $clon.removeAttr('hidden');
        $clon.attr('aria-hidden', 'false');
        
        $clon.insertBefore($tem);
        
        if(op1==false) {
            return false;
        } else if(op1=='autocomplete') {
            var vId = 'temp-'+a+'-'+i;        
            $clon.find('input').attr('id',vId);
            autocomplete(document.getElementById(vId), op2);
        }
        
        return false;
        
    });

}

/*
end DATA CLONE
*/

/*
FORM DATA ROWS
*/

// DATA ROWS
var dataRows = function() {
    
    $('input[data-row]').each(function(){
        var $this = $(this);
        var rowName = $this.attr('data-row');
        var $target = $('[data-row="'+rowName+'"]:not(input)');
        if($(this).is(':checked')) {
            $target.show();
            $target.find('input').attr('required', true);
        } else {
            $target.hide();
            $target.find('input').attr('required', false);
        }
    });
    
    $('input[data-row]').change(function(){
        var $this = $(this);
        var rowName = $this.attr('data-row');
        var $target = $('[data-row="'+rowName+'"]:not(input)');
        if($(this).is(':checked')) {
            $target.show();
            $target.find('input').attr('required', true);
        } else {
            $target.hide();
            $target.find('input').attr('required', false);
        }
    });
        
}

/*
end FORM DATA ROWS
*/

/*
FORM SIGNUP03
*/

var signup03 = function() {
    
    var $body = $('body');
    
    if ($body.hasClass('page-signup') && $body.hasClass('signup-03') ) {
        
    } else {
        return false;
    }
    
    // DATA CLONE
    dataClone('localNao','autocomplete',locations);
    dataClone('localSim','autocomplete',locations);
    
    // DATA DELETE
    dataDelete();
    
    // TAG DELETE
    tagDelete();
}

/*
end FORM SIGNUP03
*/


/*
MATCH LOADING
*/

var matchLoadingStepsTimer, matchLoadingRedirectTimer;

var matchLoadingSteps = function(a,n,t) {
    var steps = a;
    var step = n;
    var delay = t;
    matchLoadingStepsTimer = setTimeout(function() { 
        
        $('.loading-text .text:nth-child('+step+')').fadeTo( 250, 1 );
        
        if (step == steps) { return false; }
        
        $('.loading-text .text:nth-child('+step+')').delay(3500).fadeTo( 250, 0 );
        
    }, delay);    
}

var matchLoading = function() {
    
    var $body = $('body');    
    if ($body.hasClass('page-match') && $body.hasClass('loading') ) {
        
    } else {
        return false;
    }
    
    var items = $('.loading-text .text');
    var steps = items.length;
    for ( var i=0; i < items.length; i++ ) {
        
        var delay = i * 4000;
        var step = i + 1;
        
        matchLoadingSteps(steps,step, delay);
        
    }
    
}

var matchLoadingRedirect = function(link) {
    window.location.href = link;
}

// MATCH LOADED
var matchLoaded = function(n,link,delay) {
    
    clearTimeout(matchLoadingStepsTimer);
    
    $('.section-loading .image').addClass('is-complete');
    
    $('.section-loading .title span:nth-child(1)').text('Encontramos '+n+' imóveis no seu perfil');
    $('.section-loading .title span:nth-child(2)').text('e que cabem no seu bolso');
    
    $('.loading-text').addClass('is-complete');
    $('.loading-text .text:last-child').text('Carregando imóveis ...');
    $('.loading-text .text:not(:last-child)').remove();
    
    matchLoadingRedirectTimer = setTimeout(function() { matchLoadingRedirect(link); }, delay);
}

/*
end MATCH LOADING
*/

/*
MATCH
*/

// BASICS
var matchBasics = function() {
    
    window.$activeCard = $('.match-cards').find('[data-match="active"]');
    window.$firstCard = $('.match-cards .card').first();
    window.$lastCard = $('.match-cards .card').last();
    window.$nextCard = $activeCard.next('.card');
    window.$prevCard = $activeCard.prev('.card');
    window.$saveListButton = $('#button-saveList');
    window.$saveCounter = $('.save-counter');
    
    window.matchList = '.match-cards';
    window.matchNumber = $(matchList+' .card.is-product').length;
    
    // SAVE COUNTER
    matchSaveCounter();
    // REMOVE COUNTER
    matchRemoveCounter();
    
    
    window.removeList = '.match-removes';
    window.removeNumber = $(removeList+' .card.is-product').length;
    
    
}

// COUNTER
var matchCounter = function() {
    // CARDS
    var cards = $('.match-cards .card').length;
    var savedCards = $('.match-saves .card').length;
    
    if(!cards && savedCards) {
        $('section.match').attr('data-counter','has-zero');
    } else if(!cards && !savedCards) {
        $('section.match').attr('data-counter','reset');
    } else if(cards == 1) {
        $('section.match').attr('data-counter','has-one');
        modalImoveis();

        $('body, .modal-imoveis .button').click(function () {
            $('.modal-imoveis').hide();
        });
        console.log('0')
    } else if(cards == 2) {
        $('section.match').attr('data-counter','has-two');
    } else {
        $('section.match').removeAttr('data-counter');
    }
}

// CARD PARENT
var matchCardParent = function(a) {
    var $el = a;
    var parentClass = $el.parent().prop('className');
    return parentClass;
}

// NEXT
var matchNext = function(a) {
    matchBasics();
    var a;
    
    $activeCard.removeAttr('data-match');
    
    // NEXT
    if($nextCard.is('.card')) {
        $nextCard.attr('data-match','active');
    } else {
        $firstCard.attr('data-match','active');
    }
        
}

// PREVIOUS
var matchPrev = function(a) {
    matchBasics();
    
    $activeCard.removeAttr('data-match');
    
    if($prevCard.is('.card')) {
        $prevCard.attr('data-match','active'); 

    } else {
        $lastCard.attr('data-match','active');        
    }

}

// NAV CONFIG
var matchNav = function() {
    
    $('.match-nav').on('click', '#prevCard', function () {
        matchPrev();
        return false;
    });
    
    $('.match-nav').on('click', '#nextCard', function () {
        matchNext();
        return false;
    });
    
}

// MATCH TOAST
var matchToast = function(a) {
    
    var toastMsg = a;
    
    bulmaToast.toast({
        message: toastMsg,
        type: "is-black",
        duration:  1500,
        position: "bottom-left",
        dismissible: true,
        animate: { in: "fadeIn", out: "fadeOut" }
    });
}

// CLICK DISABLE
var matchClickDisable = function(a) {
    var time = a;
    
    $('section.match').css('pointer-events','none');
    matchDisabletDelay = setTimeout(function() {
        $('section.match').css('pointer-events','all');
    }, time);
}

// MATCH SAVE CALC
var matchSaveCalc = function(a) {
    
    if(a == "decrease") {
        // SAVE COUNTER
        $saveCounter.each(function() {
            $(this).text(saveNumber-1);
        });
        return false;
    }
    
    // SAVE COUNTER
    $saveCounter.each(function() {
        $(this).text(saveNumber+1);
    });
}

// SAVE COUNTER
var matchSaveCounter = function() {
    window.saveList = '.match-saves';
    window.saveNumber = $(saveList+' .card.is-product').length;
    
    matchListDisable(saveNumber,saveList);
    
    return saveNumber;
}

// REMOVE COUNTER
var matchRemoveCounter = function() {
    window.removeList = '.match-removes';
    window.removeNumber = $(removeList+' .card.is-product').length;
    
    matchListDisable(removeNumber,removeList);
    
    return saveNumber;
}

var matchListDisable = function(a,b) {
    if(!a) {
        $(b).addClass('is-empty');
        //$saveListButton.addClass('is-disabled');
    } else {
        $(b).removeClass('is-empty');
        //$saveListButton.removeClass('is-disabled');
    }
}

// CHECK MODAL
var matchCheckModal = function() {
    var removes = $(removeList+' .card.is-product').length;
    var saves = $(saveList+' .card.is-product').length;
    
    if (!removes || !saves) {
        modalClose('byclick');
    }
}

// CARD MOVE
var matchCardMove = function(a,b) {
    var $target = b;
    var $card = a;
        
    // MOVE
    $card.removeAttr('data-match');
    $card.appendTo($target);
    
    matchCounter();
    
    // SAVE COUNTER
    matchSaveCounter();
    
    // REMOVE COUNTER
    matchRemoveCounter();
    
    matchCheckModal();
    
};

// SAVE
var matchSave = function(a) {
    
    // BASICS
    matchBasics();    
    
    if(!a) {
        var $card = $activeCard;
    } else {
        var $card = a;
    }
    
    // SAVE ANIMATION
    $card.attr('data-status','saved');
    
    // SAVE COUNTER
    matchSaveCalc();
    
    // BLINK HEART
    $saveListButton.addClass('blink-me');
    saveButtonDelay = setTimeout(function() {
        $saveListButton.removeClass('blink-me');
    }, 1000);
    // end BLINK HEART
    
    // CLICK DISABLE - 1S
    matchClickDisable(1000);
    
    // GO NEXT
    matchNextDelay = setTimeout(function() {
        matchCardMove($card,saveList);
        $card.removeAttr('data-status');
        matchNext();
    }, 750);
    
    matchToast('Imóvel salvo em sua lista');
    
}

// REMOVE
var matchRemove = function(a) {    
    
    // BASICS
    matchBasics();    
    
    if(!a) {
        var $cards = $activeCard;
    } else {
        var $cards = $(a);
    }
    
    $cards.each(function(){
        var parentClass = matchCardParent($(this));
        if(parentClass == 'match-saves') {
            matchSaveCalc('decrease');
        }
    });
    
    // CLICK DISABLE - 1S
    matchClickDisable(1000);
    
    // REMOVE ANIMATION
    $cards.attr('data-status','removed');

    // GO NEXT
    matchNextDelay = setTimeout(function() {
        matchCardMove($cards,removeList);
        $cards.removeAttr('data-status');
        matchNext();
    }, 750);
    
    matchToast('Imóvel eliminado do match');
    
}

// ACTION BUTTONS CONFIG
var matchAct = function() {
    
    $('.match-actions').on('click', '#saveCard', function (e) {
        
        // SAVE
        matchSave();
        
        return false;
    });
    
    $('#modal-eliminar').on('click', '#removeCard-active', function (e) {
        
        // REMOVE
        matchRemove();
        
        // MODAL CLOSE
        modalClose('byclick');
        
        return false;
    });
    
    $('#modal-eliminar').on('click', '#removeCard-all', function (e) {
        
        // REMOVE
        var dataRemove = $(this).attr('data-remove');
        matchRemove(dataRemove);
        
        // MODAL CLOSE
        modalClose('byclick');
        
        return false;
    });
    
    $('#modal-saveList').on('click', '[data-tag="remove"]', function (e) {
        
        // MOVE
        var $card = $(this).closest('.card.is-product');
        matchRemove($card);
        
        
        return false;
    });
    
    $('#modal-removeList').on('click', '[data-tag="save"]', function (e) {
        
        // MOVE
        var $card = $(this).closest('.card.is-product');
        matchSave($card);
        
        
        return false;
    });
    
}

// MATCH CAROUSELL
var swiperStart = function(a) {
    
    var mySwiper = new Swiper (a, {
            
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        spaceBetween: 0,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }

    })
    
}

// HOPSCOTCH
var hopscotchBackground = function(a){
        
    if (a == 'remove') {
        var $background = $('.hopscotch-background');
        $background.remove();
        return false;
    }
    
    var $background = $('<div />').appendTo('body');
    $background.addClass('hopscotch-background');
    
    $('body').on('click', '.hopscotch-background', function () {
        hopscotch.endTour();
        hopscotchBackground('remove');
        return false;
    });

};

// MATCH START
var matchStart = function() {
    
    window.$matchStart = $('.match-start');
    window.$matchFrame = $('.match-frame');
    window.$matchEnd = $('.match-end');
    
    matchBasics();
    
    // SAVE COUNTER
    matchSaveCounter();
    
    // REMOVE COUNTER
    matchRemoveCounter();
    
    $matchStart.on('click', '#button-startMatch', function () {
        
        $('section.match').removeClass('tour');
        swiperStart('.swiper-container');
        
        return false;
    });
    $matchStart.on('click', '#button-startTour', function () {
        
        $('section.match').removeClass('tour');
        swiperStart('.swiper-container');
        
        return false;
    });
    
}

// MATCH SETUP
var match = function() {
    
    var $body = $('body');    
    if ($body.hasClass('page-match') && $body.hasClass('match') ) {
        
    } else {
        return false;
    }
    
    // TOUR
    var $sectionMatch = $('section.match');    
    if( $sectionMatch.hasClass('tour') ) {
        matchStart();
    }
    
    // SETUP
    matchAct();
    matchNav();
    
}

/*
end MATCH
*/

/*
PRODUCT
*/

// MORE PRODUCT CAROUSELL
var swiperMore = function(a) {
    
    var swiper = new Swiper(a, {
        slidesPerView: 3,
        
        pagination: {
            el: '#productSwiper > .swiper-pagination',
            clickable: true,
        },
        
        navigation: {
          nextEl: '#productSwiper ~ .swiper-button-next',
          prevEl: '#productSwiper ~ .swiper-button-prev',
        },
        
        breakpoints: {
            800: {
                slidesPerView: 1
            },
            1136: {
                slidesPerView: 2
            }
        }
        
    });
    
}

var swiperMore2 = function (b) {

    var swiper = new Swiper(b, {
        slidesPerView: 3,

        pagination: {
            el: '#productSwiper2 > .swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '#productSwiper2 ~ .swiper-button-next',
            prevEl: '#productSwiper2 ~ .swiper-button-prev',
        },

        breakpoints: {
            800: {
                slidesPerView: 1
            },
            1136: {
                slidesPerView: 2
            }
        }

    });

}

var swiperMore3 = function (c) {

    var swiper = new Swiper(c, {
        slidesPerView: 3,

        pagination: {
            el: '#productSwiper3 > .swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '#productSwiper3 ~ .swiper-button-next',
            prevEl: '#productSwiper3 ~ .swiper-button-prev',
        },

        breakpoints: {
            800: {
                slidesPerView: 1
            },
            1136: {
                slidesPerView: 2
            }
        }

    });

}

var swiperMore4 = function (d) {

    var swiper = new Swiper(d, {
        slidesPerView: 3,

        pagination: {
            el: '#productSwiper4 > .swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '#productSwiper4 ~ .swiper-button-next',
            prevEl: '#productSwiper4 ~ .swiper-button-prev',
        },

        breakpoints: {
            800: {
                slidesPerView: 1
            },
            1136: {
                slidesPerView: 2
            }
        }

    });

}

var swiperMore5 = function (e) {

    var swiper = new Swiper(e, {
        slidesPerView: 3,

        pagination: {
            el: '#productSwiper5 > .swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '#productSwiper5 ~ .swiper-button-next',
            prevEl: '#productSwiper5 ~ .swiper-button-prev',
        },

        breakpoints: {
            800: {
                slidesPerView: 1
            },
            1136: {
                slidesPerView: 2
            }
        }

    });

}


// SHOW MAP
var showMap = function() {
    var button =  '[data-map="button"]';
    var $sidding =  $('[data-map="sidding"]');
    var $frame =  $('[data-map="frame"]');
    
    
    $('body').on('click', button, function () {
        
        $sidding.remove();
        $frame.removeClass('hide');
        
        return false;
    });
}

// GALLERY CAROUSELL
var swiperGallery = function(a) {
    
    var gallerySwiper = new Swiper (a, {
            
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        spaceBetween: 0,
        
        // Navigation arrows
        navigation: {
          nextEl: a+' > .swiper-button-next',
          prevEl: a+' > .swiper-button-prev',
        }

    })
    
}

// GALLERY TAB
var galleryChangeTab = function(a,b) {
    
}

var galleryTabs = function() {
    
    var $gallery = $('.gallery');
    var $tabs = $gallery.find('.gallery-tabs');
    var $tabActive = $tabs.find('.is-active');
    var tabTarget = $tabActive.attr('data-tab');
    var $tabTarget = $(tabTarget);
    
    $tabTarget.addClass('is-active');
    swiperGallery(tabTarget+' .swiper-container');
    
    $('[data-tab]').click(function(){
        var $this = $(this);
        var $tab = $('.tab');
        var $tabContent = $('.tab-content');
        var tabTarget = $this.attr('data-tab');
        var $tabTarget = $(tabTarget);
        
        console.log(tabTarget);
        
        $tab.removeClass('is-active');
        $this.addClass('is-active');
        
        $tabContent.removeClass('is-active');
        $tabTarget.addClass('is-active');
        swiperGallery(tabTarget+' .swiper-container');
        
        
        player.stopVideo();
        
        return false;
    });
    
}

// GALLERY OPEN
var galleryOpen = function() {
    
    $('[data-gallery]').click(function(){
        var $body = $('body');
        var $this = $(this);
        var gallery_id = $this.attr('data-gallery');
        $('#'+gallery_id).addClass('is-active');
        $body.addClass('gallery-open');
        
        galleryTabs();
        
        return false;
    });
    
}

// GALLERY CLOSE
var galleryClose = function(a) {
    
    if(a=='byclick') {
        var $body = $('body');
        $('.gallery').removeClass('is-active');
        $body.removeClass('gallery-open');
        return false;
    }
    
    $('.gallery [aria-label="close"]').click(function(){
        var $body = $('body');
        var $this = $(this);
        var $gallery = $this.closest('.gallery');
        $gallery.removeClass('is-active');
        $body.removeClass('modal-open');
        return false;
    });
    $('.gallery .gallery-background').click(function(){
        var $body = $('body');
        $('.gallery').removeClass('is-active');
        $body.removeClass('gallery-open');
        return false;
    });
    $(document).on('keyup',function(evt) {
        if (evt.keyCode == 27) {
            var $body = $('body');
            $('.gallery').removeClass('is-active');
            $body.removeClass('gallery-open');
        }
    });
    
}

// PRODUCT BASICS
var productBasics = function() {
    
    window.$body = $('body');
    
    window.$saveListButton = $('#button-saveList');
    window.$saveCounter = $('.save-counter');
    
    window.productId = $body.attr('data-id');
    
    
    // SAVE COUNTER
    matchSaveCounter();
    // REMOVE COUNTER
    matchRemoveCounter();
    
    // SAVE COUNTER
    $saveCounter.each(function() {
        $(this).text(saveNumber);
    });
    
    
}

var productVersion = function(a) {
    var version = a;
    $body.attr('data-version', version);
}

// ACTION BUTTONS CONFIG
var productAct = function() {
    
    $('#modal-eliminar').on('click', '#removeCard-active', function (e) {
        
        // REMOVE
        matchRemove();
        
        // VERSION
        productVersion('removed');
        
        // MODAL CLOSE
        modalClose('byclick');
        
        return false;
    });
    
    $('.footbar-match').on('click', '#saveCard', function (e) {
        
        // VERSION
        productVersion('saved');
        
        // SAVE
        matchSave();
        
        return false;
    });
    
    $('#modal-saveList').on('click', '[data-tag="remove"]', function (e) {
        
        // MOVE
        var $card = $(this).closest('.card.is-product');
        var cardId = $card.attr('id');
        
        if(cardId == productId) {
            productVersion('removed');
        }
        
        matchRemove($card);
        
        
        return false;
    });
    
    $('#modal-removeList').on('click', '[data-tag="save"]', function (e) {
        
        // MOVE
        var $card = $(this).closest('.card.is-product');
        matchSave($card);
        
        if(cardId == productId) {
            productVersion('saved');
        }
        
        
        return false;
    });
    
}

// PRODUCT START
var productStart = function() {
    
    // CARD SWIPER
    swiperStart('.card .swiper-container');
    
    // MORE SWIPER
    swiperMore('#productSwiper');
    swiperMore2('#productSwiper2');
    swiperMore3('#productSwiper3');
    swiperMore4('#productSwiper4');
    swiperMore5('#productSwiper5');
    
    // SAVE COUNTER
    productBasics();
    
}

 
// PRODUCT SETUP
var product = function() {
    
    var $body = $('body');    
    if ($body.hasClass('page-product')) {
        
    } else {
        return false;
    }
    
    // MATCH
    productAct();
    
    // MAP
    showMap();
    
    // CARD
    productStart();
    
    // MODAL
    galleryOpen();
    galleryClose(); 
    
}

/*
end PRODUCT
*/


// MODAL IMOVEIS
function modalImoveis() {
    $('.modal-imoveis').show();
}
/**
end MODAL IMOVEIS 
*/

$(function() {
    
    // PRODUCT SETUP
    product();
    
    // MATCH SETUP
    match();
    
    // MATCH LOADING
    matchLoading();
    
    // CHECKING SCROLL
    scrollCheck(40);
    $(window).scroll(function() {
        scrollCheck(40);        
    });
    
    // FORM DATA ROWS
    dataRows();
        
    // NAVBAR
    var body = $('body');
    
    // TOPBAR
    topbarClose();
    
    // FORM MASKS
    formMasks();
    formMasksMoney();
    
    // FORM VALIDATION
    var $allForms = $('form[data-validation]');
    formValidation();
    $allForms.keyup(function() {
        formValidation();
    });
    
    // ACCORDIONS
    accordions();
    
    // MODAL
    modalOpen();
    modalClose();
    
    // end MODAL
    
    // STEPS
    steps();
    
    // SIGNUP 03
    signup03();
    
    // TOAST
    /*
    bulmaToast.toast({
        message: "Ops! Ocorreu um problema no nosso servidor.",
        type: "is-black",
        duration:  2000,
        position: "bottom-left",
        dismissible: true,
        animate: { in: "fadeIn", out: "fadeOut" }
    });
    */
    
});

