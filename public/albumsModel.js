var albumsModel = {
  init: function( albums ) {
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
    this.albums = albumsData;
  },

  getAlbumWithId( id ) {
    return this.albums.find( function( album ) {
      return album.id === id;
    });
  },

  sortAlbumsBy( columnName ) {

    var key = columnName.toLowerCase();

    if ( this.lastSortColumn === key ) {
      reverse = -1;
      this.lastSortColumn = null;
    }
    else {
      reverse = 1;
      this.lastSortColumn = key;
    }

    this.albums.sort( function( albumA, albumB ) {
      var albumAVal = albumA[key];
      var albumBVal = albumB[key];
      console.log(albumAVal, ", ", albumBVal );

      if ( albumAVal < albumBVal ) return -1 * reverse;
      if ( albumAVal > albumBVal ) return 1 * reverse;
      return 0;
    });
  },

  getTracksForAlbum( album, callback ) {
    var url = "https://api.spotify.com/v1/albums/" + album.id.toString() + "/tracks";
    var tracks = null;
    ajaxHelper.makeGetRequest( url, function( response ) {
      callback( response );
    });
  }
};
