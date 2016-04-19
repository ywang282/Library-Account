//alert message
function cleanUpFeedTitle(title)
{
 //Remove all bracketed content, this represents "extra" info in the feed not needed for brief list views
 title = title.replace(/\[.*?\]/g, ""); //Note that you need to use the non greedy wild card match, .*? insted of the default greedy match, .* or it will match the entire item, from the [event status] at the beginning of the title to the [event update time] at the end, yielding an empty title
 return title;
}

function isGoodItem(item)
{
//Don't use items of the [Closed] variety, possible values are [New], [Updated], [Edited] and [Closed] inside item title
if(item.getElementsByTagName("title")[0].childNodes[0].nodeValue.search(/\[CLOSED\]/i) == -1)
	{
	return true;
	}
else
	{
	return false;
	}
}

$(document).ready(function()
{
	$.ajax({
    type: "GET",
    url: "assets/alertproxy.php",
	cache : false,
    dataType: "xml",
	success: function(xml) {
		var items = xml.getElementsByTagName("item");

		if ( items.length != 0 && manualAlert == 0 )
			{
			var alertString = "";
			var pluralize = "";
			var outputItems = 0;
			var itemDesc;
			var itemTitle;
			for ( var i = 0; i < items.length; i++ ) 
				{
				if (outputItems >= 3 && items.length > 3) 
					{
						alertString += '<a class="show alert-item-title" href="https://status-dev.uillinois.edu/SystemStatus/jsp/current_events.jsp"><strong>Additional Critical Announcements...</strong></a>'
						break; //only provide 3 items at most
					}
				else if (isGoodItem(items[i]))
					{
						alertString += '<li>';
						if ( items[i].getElementsByTagName("title")[0].childNodes.length != 0 ) 
							{
							itemTitle = cleanUpFeedTitle(items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
							}	
						if ( items[i].getElementsByTagName("link")[0].childNodes.length != 0 )
							{
							itemLink = items[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
							}
						alertString += '<a class="alert-item-line show" href="' + itemLink + '">';
						alertString += '<span class="fa fa-exclamation-circle" aria-hidden="true"> </span> <span class="sr-only">Warning:</span>';
						alertString += '<span class="alert-item-title"><strong>' + itemTitle + '</strong></span>';
						alertString += '</li>';
						outputItems++;
				}
			}
			if (outputItems >= 3)
				{
				pluralize = "s";
				}
			if ( outputItems == 0 && manualAlert == 0) 
			{
			$( "#alert-div" ).remove();
			}
			alertString = '<div class="alert alert-danger" role="alert"><h2 class="sr-only">Critical Announcement'+pluralize+'</h2><ul class="list-unstyled">' + alertString;
			alertString += '</ul></div>';
			$("#alert-div").html(alertString);
		}
	}
	});
})
