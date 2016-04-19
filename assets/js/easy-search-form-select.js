//changing form action url on changes to select
$( '#dropdown' ).change(function(){
  //console.log("new selection = ",$( '#dropdown' ).val());
  if ( $( '#dropdown' ).val() == "gen" ) {
    //console.log("dropdown value = ",$( '#dropdown' ).val());
    $( '#search_everything' ).attr( 'action', 'http://search.grainger.uiuc.edu/discovery/splitsearch.asp');
    $( '#keyword' ).attr( 'name', 'searcharg' );
    $( '#search_everything .es-classic' ).prop( 'disabled', true);
    $( '#search_everything .es-bento' ).prop( 'disabled', false);
  } else {
    //console.log("dropdown value = ",$( '#dropdown' ).val());
    $( '#search_everything' ).attr( 'action', 'http://search.grainger.illinois.edu/searchaid2/saresultsug.asp');
    $( '#keyword' ).attr( 'name', 'keyword' );
    $( '#search_everything .es-bento' ).prop( 'disabled', true);
    $( '#search_everything .es-classic' ).prop( 'disabled', false);
  }
});