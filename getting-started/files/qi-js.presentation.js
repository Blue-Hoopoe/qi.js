/* introduction presentation event */
window.addEventListener("load", function () {
    $('#presentation-1 .slider').on("moved.zf.slider", function () {
        var val = $('#presentation-1 input').val();
        var osw = $('#presentation-1 .os-window');
        var img = osw.find('img').first();
        osw.css({'width': val + "%"});
        if (val < 65) {
            img.attr('src', '/public/images/1366x768.png');
            return;
        }
        if (val < 82) {
            img.attr('src', '/public/images/1600x900.png');
            return;
        }
        img.attr('src', '/public/images/1920x1080.png');
    });
});
/* end introduction presentation event */