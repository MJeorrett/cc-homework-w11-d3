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

    var idTd = htmlHelper.create( 'td', "_id" );
    idTd.style.display = "none";
    tHead.appendChild( idTd );

    columnHeadings.forEach( function( columnHeading ) {
      var td = htmlHelper.create( 'td', columnHeading );
      tHead.appendChild( td )
    });

    var albumsData = extractAlbumData( albums );
    tBody.innerHTML = "";

    albumsData.forEach( function( albumData ) {
      var tr = htmlHelper.create( 'tr' );
      var idTd = htmlHelper.create( 'td', albumData.id );
      idTd.style.display = "none";
      var nameTd = htmlHelper.create( 'td', albumData.name );
      var artistsTd = htmlHelper.create( 'td', albumData.artists );
      var imageTd = htmlHelper.create( 'td' );
      var image = htmlHelper.create( 'img' );
      image.src = albumData.imageUrls[0];
      image.classList.add( 'album-image' );
      image.onclick = handleImageClicked;

      imageTd.appendChild( image );

      tr.appendChild( idTd );
      tr.appendChild( nameTd );
      tr.appendChild( artistsTd );
      tr.appendChild( imageTd );
      tBody.appendChild( tr );
    });
  };

  var handleImageClicked = function( ev ) {
    var row = ev.target.parentNode.parentNode;
    var albumId = row.firstChild.innerText;
    console.log( "clicked album id:", albumId );
  };

  var extractAlbumData = function( albums ) {
    var albumsData = [];

    albums.forEach( function( album ) {
      var albumData = {}
      albumData.id = album.id;
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
