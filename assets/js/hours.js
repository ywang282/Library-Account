$(document).ready(function () {

	//global variable representing array for the days of the week for use in 
	//hoursTableWrite function. 
	weekDaysArray = orderWeekDays();	
	
	//ajax call for list of libraries information
	var libraryListArray = 	$.getJSON(window.location.origin + "/api/times_locations/librarieslist");
	
	//ajax call for list of all library hours information 
	var libraryHoursArray = $.getJSON(window.location.origin + "/api/times_locations/librarieshours");
	
	//when above ajax calls are complete, then following callback runs
	$.when(libraryListArray,libraryHoursArray).then(function(libraryData,hoursData){
		
		//function to build library <li>s  in library list
		printLibraries(libraryData);

		//function to print 7days hours in library list, and print open
		//status badge
		printHours(hoursData);
		
		//on page reload/refresh check to see if checkbox is
		//checked and hide all "closed" libraries in this case
		//based on .library-closed class
		filterOpenStatus();
		filterLibraryNames();
		preload(["./assets/ajax-loader.gif"]);
		
	});
});

function printLibraries(libraryListArray) {
	//sort list of libraries array by alpha
	var libraryData  = sortByKey(libraryListArray[0], 'library_name');

	//loop through library list array, print templates
	$.each(libraryData, function(key,objectData) {
		//if statement to exclude ask a librarian
		if ( objectData.library_number != 24) { 
			libtemp = printLibraryTemplate(key,objectData);
			$('#libs').append(libtemp);
		}
		
		//binding datepicker to datepicker class
		var hoursformid = "#hours-datepicker-form" + objectData.library_number;

		$(function() {
			$( ".hours-datepicker" ).datepicker({
				onSelect: function(){
					//console.log("hoursformid = " + hoursformid);
					$( hoursformid ).submit();
				}
			});
		}); 
		//bind submit event to datePickerFormSubmit function
		$( hoursformid ).submit(function ( event ) {
			datePickerFormSubmit(event, objectData.library_number);
		});

	});
}

function printHours(hoursData) {
	//loop through hours information array
	$.each(hoursData[0].timeAndLocArray, function(key,objectData) {
		//call function to print open close status, 
		//wrapped in if statement excluding ask a librarian
		if ( objectData.library_number != 24 ) {
			openStatusBadge(objectData.open, objectData.library_number);
		}
		//function to print hours table for each library 
		hoursTableWrite(objectData.sevenDays,objectData.library_number);
	});	
}

function hoursTableWrite(vHours,libNum,daysArray){
	//set days array variable 
	//if statement determines where function has been called from
	//if daysArray is undefined then is called from printHours
	//if daysArray is defined then is called from datePickerFormSubmit
	if ( daysArray === undefined ) {
		printDaysArray = weekDaysArray; 
	} else {
		printDaysArray = daysArray;
	}
	//open wrapper for hours table
	//var hrsTable = '<table><tbody><thead><tr class="sr-only"><th>Day</th><th>Hours</th></tr></thead>'
	//var hrsTable = '<table aria-labelledby="lib-hrs-table-desc' + libnum + '" aria-describedby="lib-hrs-table-desc' + libnum + '"><tbody><thead><tr class="sr-only"><th>Day</th><th>Hours</th></tr></thead>'
	var hrsTable = '<table aria-labelledby="lib-hrs-table-desc' + libNum + '" aria-describedby="lib-hrs-table-desc' + libNum + '"><tbody><thead><tr class="sr-only"><th>Day</th><th>Hours</th></tr></thead>';

	//loop through seven days hours info. 
	for ( i = 0; i < 7; i++) {
		//take each day's hours' string value and split into 
		//array to establish whether split hours exist. 
		var hoursArray = vHours[i].split(", ");
		hrsTable += '<tr><td><span class="hourshide">' + printDaysArray[i] + ':</span></td><td><span class="hourshide">';
		//var demilHrs = parseHours(vHours[i]);	
		if ( hoursArray.length > 1 ) {
			hrsTable += '<ul class="list-unstyled">';
			for ( q = 0; q < hoursArray.length; q++) {
				hrsTable += '<li>' + hoursArray[q] + '</li>';
			}
			hrsTable += '</ul></span></td>';					
		} else {
			hrsTable += hoursArray[0] + '</span></td></tr>';
		}
	}
	hrsTable += '</tbody></table>';
	$( '#hrsRowHolder' +  libNum ).html(hrsTable);
	$( ".hoursListClass tr:first-child span" ).removeClass("hourshide");
	$( ".hoursListClass tr:first-child" ).addClass("hours-highlight");
	
}
function orderWeekDays() {
	var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var dayOfWeek = getServerTime().getDay();
	//if statement to align days of week array with current day
	if (dayOfWeek !== 0) {
		for ( i = 0; i < dayOfWeek ; i++) {
			var firstDay =  weekDays[0];
			weekDays.shift();
			weekDays.push(firstDay);
		}
	}
	weekDays.shift();
	weekDays.unshift("TODAY");
	return weekDays;
}	
//attaches event handler to toggle between more and less hours and location info
$(document).ready(function () {
	$("#hours").on('click', '.expandHoursRowClass', function(e){
		if ($(e.target).hasClass("stopProp") === false) {
			var vhoursRowId = "#" + $(this).attr("aria-controls");
			$(vhoursRowId).toggleClass("hiddenContent showContent");
		}
	});
});

//sorts libraries by name by alpha for printing
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


//returns html for each library's row using underscore template . js library
function printLibraryTemplate(key,objectData) {
	var variables = {
		number: objectData.library_number,
		name: objectData.library_name, 
		description: objectData.description, 
		street: objectData.street_address, 
		city: objectData.city, 
		state: objectData.state, 
		zip: objectData.zip, 
		url: objectData.weblinks, 
		building: objectData.building_id, 
		map: objectData.map_url,
		tel: objectData.phone_number};
	var libtemp = _.template(
		'<li id="hours-list-item-library<%= number %>" class="list-group-item library-item-hrs">' +
			'<div class="row hiddenContent" id="hoursRow<%= number %>">' +
			  '<div class="col-md-6">' +
				'<div class="row">' +
				  '<div class="col-md-10">' +
					'<h4 class="list-group-item-heading library-name-hrs"><%= name %></h4>' +
				  '</div>' +
				  '<div class="col-md-2">' +
					'<span id="libOpen<%= number %>"></span>' +
				  '</div>' +
				'</div>' +
				'<div class="hourshide">' +
				'<p class="hidden-xs"><%= description %></p>' +
				'<% if (typeof(street) !== "undefined" && street.trim() !== "" ) { %><p class="list-group-item-text hourshide"><%= street %></p><% } %>' +
				'<% if (typeof(state) !== "undefined" && state.trim() !== "" && typeof(zip) !== "undefined" && zip.trim() !== "") { %><p class="list-group-item-text"><%= city %>, <%= state %> <%= zip %></p><% } %>' +
				'<% if (typeof(tel) !== "undefined" && tel.trim() !== "" ) { %><p class="list-group-item-text"><%= tel %></p><% } %>' +
				'<a class="stopProp" href="<%= url %>"><%= url %></a></p>' +
				'<br />' +
				'<% if (typeof(street) !== "undefined" && street.trim() !== "" ) { %><a id="carparking" aria-label="Parking for <%= name %>" class="fancybox btn btn-primary btn-sm stopProp" title="Parking near <%= name %>" href="./assets/parking/parking_<%= number %>.png">PARKING</a><% } %> ' +
				'<% if (typeof(street) !== "undefined" && street.trim() !== "" ) { %><a class="fancybox fancybox.iframe btn btn-primary btn-sm stopProp" aria-label="Map of <%= name %>" href="<%= map %>">MAP</a><% } %>' +
				'</div>' +
			  '</div>' +
			  '<div class="col-md-3 hoursListClass" id="libHourswfw<%= number %>">' +
				'<span id="lib-hrs-table-desc<%= number %>" class="sr-only">Open hours for <%= name %></span>' +
				'<span id="hoursListHeading<%= number %>" class="hourshide">' +
					'<h5>Next Seven Days</h5>' +
				'</span>' +
				'<div id="hrsRowHolder<%= number%>"></div>' +
						'<label class="hourshide" for="hours-datepicker-input<%= number %>">Search Hours:</label>' +
						'<div id="invalid-date-<%= number %>"></div>' +
						'<form class="form-inline datepicker-form" role="form" id="hours-datepicker-form<%= number%>" aria-label="Search open hours for <%= name%>">' +
							'<div class="hourshide form-group">' +
							'<div class="input-group">' +
								'<input id="hours-datepicker-input<%= number %>" class="form-control input-sm stopProp hours-datepicker" type="text" placeholder="MM/DD/YYYY" aria-label="Enter hours in MM/DD/YYYY format"></input>' +
								'<input type="hidden" value="<%= number %>" name="librarynumber"></input>' +
								'<span class="input-group-btn">' +
									'<button type="submit" class="stopProp btn btn-primary btn-sm">Search</button>' +
								'</span>' +
							'</div>' +
							'</div>' +
						'</form>' +
			  '</div>' +
			  '<div class="col-md-3">' +
				'<div class="row">' +
				  '<div class="col-md-12">' +
					'<button class="expandHoursRowClass btn btn-primary btn-sm pull-right hoursMoreButton" id="hoursShowMoreButton<%= number %>" aria-controls="hoursRow<%= number %>">' +
						'<span class="moreButtonSpan hoursMoreButtonExpand">Expand</span>' +
						'<span class="moreButtonSpan hoursMoreButtonContract">Collapse</span>' +
					'</button>' +
				  '</div>' +
				'</div>' +
				'<% if (typeof(building) !== "undefined" && building.trim() !== "" ) { %><a class="fancybox hourshide hidden-xs" href="./assets/buildings/full/building_<%= building %>.jpg">' +
				  '<img class="img-responsive stopProp buildingimage" src="./assets/buildings/display/building_<%= building %>.jpg" alt="<%= name %>" />' +
				'</a><% } %>' +
			  '</div>' +
			'</div>' +
		'</li>' , variables);
		return libtemp;
}

//parse open hours for day and compare to current time
//to produce open/close badge
function openStatusBadge(x,y) {
	if ( x === true ) {
		$("#libOpen" + y).html('<span class="badge-green badge open-closed-status">Open</span>');
		$("#hours-list-item-library" + y ).removeClass("library-closed").addClass( "library-open" );
	} else if ( x === false ){
		$("#libOpen" + y).html('<span class="badge-red badge open-closed-status">Closed</span>');
		$("#hours-list-item-library" + y ).removeClass("library-open").addClass( "library-closed" );
	}
}

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString) {
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

function datePickerFormSubmit(event, x) {
	//prevent default behavior of form
	event.preventDefault();
	
	//retrieve form input
	var hourstextformid = "hours-datepicker-input" + x;
	var hourstextformtext = document.getElementById(hourstextformid).value; 
	
	//validate date. return true if valid mm/dd/yyyy format, false if not
	vDateTest = isValidDate(hourstextformtext);
	if ( vDateTest === true ) {
		var d = new Date(hourstextformtext);
			//parse input for use in query string
			var vstartyear = d.getFullYear();
			var vstartmonth = d.getMonth() + 1;
			var vstartday = d.getDate();
			d.setDate(d.getDate() + 6);
			var vendyear = d.getFullYear();
			var vendmonth = d.getMonth() + 1;
			var vendday = d.getDate();
			var hoursQueryString = window.location.origin + "/api/times_locations/time_range?librarynumber=" + 
				x + "&startyear=" +
				vstartyear + "&startmonth=" +
				vstartmonth + "&startday=" +
				vstartday + "&endyear=" +
				vendyear + "&endmonth=" +
				vendmonth + "&endday=" + 
				vendday; 
			$.ajax({
				 url: hoursQueryString,
				 dataType: 'html',
				 success: function(data) {
					var hoursObj = JSON.parse(data);
					
				//begin sorting object properties 
					var myObj = hoursObj.hours,
						keys = [],
						k, i, len;
					for (k in myObj){
						if (myObj.hasOwnProperty(k)){
							keys.push(k);
							}
						}
					keys.sort();
					len = keys.length;
					var dpPropArray = [];
					var dpValueArray = [];								
					for (i = 0; i < len; i++){
						k = keys[i];
						dpPropArray.push(k);
						dpValueArray.push(myObj[k]);
					}
					var dpDatesArray = [];
					for (i = 0; i < dpPropArray.length; i++) {
						var vyear = dpPropArray[i].substr(0,4);
						var vmonth =  dpPropArray[i].substr(4,2);
						var vday = dpPropArray[i].substr(6,2);
						var dispDate = vmonth + "/" + vday + "/" + vyear;
						dpDatesArray.push(dispDate);
					}
				//end sorting object properties 

					//pass 
					dpValueArray = dateComparisonHours(d,hoursObj.no_hours_date,dpValueArray);
					//account for zero length strings, replace with "Closed"
					for ( i = 0; i < dpValueArray.length; i++ ) {
						if ( dpValueArray[i] === "" ) {
							dpValueArray[i] = "Closed";
						}
					}
					hoursTableWrite(dpValueArray,x,dpDatesArray);
					var vInvalidId = "#invalid-date-" + x;
					$( vInvalidId ).html("");
					var vhoursListHeading = "#hoursListHeading" + x;
					$( vhoursListHeading ).html("<h5>Hours from " + hourstextformtext + "</h5>");
				}
			});
	} else if ( vDateTest === false ) {
		var vInvalidId = "#invalid-date-" + x;
		$( vInvalidId ).html("<p><mark><strong>Enter date in MM/DD/YYYY format</strong></mark></p>");
	} else {
		console.log("Error in Datepicker Date format."); 
	}
}
function dateComparisonHours(requestedDate,endDate,dpValueArray) {
	if ( typeof endDate != "undefined" ) {
		endDate = endDate.substring(4,6) + "/" + endDate.substring(6,8) + "/" + endDate.substring(0,4);
		var endDateObj = new Date(endDate);
		requestedDate.setDate(requestedDate.getDate() - 6);
		if ( requestedDate >= endDateObj ) {
			dpValueArray = ["To be announced","To be announced","To be announced","To be announced","To be announced","To be announced","To be announced"];
			return dpValueArray;
		} else if ( (requestedDate.getTime() + (7 * 86400000 )) < endDateObj.getTime() ){
			return dpValueArray;
		} else {
			vdiff = 7 - dayDiff(requestedDate, endDateObj);
			for ( i = 0; i < vdiff; i++ ) {
				dpValueArray.pop();
			}
			for ( i = 0; i < vdiff; i++ ) {
				dpValueArray.push("To be announced");
			}
			return dpValueArray;
		}
	} else {
		return dpValueArray;
	}	
}
//calculate difference in days between two date objects
function dayDiff(d1, d2) {
	var t2 = d2.getTime();
	var t1 = d1.getTime();
	return parseInt((t2-t1)/(24*3600*1000));
}

//filter function for libraries and hours
$(document).ready(function () {
	$("#search-field").on("keyup click input", filterLibraryNames);
});

//filter button to show only open libraries onClick
//relies on .library-closed class being added to each 
//libraries li container by the openStatusBadge function 
//herewith
$(document).ready(function () {

	
	$( "#open-filter-checkbox" ).change(function() {
		//on button click, perform ajax call from library hours api to determine current
		//open/close status.  
		$( ".open-closed-status" ).replaceWith( '<img alt="loader image" src="./assets/ajax-loader.gif">' );
		$.getJSON(window.location.origin + "/api/times_locations/librarieshours", function( hoursData ) {
			//console.log("hoursData.timeAndLocArray " + hoursData.timeAndLocArray);
			$.each( hoursData.timeAndLocArray, function(key,objectData) {
				//call function to print open close status, 
				//wrapped in if statement excluding ask a librarian
				if ( objectData.library_number != 24 ) {
					openStatusBadge(objectData.open, objectData.library_number);
				}
				//function to print hours table for each library 
				//hoursTableWrite(objectData.sevenDays,objectData.library_number);
			});	
			//in success function of ajax call, hide libraries with library-closed class
			filterOpenStatus();
		});
	});
});

function filterOpenStatus() {
	if ($('#open-filter-checkbox').is(":checked"))
	{
		$( "#libs" ).addClass( "library-status-show" );
	} else {
		$( "#libs" ).removeClass( "library-status-show" );
	}	
}

function filterLibraryNames() {
	if (document.getElementById("search-field").value.length >= 0) {
		$(".library-item-hrs").removeClass( "library-item-hrs-hide" ).filter(function () {
		return $(this).find('.library-name-hrs').text().toLowerCase().indexOf($("#search-field").val().toLowerCase()) == -1;
		}).addClass( "library-item-hrs-hide");
	} else {
		$(".library-name-hrs").show();
	}
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}