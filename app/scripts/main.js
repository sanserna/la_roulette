var app = app || {};

app.ctrl = {

    data: {},

    init: (function () {

        'use strict';

        $(document).on('ready', function () {

            // - set global scrollReveal var
            window.sr = ScrollReveal();

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

    data: {
        flikrAuth: {
            // - la roulette api key
            api_key: 'd95dcce57dea2cd47bcb0c1b692783f9',
            // - test api key
            // api_key: 'b5a15c73a84e621e304052f94c847246',
            // - la roulette user id
            user_id: '142065498@N08'
            // - test user id
            // user_id: '140878839@N02'
        },

        youTubeAuth: {
            // - la roulette api key
            // api_key: 'AIzaSyCpEgQmSQC2TRDl73yy5Tn9U1ngZDFy9Ls',
            // - test api key
            // api_key: 'AIzaSyDCAnbI51T-sgKTtYaPI7-8YAOg0tVttIg',
            // - test roulette api key
            api_key: 'AIzaSyBPPX9x7Aj3wQ_aTTMXH7nrl2ddb9v-MdU',
            user_name: '',
            // - la roulette channel id
            channel_id: 'UC7CtU1sK_A8uboBCJLfzj2g'
            // - test channel id
            // channel_id: 'UCp2irPEY6KT4392YGoC6ZBQ'
        }
    },

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.inicio.settings();

            // - listener para centrar el logo al cambiar el tamaño de la ventana
            $(window).resize(app.ctrl.inicio.centerHeaderContent);
            $(window).ready(app.ctrl.inicio.centerHeaderContent);

            if (app.context.isMobile()) {

                app.ctrl.inicio.defineHeaderBG(true);

            } else {

                app.ctrl.inicio.defineHeaderBG(false);

            }

            // - load plyr controls sprite
            $.get('img/assets/plyr-sprite.svg', function (data) {

                $('body').prepend('<div hidden>' + data + '</div>');

            }, 'html');

            // OBTENCION DE DATOS DE LA API DE FLIKR
            // app.ctrl.inicio.getFlikrAlbums(1, function (data, textStatus, xhr) {

            //     // - Done getFlikrAlbums

            //     var albums = data.photosets.photoset;

            //     $.each(albums, function (i, album) {

            //         album.index = i;
            //         app.ctrl.inicio.setAlbum(album);

            //     });

            //     // - inicializar la paginacion de la galeria
            //     $("div.holder").jPages({
            //         previous: 'anterior',
            //         next: 'siguiente',
            //         containerID: "albumsContainer",
            //         perPage: 8,
            //         minHeight: false,
            //         animation: 'fadeInUpAlbum'
            //     });

            // }, function (resp) {

            //     // - Fail getFlikrAlbums

            //     console.log('fail');
            //     console.log(resp);

            // });

            // OBTENCION DE DATOS DE LA API DE YOUTBE
            // app.ctrl.inicio.getYoutubeChannel(function (data, textStatus, xhr) {

            //     // - Done getYoutubeChannel

            //     var items = data.items;

            //     $.each(items, function (i, item) {

            //         var playlistId = item.contentDetails.relatedPlaylists.uploads;

            //         console.log(item.contentDetails.relatedPlaylists);

            //         app.ctrl.inicio.getYoutubeChannelVideos(playlistId, function (data, textStatus, xhr) {

            //             // - Done getYoutubeChannelVideos

            //             var items = data.items,
            //                 $owlCarousel = $('.owl-carousel');

            //             $.each(items, function (i, item) {

            //                 var videoObj = {
            //                     titulo: item.snippet.title,
            //                     videoId: item.snippet.resourceId.videoId
            //                 };

            //                 $owlCarousel.append(slm.tmpltParser(app.templates.youTubeVideoPlyr, videoObj));

            //             });

            //             // - se inicializa owl-carousel
            //             $owlCarousel.owlCarousel({
            //                 items: 1,
            //                 nav: true,
            //                 loop: true,
            //                 center: true,
            //                 mouseDrag: false,
            //                 touchDrag: false,
            //                 navText: ['<', '>'],
            //                 responsive: {
            //                     0: {
            //                         dots: false
            //                     },
            //                     640: {
            //                         stagePadding: 100,
            //                         margin: 50
            //                     },
            //                     1024: {
            //                         stagePadding: 300,
            //                         margin: 150
            //                     },
            //                     1300: {
            //                         stagePadding: 400,
            //                         margin: 200
            //                     }
            //                 },
            //                 onInitialized: function () {

            //                     // - se inicializa plyr quien se encarga se setiar los videos
            //                     plyr.setup({
            //                         controls: ["restart", "play", "current-time", "duration", "mute", "volume", "captions", "fullscreen"]
            //                     });

            //                 }
            //             });

            //         }, function (resp) {

            //             // - Fail getYoutubeChannelVideos

            //         });

            //     });

            // }, function (resp) {

            //     // - Fail getYoutubeChannel

            // });

        });

    },

    settings: function () {

        'use strict';

        var gallery;

        // - open album
        $(document).on('click', '.js-album', function () {

            var $this = $(this),
                $pswpElement = $('.pswp')[0],
                id = $this.data().id,
                items = [],
                imgProps = app.ctrl.inicio.defineImgProps(),
                options = {
                    // - establecer ubicacion y dimensiones del album al que se le da click
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

            // if (app.context.isMobile()) {

            $('body').addClass('gallery-open');

            // }

            app.ctrl.inicio.getFlikrAlbumsPhotos(id, function (data, textStatus, xhr) {

                // - Done getFlikrAlbumsPhotos

                var photos = data.photoset.photo;

                console.log(data);

                $.each(photos, function (i, photo) {

                    var photoObj = {
                        src: photo[imgProps.imgType],
                        w: Number(photo[imgProps.w]),
                        h: Number(photo[imgProps.h]),
                        author: data.ownername,
                        title: photo.title
                    };

                    items.push(photoObj);

                });

                gallery = new PhotoSwipe($pswpElement, PhotoSwipeUI_Default, items, options);

                // - inicializar galeria
                gallery.init();

                // - gallery starts closing
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

        // - scrollReveal settings
        (function () {

            // - servicio nav item
            sr.reveal('.sr-servicio', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.8
            });

            // - fundador item
            sr.reveal('.sr-fundador', {
                origin: 'left',
                duration: 500,
                delay: 50,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.9
            }, 100);

        }());

    },

    // SERVICES
    getFlikrAlbums: function (page, done, fail) {

        'use strict';

        app.services.flikrAlbums({
            key: app.ctrl.inicio.data.flikrAuth.api_key,
            id: app.ctrl.inicio.data.flikrAuth.user_id,
            extras: 'url_s, url_m',
            // - actualmente no se esta enviando page y perPage
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
            key: app.ctrl.inicio.data.flikrAuth.api_key,
            id: app.ctrl.inicio.data.flikrAuth.user_id,
            photosetId: albumId,
            extras: 'url_s, url_m, url_sq, url_t'
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
            key: app.ctrl.inicio.data.youTubeAuth.api_key,
            part: 'contentDetails',
            channelId: app.ctrl.inicio.data.youTubeAuth.channel_id
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
            key: app.ctrl.inicio.data.youTubeAuth.api_key,
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
            top: $logo.position().top + (logoH + containerH / 7)
        });

    },

    setAlbum: function (albumObj) {

        'use strict';

        var $albumsContainer = $('#albumsContainer'),
            dataObj = {},
            imgUrl = albumObj.primary_photo_extras[app.ctrl.inicio.defineImgProps().imgType];

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

    },

    defineImgProps: function () {

        'use strict';

        var propsObj = {};

        if (app.context.isMobile()) {

            if (app.context.isTablet()) {

                propsObj.imgType = 'url_m';
                propsObj.w = 'width_m';
                propsObj.h = 'height_m';

            } else {

                propsObj.imgType = 'url_s';
                propsObj.w = 'width_s';
                propsObj.h = 'height_s';

            }

        } else {

            propsObj.imgType = 'url_m';
            propsObj.w = 'width_m';
            propsObj.h = 'height_m';

        }

        return propsObj;

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

        // - scrollReveal settings
        (function () {

            // - section-header
            sr.reveal('.section-header', {
                distance: '100px',
                duration: 2000,
                delay: 100,
                scale: 1,
                easing: 'cubic-bezier(0.08,0.51,0.81,0.99)',
                viewFactor: 0.5
            });

            // - section-header title
            sr.reveal('.section-header__title', {
                origin: 'left',
                distance: '40px',
                duration: 1000,
                delay: 1500,
                scale: 1,
                easing: 'ease-in',
                viewFactor: 1
            });

            // - section-header title
            sr.reveal('.section-header__description', {
                origin: 'right',
                distance: '40px',
                duration: 1000,
                delay: 1500,
                scale: 1,
                easing: 'ease-out',
                viewFactor: 1
            });

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.3
            });

        }());

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

        // - scrollReveal settings
        (function () {

            // - section-header
            sr.reveal('.section-header', {
                distance: '100px',
                duration: 2000,
                delay: 100,
                scale: 1,
                easing: 'cubic-bezier(0.08,0.51,0.81,0.99)',
                viewFactor: 0.5
            });

            // - section-header title
            sr.reveal('.section-header__title', {
                origin: 'left',
                distance: '40px',
                duration: 1000,
                delay: 1500,
                scale: 1,
                easing: 'ease-in',
                viewFactor: 1
            });

            // - section-header description
            sr.reveal('.section-header__description', {
                origin: 'right',
                distance: '40px',
                duration: 1000,
                delay: 1500,
                scale: 1,
                easing: 'ease-out',
                viewFactor: 1
            });

            // - cocktail half
            sr.reveal('.sr-half', {
                distance: '50px',
                duration: 1000,
                delay: 200,
                scale: 1,
                easing: 'ease-out',
                viewFactor: 0.15
            });

        }());

    }

};

// OFFICE PARTY
app.ctrl.officeParty = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.officeParty.settings();

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - section-header
            sr.reveal('.section-header', {
                distance: '100px',
                duration: 2000,
                delay: 100,
                scale: 1,
                easing: 'cubic-bezier(0.08,0.51,0.81,0.99)',
                viewFactor: 0.5
            });

            // - section-header title
            sr.reveal('.section-header__title', {
                origin: 'left',
                distance: '40px',
                duration: 1000,
                delay: 1500,
                scale: 1,
                easing: 'ease-in',
                viewFactor: 1
            });

            // - section-header description
            sr.reveal('.section-header__description', {
                origin: 'right',
                distance: '40px',
                duration: 1000,
                delay: 1500,
                scale: 1,
                easing: 'ease-out',
                viewFactor: 1
            });

        }());

    }

};

// CONTACTO
app.ctrl.contacto = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.contacto.settings();

        });

    },

    settings: function () {

        'use strict';

    }
};
