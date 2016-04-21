var app = app || {};
app.templates = {};

app.templates.youTubeVideoPlyr = '<div class="plyr">' +
    '   <div class="item-video" data-video-id="{{videoId}}" data-type="youtube"></div>' +
    '</div>';

app.templates.album = '<div class="small-12 medium-6 large-3 column">' +
    '   <div id="{{id}}" class="js-album album" media-bg-img>' +
    '       <p class="album__title item-description">{{title}}</p>' +
    '       <p class="album__date item-description">{{creationYear}}</p>' +
    '   </div>' +
    '</div>';
