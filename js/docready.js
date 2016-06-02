$(document).ready(function(){
    $('#navtoggle').on('click', function(){
        $(this).toggleClass('open');
        $("#mySidenav").toggleClass("open");
    });

    $body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

});