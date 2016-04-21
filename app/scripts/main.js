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
            app.ctrl.data.isTablet = Modernizr.mq('(min-device-width : 601px) and (orientation: portrait) ');

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

            // OBTENCION DE DATOS DE LA API DE FLIKR
            app.ctrl.inicio.getFlikrAlbums(1, function (data, textStatus, xhr) {

                // - Done getFlikrAlbums

                var albums = data.photosets.photoset;

                $.each(albums, function (i, album) {

                    album.index = i;
                    app.ctrl.inicio.setAlbum(album);

                });

            }, function (resp) {

                // - Fail getFlikrAlbums

                console.log('fail');
                console.log(resp);

            });

            // OBTENCION DE DATOS DE LA API DE YOUTBE
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

        var gallery;

        // - Open album
        $(document).on('click', '.js-album', function () {

            var $this = $(this),
                $pswpElement = $('.pswp')[0],
                id = $this.data().id,
                items = [],
                options = {
                    getThumbBoundsFn: function () {

                        var offset = $this.offset(),
                            width = $this.width();

                        return {
                            x: offset.left,
                            y: offset.top,
                            w: width
                        };

                    }
                };

            if (app.context.isMobile()) {

                $('body').addClass('gallery-open');

            }

            app.ctrl.inicio.getFlikrAlbumsPhotos(id, function (data, textStatus, xhr) {

                // - Done getFlikrAlbumsPhotos

                var photos = data.photoset.photo;

                $.each(photos, function (i, photo) {

                    var photoObj = {
                        // mediumImage: {
                        //     src: photo.url_s,
                        //     w: Number(photo.width_s),
                        //     h: Number(photo.height_s)
                        // },
                        // originalImage: {
                        //     src: photo.url_m,
                        //     w: Number(photo.width_m),
                        //     h: Number(photo.height_m)
                        // },
                        src: photo.url_m,
                        w: Number(photo.width_m),
                        h: Number(photo.height_m),
                        author: data.ownername,
                        title: photo.title
                    };

                    items.push(photoObj);

                });

                gallery = new PhotoSwipe($pswpElement, PhotoSwipeUI_Default, items, options);

                // - Inicializar galeria
                gallery.init();

                // - Gallery starts closing
                gallery.listen('close', function () {

                    var $body = $('body');

                    if ($body.hasClass('gallery-open')) {

                        $body.removeClass('gallery-open');

                    }

                });


            }, function (resp) {

                // - Fail getFlikrAlbumsPhotos

            });

        });

    },

    // HELPER SECTION FUNCTIONS
    defineHeaderBG: function (isMobile) {

        'use strict';

        var $headerContainer = $('#main-header__bg');

        // testing
        // isMobile = true;

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
            extras: 'url_s, url_m'
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

    },

    setAlbum: function (albumObj) {

        'use strict';

        var $albumsContainer = $('#albumsContainer'),
            dataObj = {},
            imgUrl;

        if (app.context.isMobile()) {

            if (app.ctrl.data.isTablet) {

                imgUrl = albumObj.primary_photo_extras.url_m;

            } else {

                imgUrl = albumObj.primary_photo_extras.url_s;

            }

        } else {

            imgUrl = albumObj.primary_photo_extras.url_m;

        }

        if (albumObj) {

            dataObj.id = albumObj.id;
            dataObj.numPhotos = albumObj.photos;
            dataObj.title = albumObj.title._content;
            dataObj.description = albumObj.description._content;
            dataObj.creationDate = new Date(albumObj.date_create * 1000);
            dataObj.creationYear = dataObj.creationDate.getFullYear();

        }

        $albumsContainer.append(slm.tmpltParser(app.templates.album, dataObj));

        if (albumObj) {

            $('#' + dataObj.id)
                .data(dataObj)
                .css('background-image', 'url(' + imgUrl + ')');

        }

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
