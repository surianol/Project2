function iitRegistration(){
  console.log( "ready!" );
  console.log( "loading terms!" );
  $.getJSON( "json/terms.json", function ( termdata ) {
    var terms = [];
    $.each(termdata, function( key, val ) {
      console.log(key);
    });
  });
  console.log( "loading courses!" );
};

// Handle document ready
$( document ).ready( iitRegistration );