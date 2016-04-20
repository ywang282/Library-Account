
$(document).ready(function () {

	//scroll to hours and locations from top navbar
	$("#hoursloca").click(function(e){
		//if off canvas mobile nav menu is in view then remove class that makes it so
	  if ( $( "#inner-wrap" ).hasClass( "off-canvas" ) === true ) {
	    $( "#inner-wrap, .mobile-overlay" ).removeClass( "off-canvas" );
	  } 
		var href = $(this).attr("href");
		$(".accordion-tabs-minimal .is-active").removeClass("is-active");
		$("#hoursloc").addClass("is-active");
		$("#hoursloc + .tab-content-bourbon").addClass("is-open").show();
		$("#helpli + .tab-content-bourbon, #techli + .tab-content-bourbon, #roomresli + .tab-content-bourbon, #newsli + .tab-content-bourbon").removeClass("is-active").hide();
		$('html, body').animate({
			scrollTop: $(href).offset().top
		}, 1000);
	});
	//scroll to research guides from top navbar
	$("#resourceGuidesA").click(function(e){
		//if off canvas mobile nav menu is in view then remove class that makes it so
		if ( $( "#inner-wrap" ).hasClass( "off-canvas" ) === true ) {
	    $( "#inner-wrap, .mobile-overlay" ).removeClass( "off-canvas" );
	  } 
		var href = $(this).attr("href");
		$(".accordion-tabs-minimal .is-active").removeClass("is-active");
		$("#helpli").addClass("is-active");
		$("#helpli + .tab-content-bourbon").addClass("is-open").show();
		$("#hoursloc + .tab-content-bourbon, #techli + .tab-content-bourbon, #roomresli + .tab-content-bourbon, #newsli + .tab-content-bourbon").removeClass("is-open").hide();
		$('html, body').animate({
			scrollTop: $(href).offset().top
		}, 1000);
	});
});