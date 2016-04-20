//create array for library numbers in global variable
library_id_array = [];

$(document).ready(function () {
	vtoday = getServerTime();
	var dd = vtoday.getDate();
	var mm = vtoday.getMonth()+1; 
	var yyyy = vtoday.getFullYear();
	if(dd<10) {
		dd='0'+dd
	} 
	if(mm<10) {
		mm='0'+mm
	} 
	vtoday = mm+'/'+dd+'/'+yyyy;
	$( "#hoursListHeading" ).html("from " + vtoday);
	$(function() {
		$( "#hours-datepicker" ).datepicker({
/* 			onSelect: function(){
				$( "#hours-form-id" ).submit();
			} */
		});
		//bind submit event to datePickerFormSubmit function
		$( "#hours-form-id" ).submit(function ( event ) {
			datePickerFormSubmit(event);
		});
	}); 
	
	//ajax call for list of libraries information
	var libraryListArray = 	$.getJSON(window.location.origin + "/api/times_locations/librarieslist");

	
	//ajax call for list of all library hours information 
	var libraryHoursArray = $.getJSON(window.location.origin + "/api/times_locations/librarieshours");

	//when above ajax calls are complete, then following callback runs
	$.when(libraryListArray,libraryHoursArray).then(function(libraryData,hoursData){
		
		//function to build library <li>s  in library list
		printLibraries_hours_page(libraryData);

		//function to print 7days hours in library list
		printHours_hours_page(hoursData);
		
		//hide loader image
		$( "#loader-image" ).hide();
		
	});
	$( "input:radio[name='day-week-radio']" ).change(
		function(){
			if ($(this).val() == "day") {
				$( "#library-container" ).addClass( "show-day" );
			} else {
				$( "#library-container" ).removeClass( "show-day" );
			}
		});
	
	//for page refresh, apply correct css class based on checked radio button for date range shown
	if ($(  "input:radio[name='day-week-radio']:checked" ).val() == "day" ) {
		$( "#library-container" ).addClass( "show-day" );
	} else if ( $(  "input:radio[name='day-week-radio']:checked" ).val() == "week" ){
		$( "#library-container" ).removeClass( "show-day" );
	}

});

function getHoursJSON(hoursQueryString,d,hourstextformtext){
	$.getJSON( hoursQueryString )
		.done(function(data, textStatus, jqXHR){
			var db_error;
			for ( i = 0; i < data.errorMessages.length; i++ ) {
				if ( data.errorMessages[i] == "Couldn't Connect to DB." ) {
					db_error = 1;
					break;
				}
				db_error = 0;
			}

			if ( db_error == 1 ) {
				getHoursJSON(hoursQueryString,d,hourstextformtext);
			} else {
				
		//begin sorting object properties 
			var myObj = data.hours,
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
			dpValueArray = dateComparisonHours(d,data.no_hours_date,dpValueArray);
			//account for zero length strings, replace with "Closed"
			for ( i = 0; i < dpValueArray.length; i++ ) {
				if ( dpValueArray[i] == "" ) {
					dpValueArray[i] = "Closed";
				}
			}

			var temp_date = new Date(hourstextformtext); 
			hoursTableWrite(dpValueArray,data.library_number,temp_date);
			var vInvalidId = "#invalid-date";
			$( vInvalidId ).html("");
			var vhoursListHeading = "#hoursListHeading";
			//replace "today" in h3 tag
			$( vhoursListHeading ).html("from " + hourstextformtext);
		}	
		})
		.fail(function(jqXHR, textStatus, errorThrown ){
			getHoursJSON(hoursQueryString,d,hourstextformtext);

		});	
}

function datePickerFormSubmit(event, x) {
	//prevent default behavior of form
	event.preventDefault();

	
	//retrieve form input
	var hourstextformtext = document.getElementById("hours-datepicker").value; 
	
	//validate date. return true if valid mm/dd/yyyy format, false if not
	vDateTest = isValidDate(hourstextformtext);
	if ( vDateTest == true ) {
	
		//remove previous printed hours
		$.each(library_id_array, function ( index, value) {
			var hours_id = "#hrsRowHolder" + value;
			$( hours_id ).html( '\
				<div class="text-center" style="display: block;">\
					<img alt="loader image" src="./assets/loader.gif">\
				</div>\
				');
		});		
			var d = new Date(hourstextformtext);
			var requestDate = d.toJSON(); 
			//parse input for use in query string
			var vstartyear = d.getFullYear();
			var vstartmonth = d.getMonth() + 1;
			var vstartday = d.getDate();
			d.setDate(d.getDate() + 6);
			var vendyear = d.getFullYear();
			var vendmonth = d.getMonth() + 1;
			var vendday = d.getDate();
			url_array = [];
			response_array = [];
			$.each(library_id_array, function ( index, value ) {
				var hoursQueryString = window.location.origin + "/api/times_locations/time_range?librarynumber=" + 
					value + "&startyear=" +
					vstartyear + "&startmonth=" +
					vstartmonth + "&startday=" +
					vstartday + "&endyear=" +
					vendyear + "&endmonth=" +
					vendmonth + "&endday=" + 
					vendday; 		
			getHoursJSON(hoursQueryString,requestDate,hourstextformtext);
			});

	} else if ( vDateTest == false ) {
		var vInvalidId = "#invalid-date";
		$( vInvalidId ).html("<p><mark><strong>Enter date in MM/DD/YYYY format</strong></mark></p>");
	} else {
		console.log("Error in Datepicker Date format."); 
	}
}

//function receives array of hours for display, library number, 
function hoursTableWrite(vHours,libNum,start_day_obj){

	week_days_array = orderWeekDays(start_day_obj);
	dates_array = create_dates_array(start_day_obj);
	
	//open wrapper for hours table
	var hrsTable = '<table aria-labelledby="lib-hrs-table-desc' + 
		libNum + '" aria-describedby="lib-hrs-table-desc' + 
		libNum + '"><thead><tr class="sr-only"><th>Date</th><th>Day</th><th>Hours</th></tr></thead><tbody>'

	//loop through seven days hours info. 
	for ( i = 0; i < 7; i++) {
		//take each day's hours' string value and split into 
		//array to establish whether split hours exist. 
		var hoursArray = vHours[i].split(", ");
		hrsTable += '<tr class="hourshide"><td>' + dates_array[i] + '&nbsp;</td><td>  ' + week_days_array[i] + ':&nbsp;</td><td>';

		if ( hoursArray.length > 1 ) {
			hrsTable += '<ul class="list-unstyled">';
			for ( q = 0; q < hoursArray.length; q++) {
				hrsTable += '<li>' + hoursArray[q] + '</li>';
			}
			hrsTable += '</ul></td></tr>';					
		} else {
			hrsTable += hoursArray[0] + '</td></tr>';
		}
	}
	hrsTable += '</tbody></table>';
	$( '#hrsRowHolder' +  libNum ).html(hrsTable);
	$( "tr:first-child" ).removeClass("hourshide");

}

function printHours_hours_page(hoursData) {

	//loop through hours information array
	$.each(hoursData[0].timeAndLocArray, function(key,objectData) {
		var today_date_obj = new Date(getServerTime());
		//function to print hours table for each library 
		hoursTableWrite(objectData.sevenDays,objectData.library_number,today_date_obj);
	});	
}

function printLibraries_hours_page(libraryListArray) {
	//sort list of libraries array by alpha
	var libraryData  = sortByKey(libraryListArray[0], 'library_name');
	//loop through library list array, print templates
	$.each(libraryData, function(key,objectData) {
		//if statement to exclude ask a librarian
		if ( objectData.library_number != 24) { 
			libtemp = printLibraryTemplate(key,objectData);
			$('#library-container').append(libtemp);
			//create array of library ids for datepicker ajax requests
			library_id_array.push(objectData.library_number); 
		}
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
	var libtemp = _.template('\
		<div class="row">\
			<div class="col-md-12">\
				<h4><%= name %></h4>\
				<div id="hrsRowHolder<%= number %>" class="hours-table">\
				</div>\
			</div>\
		</div>\
		<hr>\
		\
		', variables);

		return libtemp;
}


//sorts libraries by name by alpha for printing
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

	//create array of mm/dd/yyyy values to pass to hourstablewrite function
function create_dates_array(date_obj) {
	
	var display_date_array = [];
	//var date_obj = new Date(hourstextformtext); 
	for ( i = 0; i < 7; i++ ) {
		display_date_array.push((date_obj.getMonth() + 1) + '/' + date_obj.getDate() + '/' +  date_obj.getFullYear());
		date_obj.setDate(date_obj.getDate() + 1);
	}
	return display_date_array
}
//pass to function date object of first day of range
//to create weekdays array for
function orderWeekDays(date_obj) {
	var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var dayOfWeek = date_obj.getDay();
	//if statement to align days of week array with current day
	if (dayOfWeek != 0) {
		for ( i = 0; i < dayOfWeek ; i++) {
			var firstDay =  weekDays[0];
			weekDays.shift()
			weekDays.push(firstDay)
		}
	};
	//weekDays.shift();
	//weekDays.unshift("TODAY");
	return weekDays;
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
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

//test whether end of entered days value is present and if days overlap.  
function dateComparisonHours(requestedDate,endDate,dpValueArray) {
	var requestedDateObject = new Date(requestedDate);
	if ( typeof endDate != "undefined" ) {
		endDate = endDate.substring(4,6) + "/" + endDate.substring(6,8) + "/" + endDate.substring(0,4);
		var endDateObj = new Date(endDate);
		//requestedDateObject.setDate(requestedDateObject.getDate() - 6);
		if ( requestedDateObject >= endDateObj ) {
			dpValueArray = ["To be announced","To be announced","To be announced","To be announced","To be announced","To be announced","To be announced"];
			return dpValueArray;
		} else if ( (requestedDateObject.getTime() + (7 * 86400000 )) < endDateObj.getTime() ){
			return dpValueArray;
		} else {
			vdiff = 7 - dayDiff(requestedDateObject, endDateObj);
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
	return parseInt((t2-t1)/(24*3600*1000))
}