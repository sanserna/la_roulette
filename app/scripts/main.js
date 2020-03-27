/* global $, jQuery, document, window, navigator, classie, Modernizr, plyr, XMLHttpRequest, slm, PhotoSwipe, PhotoSwipeUI_Default, scrollReveal, sr, XMLSerializer, FB, alert */
var app = app || {};

app.ctrl = {

    data: {},

    init: (function () {

        'use strict';

        $(document).on('ready', function () {

            // - set global scrollReveal var
            window.sr = scrollReveal();

            // - añadir clase al <html> si scrollReveal es soportado
            if (sr.isSupported()) {

                $('body').addClass('sr');

            }

            // - identificar si el dispositivo es ios
            if (app.context.isIOS()) {

                $('body').addClass('ios');

            }

            // - inicializar variables globales
            app.ctrl.data.animationEndEventsNames = {
                WebkitAnimation: 'webkitAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                OAnimation: 'MSAnimationEnd',
                msAnimation: 'oanimationend',
                animation: 'animationend'
            };
            app.ctrl.data.transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd',
                msTransition: 'MSTransitionEnd',
                transition: 'transitionend'
            };
            app.ctrl.data.animationEndEventName = app.ctrl.data.animationEndEventsNames[Modernizr.prefixed('animation')];
            app.ctrl.data.transEndEventName = app.ctrl.data.transEndEventNames[Modernizr.prefixed('transition')];
            app.ctrl.data.support = {
                animations: Modernizr.cssanimations,
                transitions: Modernizr.csstransitions
            };

            // - set elements image backgrounds
            app.ctrl.setElementImgBg();

            // - inicializar blast en textos que van a ser animados
            app.ctrl.initBlast();

        });

    }()),

    settings: (function () {

        'use strict';

        var didScroll;

        // MAIN NAVIGATION TOGGLE
        $(document).on('click', '#trigger-main-nav', function (event) {

            var $this = $(this),
                $mainNav = $('#globalnav'),
                $mainNavMenu = $('#main-nav-menu'),
                $mainNavMenuItem = $('.main-nav__item--menu');

            $mainNavMenu.slideToggle({
                duration: 500,
                easing: 'easeInCubic'
            });
            $mainNav.toggleClass('main-nav--active');

        });

        // - on scroll, let the interval function know the user has scrolled
        $(window).scroll(function (event) {

            // - variable que determina si se esta haciendo scroll
            didScroll = true;

            if ($('[blast-wrapper]').length) {

                // - determinar si el elemento blast-wrapper entra en el area visible
                if (app.ctrl.elementIsVisible('[blast-wrapper]', 0.5)) {

                    app.ctrl.animateText();

                }

            }

        });

        // SETTINGS MAIN NAV
        (function () {

            var lastScrollTop = 0,
                // - Minimum of pixels lapsed after hide or show menu
                delta = 100,
                $body = $('body'),
                navbarHeight = $('#globalnav').outerHeight();

            // run hasScrolled() and reset didScroll status
            setInterval(function () {

                if (didScroll) {

                    hasScrolled();
                    didScroll = false;

                }

            }, 250);

            /**
            * Muestra u oculta la navegacion si se esta haciendo scroll
            */
            function hasScrolled () {

                var st = $(window).scrollTop();

                // Verify minimum of pixels lapsed after hide or show menu
                if (Math.abs(lastScrollTop - st) <= delta) {

                    return;

                }

                // if (!app.context.isMobile()) {

                //     return;

                // }

                // If current position > last position AND scrolled past navbar
                if (st > lastScrollTop && st > navbarHeight) {

                    // - scroll down hide
                    $body.addClass('main-nav-hide');

                } else if (st + $(window).height() < $(document).height()) {

                    if (!$body.hasClass('carta-is-open')) {

                        // - scroll up show
                        $body.removeClass('main-nav-hide');

                    }

                }

                lastScrollTop = st;

            }

        }());

        // Pagos en linea de payu
        $('[buy-item]').click(function () {

            var $this = $(this),
                $itemInput = $('[item-ref="' + $this.attr('buy-item') + '"]');

            $itemInput.trigger('click');

        });

        // Toggle pagos en linea
        $('#togglePagosNav').click(function () {

            var $pagosContent = $('#pagosContent');

            $pagosContent.slideToggle(300);

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

    },

    initBlast: function () {

        'use strict';

        var $blastTexts = $('[blast-text]');

        $blastTexts.blast({
            // delimiter: 'character',
            customClass: 'blast-element'
        });

    },

    elementIsVisible: function (element, viewFactor) {

        'use strict';

        var $e = element instanceof jQuery ? element : $(element),
            eTop = $e.offset().top + ($e.offset().top * viewFactor),
            eBottom = $e.offset().top + $e.outerHeight(),
            viewportBottom = $(window).scrollTop() + $(window).height();

        return ((viewportBottom > eTop) && (viewportBottom < eBottom));

    },

    animateText: function () {

        'use strict';

        var $e = $('.blast-element');

        $e.each(function (i, l) {

            var $this = $(this),
                delay = i / $e.length;

            $this.css('animation-delay', delay + 's').addClass('animated fadeInScale');

        });

    }

};

// INICIO
app.ctrl.inicio = {

    data: {
        flikrAuth: {
            // - la roulette api key
            api_key: 'd95dcce57dea2cd47bcb0c1b692783f9',
            // - la roulette user id
            user_id: '142065498@N08'
        },

        youTubeAuth: {
            // - la roulette api key
            api_key: 'AIzaSyCpEgQmSQC2TRDl73yy5Tn9U1ngZDFy9Ls',
            user_name: '',
            // - la roulette channel id
            channel_id: 'UC7CtU1sK_A8uboBCJLfzj2g'
        }
    },

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.inicio.settings();

            // - inicializar facebook-plugin al cargar el plugin de instagram
            $('.lightwidget-widget').load(function () {

                // var $fbPlugin = $('.fb-page');
                // - establecer alto del fb plugin
                // $fbPlugin.attr('data-height', $(this).height());
                // - volver a rendirizar el plugin para que adapte sus dimensiones
                // FB.XFBML.parse();
                $('#fb-plugin').append('<div class="fb-page" data-href="https://www.facebook.com/partylaroulette" data-height="' + $(this).height() + '" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/partylaroulette" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/partylaroulette">La Roulette</a></blockquote></div>');

            });

            // - listener para centrar el logo al cambiar el tamaño de la ventana
            $(window).resize(function () {

                app.ctrl.inicio.renderHeaderContent(false);

            });

            // - centrar el contenido del header cuando se carguen las imagenes por completo
            $("#main-header").waitForImages(function () {

                app.ctrl.inicio.renderHeaderContent(true);

            });

            if (app.context.isMobile()) {

                app.ctrl.inicio.defineHeaderBG(true);

            } else {

                app.ctrl.inicio.defineHeaderBG(false);

                // - ocultar la descripcion del servicio para que se cree efecto on hover
                $('.js-servicio__descripcion').addClass('isHide');

            }

            // OBTENCION DE DATOS DE LA API DE FLIKR
            app.ctrl.inicio.getFlikrAlbums(1, function (data, textStatus, xhr) {

                // - Done getFlikrAlbums

                var albums;

                if (data.stat === 'ok') {

                    albums = data.photosets.photoset;

                    $.each(albums, function (i, album) {

                        album.index = i;
                        app.ctrl.inicio.setAlbum(album);

                    });

                    // - inicializar la paginacion de la galeria
                    $("div.holder").jPages({
                        previous: 'anterior',
                        next: 'siguiente',
                        containerID: "albumsContainer",
                        perPage: 9,
                        minHeight: false,
                        animation: 'fadeInUpAlbum'
                    });

                } else {

                    $('.galeria .error-text').css('display', 'block');
                    console.error('Flikr Api: ' + data.message);

                }

            }, function (resp) {

                // - Fail getFlikrAlbums

                $('.galeria .error-text').css('display', 'block');
                console.error(resp);

            });

            // OBTENCION DE DATOS DE LA API DE YOUTBE
            app.ctrl.inicio.getYoutubeChannel(function (data, textStatus, xhr) {

                // - Done getYoutubeChannel

                var items = data.items;

                $.each(items, function (i, item) {

                    var playlistId = item.contentDetails.relatedPlaylists.uploads;

                    app.ctrl.inicio.getYoutubeChannelVideos(playlistId, function (data, textStatus, xhr) {

                        // - Done getYoutubeChannelVideos

                        var items = data.items,
                            $owlCarousel = $('.owl-carousel'),
                            html = '';

                        $.each(items, function (i, item) {

                            var videoObj = {
                                titulo: item.snippet.title,
                                videoId: item.snippet.resourceId.videoId
                            };

                            html += slm.tmpltParser(app.templates.youTubeVideoPlyr, videoObj);

                        });

                        $owlCarousel.append(html);

                        // - se inicializa owl-carousel
                        $owlCarousel.owlCarousel({
                            items: 1,
                            nav: true,
                            loop: true,
                            center: true,
                            mouseDrag: false,
                            touchDrag: false,
                            navText: ['<', '>'],
                            responsive: {
                                0: {
                                    dots: false
                                },
                                640: {
                                    stagePadding: 100,
                                    margin: 50
                                },
                                1024: {
                                    stagePadding: 250,
                                    margin: 100
                                },
                                1300: {
                                    stagePadding: 400,
                                    margin: 200
                                }
                            },
                            onInitialized: function () {

                                // - se inicializa plyr quien se encarga se setiar los videos
                                plyr.setup('.js-item-video');

                            }
                        });

                    }, function (resp) {

                        // - Fail getYoutubeChannelVideos

                        $('.videos-promocionales .error-text').css('display', 'block');
                        console.log(resp.responseJSON.error.message);

                    });

                });

            }, function (resp) {

                // - Fail getYoutubeChannel

                $('.videos-promocionales .error-text').css('display', 'block');
                console.error(resp.responseJSON.error.message);

            });

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
                windowIsSmall = Modernizr.mq('(max-width: 39.9375em)'),
                options = {
                    showHideOpacity: true,
                    galleryPIDs: true,
                    shareButtons: [
                        {id: 'facebook', label: 'Compartir en Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u={{image_url}}'},
                        {id: 'twitter', label: 'Tweet', url: 'https://twitter.com/intent/tweet?text={{text}}&url={{image_url}}'},
                        {id: 'pinterest', label: 'Pin it', url: 'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
                        {id: 'download', label: 'Descargar imagen', url: '{{raw_image_url}}', download: true}
                    ],
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

            // - ocultar navegacion principal
            $('body').addClass('main-nav-hide');

            app.ctrl.inicio.getFlikrAlbumsPhotos(id, function (data, textStatus, xhr) {

                // - Done getFlikrAlbumsPhotos

                var photos = data.photoset.photo;

                $.each(photos, function (i, photo) {

                    var photoObj = {
                        src: windowIsSmall ? photo.url_m : photo.url_h || photo.url_z,
                        w: Number(windowIsSmall ? photo.width_m : photo.width_h || photo.width_z),
                        h: Number(windowIsSmall ? photo.height_m : photo.height_h || photo.height_z),
                        author: data.ownername,
                        pid: 'img-' + i
                        // title: photo.title
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

                alert('Disculpa los inconvenientes, no fue posible obtener los recursos necesarios de este álbum, por favor intenta de nuevo.');

            });

        });

        // - handIcon click
        $(document).on('click', '#pointer-hand', function () {

            var toSectionTop = $('.servicios').offset().top;

            app.ctrl.animateText();

            $("html, body").animate({
                scrollTop: toSectionTop
            }, 5000, 'easeInOutQuart');

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
            extras: 'url_m',
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
            extras: 'url_m, url_z, url_h'
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

    renderHeaderContent: function (isLoading) {

        'use strict';

        var $container = $('#main-header'),
            $logo = $('#lr-logo'),
            $pointerHand = $('#pointer-hand'),
            containerW = $container.width(),
            containerH = $container.height(),
            logoW = $logo.width(),
            logoH = $logo.height();

        $logo.css({
            top: containerH / 2 - logoH / 1.5,
            left: containerW / 2 - logoW / 2
        });

        $pointerHand.css({
            top: $logo.position().top + (logoH + containerH / 7)
        });

        // - si se esta realizando la carga inicial de la pagina
        if (isLoading) {

            $logo.addClass('animated fadeIn').one(app.ctrl.data.animationEndEventName, function () {

                $pointerHand.animate({
                    opacity: 1
                }, 1000);

            });

        }

    },

    setAlbum: function (albumObj) {

        'use strict';

        var $albumsContainer = $('#albumsContainer'),
            dataObj = {},
            imgUrl = albumObj.primary_photo_extras.url_m;

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

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        var cartaCurrentIndex = 0,
            $cartaItems = $('.js-carta-img-container div'),
            cartaItemsCount = $cartaItems.length;

        // - scrollReveal settings
        (function () {

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.2
            });

        }());

        // - abrir carta cocteles
        $(document).on('click', '.js-carta-abrir', function () {

            var $cartaCocteles = $('.carta-cocteles');

            $cartaCocteles.fadeIn(500).css('display', 'flex');
            $('body').addClass('carta-is-open');

        });

        // - close carta cocteles
        $(document).on('click', '.js-carta-close', function () {

            var $cartaCocteles = $('.carta-cocteles');

            $cartaCocteles.fadeOut(500);
            $('body').removeClass('carta-is-open');

        });

        // - next carta cocteles
        $(document).on('click', '.js-carta-next', function () {

            cartaCurrentIndex += 1;

            if (cartaCurrentIndex > cartaItemsCount - 1) {

                cartaCurrentIndex = 0;

            }

            app.ctrl.homeParty.cycleCartaCocteles(cartaCurrentIndex);

        });

        // - prev carta cocteles
        $(document).on('click', '.js-carta-prev', function () {

            cartaCurrentIndex -= 1;

            if (cartaCurrentIndex < 0) {

                cartaCurrentIndex = cartaItemsCount - 1;

            }

            app.ctrl.homeParty.cycleCartaCocteles(cartaCurrentIndex);

        });

    },

    // HELPER SECTION FUNCTIONS
    cycleCartaCocteles: function (index) {

        'use strict';

        var item = $('.js-carta-img-container div').eq(index);

        $('.js-carta-img-container div').hide();
        item.css('display', 'inline-block');

    }
};

// PARTY COCKTAIL
app.ctrl.partyCocktail = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.partyCocktail.settings();

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - cocktail__half
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

    // HELPER SECTION FUNCTIONS
};

// OFFICE PARTY
app.ctrl.officeParty = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.officeParty.settings();

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '30px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.2
            });

        }());

    }

    // HELPER SECTION FUNCTIONS
};

// COCKTAIL BOX
app.ctrl.cocktailBox = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.cocktailBox.settings();

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.2
            });

        }());

    }

    // HELPER SECTION FUNCTIONS
};

app.ctrl.fratParty = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.fratParty.settings();

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.2
            });

        }());

    }

    // HELPER SECTION FUNCTIONS

};

app.ctrl.officeFestival = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.officeFestival.settings();

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.2
            });

        }());

    }

    // HELPER SECTION FUNCTIONS

};

app.ctrl.travelInfusion = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.travelInfusion.settings();

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.2
            });

        }());

    }

    // HELPER SECTION FUNCTIONS

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

        // - send contact form
        $('#sendForm').click(function (event) {

            event.preventDefault();

            var $nombre = $('#nombre'),
                $email = $('#correo'),
                $telefono = $('#telefono'),
                $mensaje = $('#mensaje'),
                $pais = $('#pais'),
                $returnMsn = $('#returnMsn'),
                validacionEmail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/,
                datos;

            $returnMsn.empty().removeClass('contact-form__return-msn--success contact-form__return-msn--error');

            if ($nombre.val() === '') {

                $nombre.addClass('animated shake');
                $nombre.one(app.ctrl.data.animationEndEventName, function () {

                    $(this).removeClass('animated shake');
                    $(this).focus();

                });

            } else if ($email.val() === '' || !validacionEmail.test($email.val())) {

                $email.addClass('animated shake');
                $email.one(app.ctrl.data.animationEndEventName, function () {

                    $(this).removeClass('animated shake');
                    $(this).focus();

                });

            } else if ($telefono.val() === '' || $telefono.val().length < 7) {

                $telefono.addClass('animated shake');
                $telefono.one(app.ctrl.data.animationEndEventName, function () {

                    $(this).removeClass('animated shake');
                    $(this).focus();

                });

            } else if ($pais.val() === '') {

                $pais.addClass('animated shake');
                $pais.one(app.ctrl.data.animationEndEventName, function () {

                    $(this).removeClass('animated shake');
                    $(this).focus();

                });

            } else if ($mensaje.val() === '') {

                $mensaje.addClass('animated shake');
                $mensaje.one(app.ctrl.data.animationEndEventName, function () {

                    $(this).removeClass('animated shake');
                    $(this).focus();

                });

            } else {

                $.ajax({
                    type: 'POST',
                    url: './contact-form.php',
                    data: {
                        nombre: $nombre.val(),
                        email: $email.val(),
                        telefono: $telefono.val(),
                        pais: $pais.val(),
                        mensaje: $mensaje.val()
                    },
                    success: function () {

                        $nombre.val('');
                        $email.val('');
                        $telefono.val('');
                        $mensaje.val('');
                        $returnMsn.text('Mensaje enviado con éxito!').addClass('contact-form__return-msn--success');

                    },
                    error: function () {

                        $returnMsn.text('Error al enviar el mensaje, por favor intenta de nuevo.').addClass('contact-form__return-msn--error');

                    }
                });

            }

        });

    }

    // HELPER SECTION FUNCTIONS
};

// FIESTON OLMECA
app.ctrl.olmeca = {

    init: function () {

        'use strict';

        $(document).on('ready', function () {

            // - llamar funcion que establece los settings de la seccion
            app.ctrl.olmeca.settings();

            // - identificar cuando la carga del contenido (img) del header se haya completado
            $('[wfi-content]').waitForImages(function () {

                $(this).find('header').addClass('loaded');
                $('.section-header__title').one(app.ctrl.data.animationEndEventName, function () {

                    $('.js-hand-icon').animate({
                        opacity: 1
                    }, 1000);

                });

            });

        });

    },

    settings: function () {

        'use strict';

        // - scrollReveal settings
        (function () {

            // - servicio-content-item
            sr.reveal('.sr-servicio-item', {
                distance: '50px',
                duration: 800,
                delay: 100,
                scale: 1,
                easing: 'ease-in-out',
                viewFactor: 0.2
            });

        }());

    }
};
