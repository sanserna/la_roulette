/**
*  Web Care-Package
*  Copyright 2015 Santiago Serna. Todos los derechos reservados.
*/

$(function() {

    var container = $('#video-container');
    var logo = $('#lr-logo');

    // w = 1592 h = 372

    function repaint() {
        var loquesea = 50;

        var newH = container.height();
        // var logoH = Math.round(container.width() / 2 * 372 / 1592);

        var logoH = Math.round(container.width() / 2 * 378 / 400);

        logo.css("top", (newH - logoH) / 2 + 'px');

    }

    // $('#fullpage').fullpage();

    $(window).resize(repaint);
    $(window).ready(repaint);
    $('video').on('canplay', repaint);
    repaint();

    var vid = document.getElementsByTagName("video")[0];
    vid.onloadedmetadata = function() {
    console.log("Meta data for video loaded");
    };

});

// $('#video').vide({
//     mp4: 'videos/videoRoulette',
//     webm: 'videos/videoRoulette',
//     poster: 'videos/videoRoulette'
// }, {
//     volume: 1,
//     playbackRate: 1,
//     muted: false,
//     loop: true,
//     autoplay: true,
//     position: '50% 50%', // Similar to the CSS `background-position` property.
//     posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
//     resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
//     bgColor: 'transparent', // Allow custom background-color for Vide div,
//     className: '' // Add custom CSS class to Vide div
// });


















