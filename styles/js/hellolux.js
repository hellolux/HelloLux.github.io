!function ($) {

$(function () {
    
    orderTheLeftNavigations();

    function orderTheLeftNavigations(){
        $('#navigation .sidenav').html($("#markdown-toc").html());
        $("#markdown-toc").remove();

    }
    
})

}(jQuery)
  