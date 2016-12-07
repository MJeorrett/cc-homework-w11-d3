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

    albumsModel.init( albums );
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
    console.log( "album clicked:", albumId )
  };

  window.onload = app;

})();
