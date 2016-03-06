var app = app || {};

app.ctrl = {

    init: (function () {

        'use strict';
        $(document).on('ready', function () {

            // - centrar el logo al cambiar el tamaño de la ventana
            $(window).resize(app.ctrl.centerLogo);
            $(window).ready(app.ctrl.centerLogo);

            if (app.context.isMobile()) {

                app.ctrl.defineHeaderBG(true);

            } else {

                app.ctrl.defineHeaderBG(false);

            }

        });

    }()),

    settings: (function () {

        'use strict';

    }()),

    defineHeaderBG: function (isMobile) {

        var $headerContainer = $('#main-header__bg');

        if (isMobile) {

            $headerContainer.append('<img src="img/fondo_main-header.jpg" alt="la roulette">');

        } else {

            $('#main-header__bg').vide({
                mp4: 'videos/videoRoulette',
                webm: 'videos/videoRoulette',
                poster: 'videos/videoRoulette'
            }, {
                position: '50% 50%',
                posterType: 'jpg',
                resizing: true,
                bgColor: 'transparent'
            });

        }

    },

    centerLogo: function () {

        var $container = $('#main-header'),
            containerW = $container.width(),
            containerH = $container.height(),
            $logo = $('#lr-logo'),
            logoW = $logo.width(),
            logoH = $logo.height();

        $logo.css({
            top: containerH / 2.5 - logoH / 2,
            left: containerW / 2 - logoW / 2
        });

    }

};

















