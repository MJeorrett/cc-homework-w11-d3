(function() {

  var albums = null;

  var app = function(){
    var url = "https://api.spotify.com/v1/search?q=christmas&type=album";
    ajaxHelper.makeGetRequest( url, function( responseObject ) {
      albums = responseObject.albums.items;
      console.log(albums[0]);
      populateTable();
    });
  }

  var populateTable = function() {

    var table = document.querySelector( 'table' );
    var tHead = document.querySelector( 'thead' );
    var tBody = document.querySelector( 'tBody' );

    tHead.innerHTML = "";
    tBody.innerHTML = "";

    var albumsData = [];

    albums.forEach( function( album ) {
      var albumData = {}
      albumData.name = album.name;

      var artistNames = album.artists.map( function( artist ) {
        return artist.name;
      });
      albumData.artists = artistNames.reduce( function( output, artistName ) {
        return output + ", " + artistName;
      });

      albumsData.push( albumData );
    });

    console.log( albumsData );
  }

  window.onload = app;

})();
