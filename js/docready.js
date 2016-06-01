$(document).ready(function(){
    $('#navtoggle').on('click', function(){
        $(this).toggleClass('open');
        $("#mySidenav").toggleClass("open");
    });

});