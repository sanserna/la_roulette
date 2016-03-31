var app = app || {};

app.ctrl = {

    data: {},

    init: (function () {

        'use strict';

        $(document).on('ready', function () {

            // inicializar variables globales
            app.ctrl.data.transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd',
                msTransition: 'MSTransitionEnd',
                transition: 'transitionend'
            };
            app.ctrl.data.transEndEventName = app.ctrl.data.transEndEventNames[Modernizr.prefixed('transition')];
            app.ctrl.data.support = {
                transitions: Modernizr.csstransitions
            };

        });

    }()),

    settings: (function () {

        'use strict';

        // MAIN NAVIGATION TOGGLE
        $(document).on('click', '#trigger-main-nav', function (event) {

            var $this = $(this),
                $mainNav = $('#globalnav'),
                $mainNavMenu = $('#main-nav-menu'),
                $mainNavMenuItem = $('.main-nav__item--menu');

            $mainNavMenu.slideToggle(300);
            $mainNav.toggleClass('main-nav--active');

        });

    }())

};

app.ctrl.inicio = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.inicio.settings();

            // - load controls sprite
            app.ctrl.inicio.loadVideoControlsSrpite(document, '../img/plyr-sprite.svg');

            // plyr.setup({
            //     controls: ["restart", "play", "current-time", "duration", "mute", "volume", "captions"]
            // });

            // - listener para centrar el logo al cambiar el tamaño de la ventana
            $(window).resize(app.ctrl.inicio.centerHeaderContent);
            $(window).ready(app.ctrl.inicio.centerHeaderContent);

            if (app.context.isMobile()) {

                app.ctrl.inicio.defineHeaderBG(true);

            } else {

                app.ctrl.inicio.defineHeaderBG(false);

            }

        });

    },

    settings: function () {

        'use strict';

    },

    // HELPER SECTION FUNCTIONS
    defineHeaderBG: function (isMobile) {

        'use strict';

        var $headerContainer = $('#main-header__bg');

        if (isMobile) {

            $headerContainer.append('<div class="img-bg"></div>');

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
            $pointerHand = $('#pointer-hand'),
            containerW = $container.width(),
            containerH = $container.height(),
            logoW = $logo.width(),
            logoH = $logo.height();

        $logo.css({
            top: containerH / 2.5 - logoH / 2,
            left: containerW / 2 - logoW / 2
        });

        $pointerHand.css({
            top: $logo.position().top + (logoH + containerH / 15)
        });

    },

    loadVideoControlsSrpite: function (d, p) {

        'use strict';

        var a = new XMLHttpRequest(),
            b = d.body;

        a.open('GET', p, true);
        a.send();
        a.onload = function () {

            var c = d.createElement('div');
            c.setAttribute('hidden', '');
            c.innerHTML = a.responseText;
            b.insertBefore(c, b.childNodes[0]);

        };

    }

};

app.ctrl.homeParty = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.homeParty.settings();

            // - establecer imagenes de soporte para cada descripcion de servicio
            app.ctrl.homeParty.setServiceContentItemBg();

        });

    },

    settings: function () {

        'use strict';

        // settings

    },

    // HELPER SECTION FUNCTIONS
    setServiceContentItemBg: function () {

        'use strict';

        var $serviceItem = $('.js-sc-item');

        $.each($serviceItem, function (i, item) {

            var $item = $(item),
                path = $item.data().bgImgSrc;

            $item.css('background-image', 'url(' + path + ')');

        });

    }

};
