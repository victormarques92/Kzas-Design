$(function() {
    
    // LOADER
    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){
            $(this).remove();
            $('.preloader-content').addClass('loaded');
        });
    });
	
});