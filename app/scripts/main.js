var app = app || {};

app.ctrl = {

    data: {},

    init: (function () {

        'use strict';

        $(document).on('ready', function () {

            // - inicializar variables globales
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

            // - set elements image backgrounds
            app.ctrl.setElementImgBg();

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

    }()),

    // HELPER FUNCTIONS
    setElementImgBg: function () {

        'use strict';

        var $element = $('[media-bg-img]');

        $.each($element, function (i, e) {

            var $e = $(e),
                path = $e.attr('media-bg-img');

            $e.css('background-image', 'url(' + path + ')');

        });

    }

};

// INICIO
app.ctrl.inicio = {

    flikrAuth: {
        api_key: 'b5a15c73a84e621e304052f94c847246',
        user_id: '140878839@N02'
    },

    youTubeAuth: {
        api_key: 'AIzaSyDCAnbI51T-sgKTtYaPI7-8YAOg0tVttIg',
        user_name: '',
        channel_id: 'UCp2irPEY6KT4392YGoC6ZBQ'
    },

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.inicio.settings();

            // - load plyr controls sprite
            app.ctrl.inicio.loadVideoControlsSrpite(document, '../img/assets/plyr-sprite.svg');

            // - listener para centrar el logo al cambiar el tamaño de la ventana
            $(window).resize(app.ctrl.inicio.centerHeaderContent);
            $(window).ready(app.ctrl.inicio.centerHeaderContent);

            if (app.context.isMobile()) {

                app.ctrl.inicio.defineHeaderBG(true);

            } else {

                app.ctrl.inicio.defineHeaderBG(false);

            }

            // app.ctrl.inicio.getFlikrAlbums(1, function (data, textStatus, xhr) {

            //     // - Done getFlikrAlbums

            //     var id = data.photosets.photoset[0].id;

            //     app.ctrl.inicio.getFlikrAlbumsPhotos(id, function (data, textStatus, xhr) {

            //         // - Done getFlikrAlbumsPhotos

            //         console.log(data);

            //     }, function (resp) {

            //         // - Fail getFlikrAlbumsPhotos

            //     });

            // }, function (resp) {

            //     // - Fail getFlikrAlbums

            //     console.log('fail');
            //     console.log(resp);

            // });

            app.ctrl.inicio.getYoutubeChannel(function (data, textStatus, xhr) {

                // - Done getYoutubeChannel

                var items = data.items;

                $.each(items, function (i, item) {

                    var playlistId = item.contentDetails.relatedPlaylists.favorites;

                    app.ctrl.inicio.getYoutubeChannelVideos(playlistId, function (data, textStatus, xhr) {

                        // - Done getYoutubeChannelVideos

                        var items = data.items,
                            $container = $('#videosContainer');

                        $.each(items, function (i, item) {

                            var videoObj = {
                                titulo: item.snippet.title,
                                videoId: item.snippet.resourceId.videoId
                            };

                            $container.append(slm.tmpltParser(app.templates.youTubeVideoPlyr, videoObj));

                        });

                        // - Se inicializa plyr quien se encarga se setiar los videos
                        plyr.setup({
                            controls: ["restart", "play", "current-time", "duration", "mute", "volume", "captions", "fullscreen"]
                        });

                    }, function (resp) {

                        // - Fail getYoutubeChannelVideos

                    });

                });

            }, function (resp) {

                // - Fail getYoutubeChannel

            });

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
            top: containerH / 2 - logoH / 2,
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

    },

    getFlikrAlbums: function (page, done, fail) {

        'use strict';

        app.services.flikrAlbums({
            key: app.ctrl.inicio.flikrAuth.api_key,
            id: app.ctrl.inicio.flikrAuth.user_id,
            extras: 'url_s, url_m',
            page: page,
            perPage: 5
        })
        .done(function (data, textStatus, xhr) {

            if (done) {

                done(data, textStatus, xhr);

            }

        })
        .fail(function (resp) {

            if (fail) {

                fail(resp);

            }

        });

    },

    getFlikrAlbumsPhotos: function (albumId, done, fail) {

        'use strict';

        app.services.flikrAlbumsPhotos({
            key: app.ctrl.inicio.flikrAuth.api_key,
            id: app.ctrl.inicio.flikrAuth.user_id,
            photosetId: albumId,
            extras: 'url_t, url_s, url_m'
        })
        .done(function (data, textStatus, xhr) {

            if (done) {

                done(data, textStatus, xhr);

            }

        })
        .fail(function (resp) {

            if (fail) {

                fail(resp);

            }

        });

    },

    getYoutubeChannel: function (done, fail) {

        'use strict';

        app.services.youtubeChannel({
            key: app.ctrl.inicio.youTubeAuth.api_key,
            part: 'contentDetails',
            channelId: app.ctrl.inicio.youTubeAuth.channel_id
        })
        .done(function (data, textStatus, xhr) {

            if (done) {

                done(data, textStatus, xhr);

            }

        })
        .fail(function (resp) {

            if (fail) {

                fail(resp);

            }

        });

    },

    getYoutubeChannelVideos: function (playlistId, done, fail) {

        'use strict';

        app.services.youtubeChannelVideos({
            key: app.ctrl.inicio.youTubeAuth.api_key,
            part: 'snippet',
            playlistId: playlistId,
            maxResults: 10
        })
        .done(function (data, textStatus, xhr) {

            if (done) {

                done(data, textStatus, xhr);

            }

        })
        .fail(function (resp) {

            if (fail) {

                fail(resp);

            }

        });

    }

};

// HOME PARTY
app.ctrl.homeParty = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.homeParty.settings();

        });

    },

    settings: function () {

        'use strict';

        // settings

    }

    // HELPER SECTION FUNCTIONS

};

// PARTY COCKTAIL
app.ctrl.partyCocktail = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.partyCocktail.settings();

        });

    },

    settings: function () {

        'use strict';

        // settings

    }

};
