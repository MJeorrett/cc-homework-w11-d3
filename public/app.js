(function() {
  var app = function(){
    var url = "https://api.spotify.com/v1/search?q=christmas&type=album";
    ajaxHelper.makeGetRequest( url, function( responseObject ) {
      console.log( responseObject );
    });
  }
  window.onload = app;
})();
