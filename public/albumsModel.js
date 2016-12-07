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
  }
};
