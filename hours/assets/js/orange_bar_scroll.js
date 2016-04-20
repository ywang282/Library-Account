//scroll to orange bar if not showing 25% of panel
$("#info-tab-list a").click( function (e) {
	var fracs = $("#orange_bar_content_panel").fracs();
	if (fracs.visible <= .25) {
		//e.stopPropagation();
		var vhref = "#" + $(this).parent().attr("id");
		$( vhref ).slideDown(1000);
		
		$('html, body').animate({
			scrollTop: $(vhref).offset().top
		}, 1000);
		
	}
});
//scroll to hours and locations from top navbar
$("#hoursloca").click(function(e){
	var href = $(this).attr("href");
	$("#hoursloc").attr("class", "active");
	$("#hours").attr("class", "tab-pane active");
	$("#helpli, #techli, #roomresli, #newsli, #help, #tech, #roomres, #news").removeClass("active");
	$('html, body').animate({
		scrollTop: $(href).offset().top
	}, 1000);
});
//scroll to research guides from top navbar
$("#resourceGuidesA").click(function(e){
	var href = $(this).attr("href");
	$("#helpli").attr("class", "active");
	$("#help").attr("class", "tab-pane active");
	$("#hoursloc, #techli, #roomresli, #newsli, #hours, #tech, #roomres, #news").removeClass("active");
	$('html, body').animate({
		scrollTop: $(href).offset().top
	}, 1000);
});
//scroll to  mobile research guides from top navbar
$("#resourceGuidesAmobile").click(function(e){
	var href = $(this).attr("href");
	$("#helpli-mobile").attr("class", "active");
	$("#help").attr("class", "tab-pane active");
	$("#hoursloc-mobile, #techli-mobile, #roomresli-mobile, #newsli-mobile, #hours, #tech, #roomres, #news").removeClass("active");
	$('html, body').animate({
		scrollTop: $(href).offset().top
	}, 1000);
});