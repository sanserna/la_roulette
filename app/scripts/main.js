var app = app || {};

app.ctrl = {

    init: (function () {

        'use strict';
        $(document).on('ready', function () {

            // - centrar el logo al cambiar el tamaño de la ventana
            $(window).resize(app.ctrl.centerHeaderContent);
            $(window).ready(app.ctrl.centerHeaderContent);

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

    centerHeaderContent: function () {

        'use strict';

        var $container = $('#main-header'),
            $logo = $('#lr-logo'),
            $title = $('#header-title'),
            $pointerHand = $('#pointer-hand'),
            containerW = $container.width(),
            containerH = $container.height(),
            logoW = $logo.width(),
            logoH = $logo.height(),
            titleW = $title.width(),
            titleH = $title.height();

        $logo.css({
            top: containerH / 2.5 - logoH / 2,
            left: containerW / 2 - logoW / 2
        });

        $title.css({
            top: $logo.position().top + (logoH + titleH / 2)
        });

        $pointerHand.css({
            top: $title.position().top + (titleH + 20)
        });

    }

};

















