//alert message
$(document).ready(function()
{
	$.ajax({
    type: "GET",
    url: "alertproxy.php",
    dataType: "xml",
	success: function(xml) {
		var items = xml.getElementsByTagName("item");
		if ( items.length == 0 && manualAlert == 0) {
			$( "#alert-div" ).remove();
		} else if ( items.length != 0 && manualAlert == 0 ){
			var alertString = '<div class="alert alert-danger" role="alert">';
			var itemDesc
			var itemTitle
			for ( var i = 0; i < items.length; i++ ) {
				if ( i == 4 ) break;
				if ( i == 3 && items.length > 3 ) {
					alertString += '<a class="show alert-item-title" href="http://www.library.illinois.edu/news/critical/"><strong>More news...</strong></a>'
				} else {
				if ( items[i].getElementsByTagName("title")[0].childNodes.length != 0 ) {
					itemTitle = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				}	
				if ( items[i].getElementsByTagName("description")[0].childNodes.length != 0 ) {
					itemDesc = items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
				}
				if ( items[i].getElementsByTagName("link")[0].childNodes.length != 0 ) {
					itemLink = items[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
				}
				alertString += '<a class="alert-item-line show" href="' + itemLink + '">'
				alertString += '<span class="fa fa-exclamation-circle" aria-hidden="true"> </span> <span class="sr-only">Warning:</span>'
				alertString += '<span class="alert-item-title"><strong>' + itemTitle + '</strong></span>, ';
				alertString += '<span class="alert-item-desc">' + itemDesc + '</span>' + '</a>'; 
				}
			}
			alertString += '</div>';
			$("#alert-div").html(alertString);
		}
	}
	});
})
