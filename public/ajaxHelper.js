var ajaxHelper = {
  makeGetRequest: function( url, callback ) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open( 'GET', url );
    httpRequest.onload = function() {
      if ( this.status == 200 ) {
        console.log( this.status );
        console.log( this.responseText );
        callback();
      } else {
        console.log( this.status );
      }
    };
    httpRequest.send();
  }
};
