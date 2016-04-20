$( "#mobile-canvas-button, .mobile-overlay" ).on( "click", function() {
  if ( $( "#inner-wrap" ).hasClass( "off-canvas" ) === true ) {
    $( "#inner-wrap, .mobile-overlay" ).removeClass( "off-canvas" );
  } else if ( $( "#inner-wrap" ).hasClass( "off-canvas" ) === false ) {
    $( "#inner-wrap, .mobile-overlay" ).addClass( "off-canvas" );
  }
}); 

