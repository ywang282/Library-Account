$( window ).load(function() {
	
	//Initialize the Backbone Model
	var Times = Backbone.Model.extend({
		url: window.location.origin + "/roomreserve/roomreserve/roomHours",
	});
		
	//Initialize the Backbone Collections
	var Buildings = Backbone.Collection.extend({
		url: window.location.origin + "/roomreserve/roomreserve/buildingsjsonp",
	});
	
	var Rooms = Backbone.Collection.extend({
        url: window.location.origin + "/roomreserve/roomreserve/roomsjsonp"
	});

	//build the objects, fetch the data, render on success
	buildings = new Buildings();
	rooms	  = new Rooms();
	
	selected_build = null;
	selected_room  = null;
	selected_date  = null;
	selected_time  = null;
	selected_dur   = null;
	
	buildings_container = $( "#buildc" );
	calendar_container  = $( "#calenc" );
	
	data_error = "Failed to load data, please refresh the page.";
	
	today = new XDate();
	today_str = today.toString("MM-dd-yyyy");
	
	buildings.fetch({
		dataType: "jsonp",
		success: function() {
			rooms.fetch({
				dataType: "jsonp",
				success: function() {
					buildingList.render();
				},
				error: function() {
					buildings_container.html( data_error );
				}
			});
		},
		error: function() {
			buildings_container.html( data_error );
		}
	});
	
	
				
	//Initialize the Viewing method
	var BuildingList = Backbone.View.extend({
		el: 'body',
		collection: buildings,
		events: {
			"click .buildinfo": "build",
			"click .room": "room",
			"click .box": "box",
			"click .button": "reserve"
		},
	build: function(event){
			

			if  ( selected_build != event.currentTarget.parentElement.id )
			{
				//remove any active states before sliding to another room
				$( "#" + selected_build ).removeClass("current");
				selected_build = null;

				//set the building id
				selected_build = event.currentTarget.parentElement.id;

				//get all the rooms in the building
				var jselect = $( "#" + selected_build + " .roomc" ).children(".room");
				
				//choose the first one by default
				selected_room = jselect[0].id;
				
				//set the calendar room name text
				$(".roomname").text( jselect.find(".rname")[0].innerHTML );

				//debug event output
				//console.log("Selected building: " + selected_build);
				//console.log("Selected room: " + selected_room);

				//remove text in the class "calcinitial"
				$(".calcinitial").empty()


				//Hide all the open buildings and toggle the one that was clicked
				$( ".roomc" ).slideUp();
				$( "#" + selected_build ).addClass("current");
				$( "#" + selected_build + " .roomc").slideDown();


				//select & highlight the first room
				$( ".room" ).removeClass( "selected" );
				$( "#" + selected_room ).addClass( "selected" );

				//fade in the calendar and get the times
				calendar_container.fadeIn();
				$( ".button" ).addClass( "disabled" );
				this.getTimes();

				
			}
			else
			{
				//we have clicked on an already open building:
				$( "#" + selected_build ).removeClass("current");
				selected_build = null;
				$( ".roomc" ).slideUp();
				calendar_container.fadeOut();

				//add text in the class "calcinitial"
				$(".calcinitial").append("Please choose a building location to the left to start the reservation process.")
			}
			
		},
		room: function(){
						
			var jselect = arguments[0].currentTarget
						
			//update the selected_room
			selected_room = jselect.id;
			//console.log("Selected room: " + selected_room);
			
			$(".roomname").text( $( jselect ).find( ".rname" ).text() );

			
			//select & highlight the chosen room
			$( ".room" ).removeClass( "selected" );
			$( "#" + selected_room ).addClass( "selected" );
			
			//get the times for the selected_room
			this.getTimes();
			$( ".button" ).addClass( "disabled" );
			
		},
		box: function(){
			
			//set the date according to whether or not the user clicked on a datebox
			if (arguments[0])
			{
				selected_date = arguments[0].currentTarget.attributes["date"].value;
				$( ".box" ).css( "background-color", "" );
				$( "#calenc " + "li.box[date=" + selected_date + "]" ).css("background-color", "#FF8F50");
				//console.log("Selected date: " + selected_date);

				//get the times for the selected_room
				this.getTimes();
			}
			else if ( !selected_date )		//selected_date is not set, so set it.
			{
				selected_date = today_str;
				$( ".box" ).css( "background-color", "" );
				$( "#calenc " + "li.box[date=" + selected_date + "]" ).css("background-color", "#FF8F50");
				//console.log("Selected date: " + selected_date);
			}
			
			$( ".button" ).addClass( "disabled" );

		},
		getTimes: function(){
			daycal_container = $( ".daycal" );
			
			daycal_container.html("").append("<div class='loading'></div>");
			
			var times = new Times();
			
			times.fetch({
				dataType: "json",
				data: {
					hours: .5,
					date: selected_date,
					roomid: selected_room,
					buildid: ""
				},
				success: function() {
					
					
					today = new XDate();					
					today_str = today.toString("MM-dd-yyyy");
										
					//If the room is available (not null response)
					if ( times.attributes[0] ) {
					
						if (selected_date == today_str)
						{
							//calculate the 0-47 format of the current hour
							var validstart = today.getHours() * 2;
							if (today.getMinutes() > 15) validstart++;
	
							//get the times that are available  after the current hour and calculate the length of the array
							var timelist   = _.rest( times.attributes[0].starttimes, _.sortedIndex(times.attributes[0].starttimes, validstart) );
						}
						else
						{
							timelist   = times.attributes[0].starttimes;
						}
						
						var length = timelist.length;
						
						//no hours are available
						if (!length)
						{
							buildingList.noTimes();
							return;
						}
						
						daycal_container.html("");
						
						//go through the array and print the valid 30 minute hour blocks
						for (var i = 0; i < length; i++)
						{
							//convert the 0-47 time into the XDate object for easy string conversion and add it to the calendar
							var comp = new XDate();
							comp.setHours( Math.floor(timelist[i] / 2) );
							comp.setMinutes( (timelist[i] % 2) * 30 );
						
							//add the 30 minute block to our table
							daycal_container.append("<tr><td time='" + comp.toString( "h:mmTT") + "' class='hour'>" + comp.toString( "h:mmTT") + " - " + comp.addMinutes(30).toString( "h:mmTT" ) + "</td></tr>");
															
							//insert divider if next hour is not a sequential time block
							if ( timelist[i+1] - timelist[i] > 1)
							{
								daycal_container.append("<tr></tr>");
							}  //null check
						}
						
						buildingList.selection();
											
					}
					else
					{
						buildingList.noTimes();
					}
				},
				error: function() {
					buildingList.noTimes();
				}
			});
		},
		noTimes: function() {
			daycal_container.html("").append("<p class='error'>Room Unavailable. Please make another selection.</p>");
		},
		selection: function() {
			
			var active = false;
			var count  = 0;
			
			$(".hour")
				.mousedown(function () {
					$(".hour").removeClass("highlighted");
					active = true;
					count = 1;
					
					var jselect = $(this);
					jselect.addClass("highlighted");

					selected_time = jselect.attr("time");
					//console.log( "Selected start time: " + selected_time );
					
						$(".button").removeClass("disabled");
					
					return false; // prevent text selection
				})
				.mousemove(function () {
					if ( active && count < 4 && $(this).parent().prev().children().hasClass("highlighted") && !$(this).hasClass("highlighted") )
					{
							$(this).addClass("highlighted");
							count++;
					}
				})
				.mouseup(function () {
					active = false;
					selected_dur = count/2;
					//console.log ( "Selected duration: " + selected_dur );
				});
				
		},
		reserve: function() {
			
			if ( $(".button").hasClass("disabled") )
			{
				$(".button").attr( "href", "about:blank" );
				return false;
			}

			var get_url = "http://uiuc.evanced.info/Dibs/Registration?SelectedTime=" + selected_dur + "&SelectedRoomSize=2,2&SelectedBuildingID=" + selected_build + "&SelectedRoomID=" + selected_room + "&SelectedSearchDate=" + selected_date + "&SelectedStartTime=" + selected_date + "%20" + selected_time 
			
			$(".button").attr( {"href": get_url, "target":"_blank"} );

		},
		render: function(element){

				//iterate through the buildings
				
				var length = buildings.length;
				for (var i = 0; i < length; i++) {

					//create an array of the rooms in the building
					var roomsInBuilding = rooms.where({buildingID: buildings.models[i].get("id")});
										
					var variables = {
						name: buildings.models[i].get("name"),
						desc: buildings.models[i].get("description"),
						picurl: buildings.models[i].get("picurl"),
						lat: buildings.models[i].get("lat"),
						lon: buildings.models[i].get("lon"),
						id: buildings.models[i].get("id"),
						numOfRooms: roomsInBuilding.length
					};
					
					//if !null, append the data into the main template 
					if (variables.picurl != "") {
						var template = _.template( $("#buildtemplate").html(), variables);
						buildings_container.append( template );

						//cache the rooms container div element
						var room_container = $( "#" + variables.id + " .roomc");
						
						//iterate through the rooms in each building
						for (var j = 0; j < variables.numOfRooms; j++)
						{
							var subvariables = {
								name: roomsInBuilding[j].get("name"),
								desc: roomsInBuilding[j].get("description"),
								picurl: roomsInBuilding[j].get("picurl"),
								mapurl: roomsInBuilding[j].get("mapurl"),
								roomID: roomsInBuilding[j].get("roomID"),
								buildID: roomsInBuilding[j].get("buildingID")
							};
							
							//append the roomtemplate inside the building rooms container
							var roomtemplate = _.template( $("#roomtemplate").html(), subvariables);
							room_container.append( roomtemplate );

							//if the mapURL was blank, remove the link
							if (subvariables.mapurl == "") {
								$( "a[id=" + subvariables.roomID + "]" ).remove();
							}			
						}

							//console.log("*building rendered succesfully*");
					}						
				}
				
							//insert the calendar
							var caltemplate = _.template( $("#caltemplate").html(), {} );
							calendar_container.append( caltemplate );	
							
							var comp = new XDate();
							
							for (var k = 0; k < 14; k++)
							{
								$( ".boxes" ).append( "<li date=\"" + comp.toString("MM-dd-yyyy") + "\" class=\"box\">" + comp.toString("ddd") + "<p>" + comp.getDate() + "</p></li>" );
								comp.addDays(1);
							}
							
							$( ".headerdate" ).html( today.toString("MMMM dd, yyyy - ") + comp.addDays(-1).toString("MMMM dd, yyyy") );

							this.box();

		}
	});
	
	//construct the object so we can render it later
	var buildingList = new BuildingList();
	
	$(".fancybox").fancybox({
		openEffect	: 'elastic',
    	closeEffect	: 'elastic',
		iframe: {
			preload: false
		},
		helpers : {
			overlay : {
				locked : false
			}
		}
	});
	
	

	$("a#carparking").fancybox({
	 afterLoad: function() {
        this.title = '<h5>' + this.title +'</h5>'
		+ '<small><img src="./assets/parking/yellowbox.jpg" alt="public parking legend"> Campus Public Parking <img src="./assets/parking/buildingbox.jpg" alt="campus building legend"> Buildings</small>' 
		+ '<a href="http://www.parking.illinois.edu/home" style="float:right">Additional Campus Parking Information.<span class="glyphicon glyphicon-new-window"</span></a>' 
		 ;	
    },
      helpers : {
        title: {
            type: 'inside',
            position: 'top'
        }
    },
 }); //fancybox
	

});

