var app = app || {};

app.services = {

    flikrAlbums: function (params) {

        'use strict';

        return $.ajax({
            url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList',
            data: {
                api_key: params.key,
                user_id: params.id,
                primary_photo_extras: params.extras,
                page: params.page,
                per_page: params.perPage,
                format: 'json'
            },
            jsonpCallback: 'jsonFlickrApi',
            dataType: 'JSONP'
        });

    },

    flikrAlbumsPhotos: function (params) {

        'use strict';

        return $.ajax({
            url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos',
            data: {
                api_key: params.key,
                user_id: params.id,
                photoset_id: params.photosetId,
                extras: params.extras,
                format: 'json'
            },
            jsonpCallback: 'jsonFlickrApi',
            dataType: 'JSONP'
        });

    },

    youtubeChannel: function (params) {

        'use strict';

        return $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/channels',
            data: {
                key: params.key,
                part: params.part,
                id: params.channelId
            },
            dataType: 'JSON'
        });

    },

    youtubeChannelVideos: function (params) {

        'use strict';

        return $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/playlistItems',
            data: {
                key: params.key,
                part: params.part,
                playlistId: params.playlistId,
                maxResults: params.maxResults
            }
        });

    }

};
