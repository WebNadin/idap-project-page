$(document).ready(function () {
    $('select').niceSelect();
    switchTabs();
    //setHeight();
    /*var $width = $(document).width();
     if ($width < 767) {
     }
     else {
     }*/

});

function switchTabs() {
    $("#content .b-content__item").hide(); // Скрываем содержание
    $("#tabs .js-link_tabs:first").attr("id", "current"); // Активируем первую закладку
    $("#content .b-content__item:first").fadeIn(); // Выводим содержание

    $('#tabs a').click(function (e) {
        e.preventDefault();
        $("#content .b-content__item").hide(); //Скрыть все сожержание
        $("#tabs .js-link_tabs").attr("id", ""); //Сброс ID
        $(this).closest(".nn-tabs__item").toggleClass("active");
        $("#tabs a").not(this).closest(".nn-tabs__item").toggleClass("active");
        $(this).parent().attr("id", "current"); // Активируем закладку
        $('#' + $(this).attr('title')).fadeIn(); // Выводим содержание текущей закладки
    });
}
function setHeight() {
    var $deviceHeight = screen.height;
    var $headerHeight = $(".nn-header").height() + 61;
    var $mainHeight = +($deviceHeight - $headerHeight);
    console.log('$deviceHeight = ');console.log($deviceHeight);
    console.log('$headerHeight = ');console.log($headerHeight);
    console.log('$mainHeight = ');console.log($mainHeight);
    $(".main").css("height", $mainHeight);
    console.log('$mainHeight = ');console.log($mainHeight);
}


