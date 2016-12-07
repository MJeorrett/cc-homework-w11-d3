(function() {

  var app = function(){
    var url = "https://api.spotify.com/v1/search?q=christmas&type=album";
    ajaxHelper.makeGetRequest( url, function( responseObject ) {
      var albums = responseObject.albums.items;
      console.log("raw album:", albums[0]);
      populateTable( albums );
    });
  };

  var populateTable = function( albums ) {
    var table = document.querySelector( 'table' );
    var tHead = document.querySelector( 'thead' );
    var tBody = document.querySelector( 'tBody' );

    tHead.innerHTML = "";

    var columnHeadings = [ "Name", "Artists", "Images" ];
    columnHeadings.forEach( function( columnHeading ) {
      var td = htmlHelper.create( 'td', columnHeading );
      tHead.appendChild( td )
    });

    var albumsData = extractAlbumData( albums );
    tBody.innerHTML = "";

    albumsData.forEach( function( albumData ) {
      var tr = htmlHelper.create( 'tr' );
      var nameTd = htmlHelper.create( 'td', albumData.name );
      var artistsTd = htmlHelper.create( 'td', albumData.artists );
      var imageTd = htmlHelper.create( 'td' );
      var image = htmlHelper.create( 'img' );
      image.src = albumData.imageUrls[0];
      imageTd.appendChild( image );

      tr.appendChild( nameTd );
      tr.appendChild( artistsTd );
      tr.appendChild( imageTd );
      tBody.appendChild( tr );
    });
  };

  var extractAlbumData = function( albums ) {
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

      var imageUrls = album.images.map( function( image ) {
        return image.url;
      });
      albumData.imageUrls = imageUrls;

      albumsData.push( albumData );
    });

    console.log( "album data:", albumsData[0] );
    return albumsData;
  };

  window.onload = app;

})();
