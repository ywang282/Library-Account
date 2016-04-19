<!--container and row that are closed at end of dynamic.php to allow for proper aria landmark role=main application-->

<!--mobile view for light blue box links starts here--> 

<div class="container" role="main" aria-label="library hours page">
	<div class="row">
		<div class="col-md-12">
			<h2>Library Hours <span id="hoursListHeading">by Date</span></h2>
			<hr class="orange-line">
			<div id="invalid-date"></div>
			<div id="hours-page-search-panel" class="panel panel-default">
				<div class="panel-body light-area">
					<div class="row" >
						<div class="col-md-6">
							<form id="hours-form-id" class="input-group form-inline">
								<div class="input-group">
								<input id="hours-datepicker" class="form-control input-sm" type="text" placeholder="MM/DD/YYYY" aria-label="Enter hours in MM/DD/YYYY format">
								</input>
								<span class="input-group-btn">
									<button type="submit" class="btn btn-primary btn-sm">Search</button>
								</span>
								</div>
								Show hours by:
								<label class="radio-inline">
									<input type="radio" name="day-week-radio" id="inlineRadio1" value="week" checked="checked"> week
								</label>
								<label class="radio-inline">
									<input type="radio" name="day-week-radio" id="inlineRadio2" value="day"> day
								</label>
							</form>
						</div>
						<div class="col-md-6">
							<a class="pull-right" href="javascript:if(window.print)window.print()"><button class="btn btn-primary btn-sm"><span id="hours-page-print-button" class="fa fa-print fa-2x"></span></button></a>

							<a class="vcenter" href="http://illinois.edu/calendar/list/557">University Academic Calendar <span class="fa fa-external-link"></span></a>
						</div>	
					</div>		
				</div>
			</div>			
		</div>			
	</div>
	<div  id="library-container" class="hoursListClass">
		<div id="loader-image" class="text-center">
			<img src="./assets/loader.gif" alt="loader image">
		</div>
	</div>
</div>

