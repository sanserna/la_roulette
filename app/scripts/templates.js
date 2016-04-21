var app = app || {};
app.templates = {};

app.templates.youTubeVideoPlyr = '<div class="small-12 large-6 column">' +
    '   <div class="plyr">' +
    '       <div data-video-id="{{videoId}}" data-type="youtube"></div>' +
    '   </div>' +
    '</div>';

app.templates.album = '<div class="small-12 medium-6 large-4 column">' +
    '   <div id="{{id}}" class="js-album album" media-bg-img>' +
    '       <p class="album__title item-description">{{title}}</p>' +
    '       <p class="album__date item-description">{{creationYear}}</p>' +
    '   </div>' +
    '</div>';
