var app = app || {};

app.context = {

    isAndroid: function () {

        return navigator.userAgent.match(/Android/i);

    },
    isBlackBerry: function () {

        return navigator.userAgent.match(/BlackBerry/i);

    },
    isIOS: function () {

        return navigator.userAgent.match(/iPhone|iPad|iPod/i);

    },
    isOpera: function () {

        return navigator.userAgent.match(/Opera Mini/i);

    },
    isWindows: function () {

        return navigator.userAgent.match(/IEMobile/i);

    },
    isMobile: function () {

        if (app.context.isAndroid() || app.context.isBlackBerry() || app.context.isIOS() || app.context.isOpera() || app.context.isWindows()) {

            return true;

        }

        return false;

    },
    isTablet: function () {

        var mq = Modernizr.mq;

        if (mq('(min-device-width : 550px) and (orientation: portrait)') || mq('(min-device-width : 800px) and (orientation: landscape)')) {

            return true;

        }

        return false;

    }
};
