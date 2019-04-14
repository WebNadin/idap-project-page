$(document).ready(function () {
    $('select').niceSelect();
    switchTabs();
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



