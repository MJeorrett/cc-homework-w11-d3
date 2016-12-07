(function() {

  var albums = null;

  var app = function(){
    var url = "https://api.spotify.com/v1/search?q=christmas&type=album";
    ajaxHelper.makeGetRequest( url, function( responseObject ) {
      albums = responseObject.albums.items;
      console.log( albums );
    });
  }

  window.onload = app;

})();
