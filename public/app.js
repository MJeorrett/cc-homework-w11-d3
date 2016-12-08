(function() {

  var playingTrackAudio = null;
  var playingTrackP = null;

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
        // console.log( "tracks for", albumData.id, " received:", tracksObject );
        var i = 1;
        tracksObject.items.forEach( function( track ) {
          var displayString = i.toString() + ". " + track.name;
          var p = htmlHelper.create( 'p', displayString );
          p.previewUrl = track.preview_url;
          p.classList.add( "track-listing" );
          p.onclick = handleTrackClicked;
          tracksTd.appendChild( p );
          i++;
        });
      });

      tr.appendChild( idTd );
      tr.appendChild( nameTd );
      tr.appendChild( artistsTd );
      tr.appendChild( imageTd );
      tr.appendChild( tracksTd );
      tBody.appendChild( tr );
    });
  };

  var handleTrackClicked = function( ev ) {
    var trackP = ev.target;
    var previewUrl = trackP.previewUrl;
    var trackName = trackP.innerText;
    console.log( "playing track", trackName );

    var stopTrackOnly = false;
    if ( trackP === playingTrackP ) stopTrackOnly = true;

    if ( playingTrackP ) {
      console.log( "stopping track", trackName );
      playingTrackAudio.src = "";
      playingTrackAudio = null;
      playingTrackP.id = "";
      playingTrackP = null;
    }
    if ( !stopTrackOnly ) {
      trackP.id = "playing-track";
      playingTrackAudio = new Audio( previewUrl );
      playingTrackAudio.play();
      playingTrackP = trackP;
    }
  }

  var handleColumnHeaderClicked = function( ev ) {
    var columnName = ev.target.innerText;
    console.log( "coilumn heading clicked:", columnName );
    albumsModel.sortAlbumsBy( columnName );
    populateTable( albumsModel.albums );
  }

  window.onload = app;

})();
