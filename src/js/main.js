$(document).ready(function () {
    $('select').niceSelect();
    switchTabs();
    /*alert("ok");*/
    /*$(".slogan").css("color", "red");*/
    /*var $width = $(document).width();
     if ($width < 767) {
     }
     else {
     }*/

});

function switchTabs() {
    $("#content .b-content__item").hide(); // Скрываем содержание
    $("#tabs .nn-tabs__item:first").attr("id", "current"); // Активируем первую закладку
    $("#content .b-content__item:first").fadeIn(); // Выводим содержание

    $('#tabs a').click(function (e) {
        e.preventDefault();
        $("#content .b-content__item").hide(); //Скрыть все сожержание
        $("#tabs .nn-tabs__item").attr("id", ""); //Сброс ID
        $(this).parent(".nn-tabs__item").toggleClass("active");
        $("#tabs a").not(this).parent(".nn-tabs__item").toggleClass("active");
        $(this).parent().attr("id", "current"); // Активируем закладку
        $('#' + $(this).attr('title')).fadeIn(); // Выводим содержание текущей закладки
    });
}



