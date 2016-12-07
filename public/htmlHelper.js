var htmlHelper = {
  create: function( tag, innerText ) {
    var element = document.createElement( tag );
    if (innerText) element.innerText = innerText;
    return element;
  }
}
