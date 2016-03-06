/**
*  La Roulette
*  Copyright 2015 Santiago Serna. Todos los derechos reservados.
*/

// $(function() {

//     var container = $('#video-container');
//     var logo = $('#lr-logo');

//     // w = 1592 h = 372

//     function repaint() {
//         var loquesea = 50;

//         var newH = container.height();
//         // var logoH = Math.round(container.width() / 2 * 372 / 1592);

//         var logoH = Math.round(container.width() / 2 * 378 / 400);

//         logo.css("top", (newH - logoH) / 2 + 'px');

//     }

//     // $('#fullpage').fullpage();

//     $(window).resize(repaint);
//     $(window).ready(repaint);
//     $('video').on('canplay', repaint);
//     repaint();

//     var vid = document.getElementsByTagName("video")[0];
//     vid.onloadedmetadata = function() {
//     console.log("Meta data for video loaded");
//     };

// });

var app = app || {};

app.ctrl = {

    init: (function () {

        'use strict';
        $(document).on('ready', function () {

            if (app.context.isMobile()) {

            } else {
                $('#video').vide({
                    mp4: 'videos/videoRoulette',
                    webm: 'videos/videoRoulette',
                    poster: 'videos/videoRoulette'
                }, {
                    position: '50% 50%',
                    posterType: 'jpg',
                    resizing: true,
                    bgColor: 'transparent'
                })
            }

        });

    }()),

    settings: (function () {

        'use strict';

    }());

}

















