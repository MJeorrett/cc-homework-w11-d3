(function() {

  var app = function(){
    var url = "https://api.spotify.com/v1/search?q=christmas&type=album";
    ajaxHelper.makeGetRequest( url, function( responseObject ) {
      var albums = responseObject.albums.items;
      console.log("raw album:", albums[0]);
      albumsModel.init( albums );
      populateTable( albumsModel.albums );
    });
  };

  var populateTable = function( albumsData ) {

    var table = document.querySelector( 'table' );
    var tHead = document.querySelector( 'thead' );
    var tBody = document.querySelector( 'tBody' );

    tHead.innerHTML = "";

    var columnHeadings = [ "Name", "Artists" ];

    var idTd = htmlHelper.create( 'td', "_id" );
    idTd.style.display = "none";
    tHead.appendChild( idTd );

    columnHeadings.forEach( function( columnHeading ) {
      var td = htmlHelper.create( 'td', columnHeading );
      td.onclick = handleColumnHeaderClicked;
      td.classList.add( 'clickable-column-header' );
      tHead.appendChild( td )
    });

    var imagesTd = htmlHelper.create( 'td', "Image" );
    tHead.appendChild( imagesTd );
    var tracksTd = htmlHelper.create( 'td', "Tracks" );
    tHead.appendChild( tracksTd );

    var albumsData = albumsModel.albums;
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
      imageTd.appendChild( image );

      var tracksTd = htmlHelper.create( 'td' );

      albumsModel.getTracksForAlbum( albumData, function( tracksObject ) {
        console.log( "tracks for", albumData.id, " received:", tracksObject );
        var trackNames = tracksObject.items.map( function( track ) {
          return track.name;
        });
        var i = 1;
        var trackNamesString = trackNames.reduce( function( resultString, trackName ) {
          i++;
          return resultString + "\n" + i.toString() + ". " + trackName;
        });
        trackNamesString = "1. " + trackNamesString;
        tracksTd.innerText = trackNamesString;
      });

      tr.appendChild( idTd );
      tr.appendChild( nameTd );
      tr.appendChild( artistsTd );
      tr.appendChild( imageTd );
      tr.appendChild( tracksTd );
      tBody.appendChild( tr );
    });
  };

  var handleColumnHeaderClicked = function( ev ) {
    var columnName = ev.target.innerText;
    console.log( "coilumn heading clicked:", columnName );
    albumsModel.sortAlbumsBy( columnName );
    populateTable( albumsModel.albums );
  }

  window.onload = app;

})();
