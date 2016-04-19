//Google Analytics Events Link tracking Script
//Author: Robert Slater
//Written:11/12/2010
//Updated: 4/15/2011
//Add this script to you page and call the add_GA_Events() after any other functions that add html content
//to the page, and after the point you have called/initialized your Google Anlytics Code in the page.
//Call this using add_GA_Events("PageName"). PageName will be used as the Event and Category, pulling all clicks
//on the page into a single Event > Category, making it easy to see all the clicks for a period, and export
//the data for further manipulation. If you don't provde "PageName" the string "undefined" willl be used 
//for both the Google Event and Category names
//Updated: 4/15/2011
//Updated events tracking code to use new Google Universal analytics format:
//ga('send', 'event', 'category', 'action', 'opt_label', opt_value, {'nonInteraction': 1});
//instead of
//gaq.push(['_trackEvent', 'category', 'action', 'opt_label', opt_value, opt_noninteraction]);
//and cahnged refernce from window._gaq to window.ga

var GA_attempts = 0;
var pageURL;

function add_GA_Events(pagename)
	{
		//Run this code last, after the page and all the other scripts have added their dynamic content.
		//Make sure this code is called after the GA code has already been loaded,
		//by checking for the existence of the necessary _gaq window object.
		if (!window.ga) //Try up to five times to add the code
			{
			if(GA_attempts++ < 5)
				{
				setTimeout("add_GA_Events()", 250); //Try again in 0.25 seconds
				return 0; //But exit this function now
				}
			}
		else
			{
			pageURL = location.href;
			var anchorID = null;
			var visibleText = null;
			var URL = null;
			var containerIDs = [];
			var links = document.getElementsByTagName("a");
			var forms = document.getElementsByTagName("form");
			var formid = "";
			var formaction = "";
						
			if(typeof pagename == "undefined" || typeof pagename == "object" || pagename == "")
				{
				//add global variables reference to page name later
				var pagename = "undefined";
				}
			else
				{
				pagename = pagename.replace(/^\s+|\s+$/g, '');
				}
			
			for (var x=0;x<links.length;x++) //Loop over all the links on the page
				{
				containerIDs = [];

				if(links[x].href)
					{		
					visibleText = links[x].textContent || links[x].innerText || "error parsing link text";
					links[x].href ? URL = links[x].href: URL = null;
					//Traverse up the DOM until you find the up to three parent element with IDs, store them as containerID array				
					//check for the parent object recursively up to the body tag, until you find an element with an ID
					//parentScan.nodeType == 1 /*an html element */ parentScan.tagName.toLowerCase() /*to handle browser inconsistencies in elemnt name case*/
					var parentScan = links[x].parentNode; 
					while(parentScan.nodeType == 1 && parentScan.tagName.toLowerCase()!="body")
						{
						if(parentScan.id) 
							{
								if(containerIDs.push(parentScan.id) >= 3) //if we've gotten to the third ancestor
									{
									break;
									}
							}
							parentScan = parentScan.parentNode;
						}
					
					var functionx = (function(pagename, pageURL, containerIDs, anchorID, visibleText, URL) 
									   {
									   return function() 
									   		  {
											  //alert(pagename+"|"+pageURL+":  LINK|"+containerIDs[2]+"|"+containerIDs[1]+"|"+containerIDs[0]+"|"+visibleText+"|"+URL);
											  //_gaq.push(['_trackEvent', pagename, pageURL, "LINK|"+containerIDs[2]+"|"+containerIDs[1]+"|"+containerIDs[0]+"|"+visibleText+"|"+URL, 1]);
											  ga('send', 'event', pagename, pageURL, "LINK|"+containerIDs[2]+"|"+containerIDs[1]+"|"+containerIDs[0]+"|"+visibleText+"|"+URL);
											  }
									   })(pagename, pageURL, containerIDs, anchorID, visibleText, URL);
					GA_addEvent(links[x], 'click', functionx);							
					}
				}
				
			for (var x=0;x<forms.length;x++) //Loop over all the forms on the page
				{
				containerIDs = [];
				
				formid = forms[x].id || undefined;
				URL = forms[x].action;
					
				var functionx = (function(pagename, pageURL, containerIDs, formid, URL, forms, x) 
							   {
							   return function() 
									  {
									  var formText; 
									  for(y=0;y<forms[x].elements.length;y++) //Get the value of the first text type input in the form
										{
										if(forms[x].elements[y].type.toLowerCase() == "text")
											{
											formText = forms[x].elements[y].value;
											break;
											}
										}

									  //alert(pagename+"|"+pageURL+":  FORM|"+containerIDs[2]+"|"+containerIDs[1]+"|"+containerIDs[0]+"|"+formid+"|"+URL+"|"+formText);
									  //_gaq.push(['_trackEvent', pagename, pageURL, "FORM|"+containerIDs[2]+"|"+containerIDs[1]+"|"+containerIDs[0]+"|"+formid+"|"+URL+"|"+formText, 1]);
									  ga('send', 'event', pagename, pageURL, "FORM|"+containerIDs[2]+"|"+containerIDs[1]+"|"+containerIDs[0]+"|"+formid+"|"+URL+"|"+formText);
									  }
							   })(pagename, pageURL, containerIDs, formid, URL, forms, x);
				
					GA_addEvent(forms[x], 'submit', functionx);
					}
				}
	}

function GA_addEvent(objectx, eventx, functionx)
	{
	  if (objectx.addEventListener)
		{
		objectx.addEventListener(eventx, functionx, false);
		}
	  else if (objectx.attachEvent)
		{
		worked = objectx.attachEvent("on"+eventx, functionx);
		}
		else
		{
		//do nothing, better to leave existing onclick events in really old browsers than worry about analytics
		}
	}