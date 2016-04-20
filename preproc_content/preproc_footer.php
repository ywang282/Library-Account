  <footer role="contentinfo"> 
    <?php require_once( 'shared_footer.php' ); ?>
  </footer>
</div><!--closing for container-->
</div>
</div>
</body>
<script type="text/javascript" src="//cdn.jsdelivr.net/g/underscorejs@1.6,backbonejs@1.1,fancybox,xdate"></script>
    <!-- UNDERSCORE TEMPLATES -->
<script type="text/html" id="buildtemplate">

    <div class="build" id="<%= id %>">
      
      <div class="buildinfo">
        
                <div class="imagec">
          <img src="<%= picurl %>" width="90px" height="60px" class="hidden-xs" alt="<%= name %>"></img>
        </div>
                <span id="badge-and-button">Rooms: <span class="badge-green badge"><%= numOfRooms %></span> <a aria-controls="build_<%= id %>" class="btn btn-primary btn-xs">Select</a></span>

                
      
        <div class="buildtext">
          <h4><%= name %></h4>
          <div id="building-desc-text"><p class="hidden-xs"><%= desc %></p></div>
          <a aria-label="map of <%= name %>" class="fancybox fancybox.iframe btn btn-primary btn-xs" href="http://maps.google.com/maps?q=+(<%= name %>)&z=16&ll=<%= lat %>,<%= lon %>&output=embed&iwloc=near">Map</a>
        </div>
  
      </div>  
      
      <div id="build_<%= id %>" class="roomc">
        <hr />

      </div>
        
    </div>

</script>

<script type="text/html" id="roomtemplate">

  <div class="room" id="<%= roomID %>">
  
    
    <div class="roomtext">
	<a href="#calenc" class="cschedule btn btn-info visible-sm-block visible-xs-block">See the schedule</a>
      <h5 class="rname"><%= name %></h5>
      
              <img class="roompic hidden-xs" src="<%= picurl %>" alt="<%= desc %>" width="60px" height="40px"><p class="rdesc"><%= desc %><br><a class="fancybox fancybox.iframe btn btn-primary btn-xs hidden-xs" id="<%= roomID %>" href="<%= mapurl %>">Floor Plan</a></p>
      <p></p>       
    </div>
    
    
  <!--  <div class="greenbox">Reserve</div>-->
  </div>
        
</script>
  
<script type="text/html" id="caltemplate">

  <div class="calc">
  
    <h4 class="roomname"></h4>
    <hr class="divider">
  
    <p class="rhowto">Click to select a date (limited to a 2-week period):</p>

  
    <h6 class="headerdate"></h6>
    <ul class="boxes"></ul>
    
    <p class="rhowto">Drag downward to select a consecutive block of time (up to 2 hours):</p>
    
    <table class="daycal" rules="all">
    <tbody></tbody>
    </table>
    
    <br />
    <center><a class="btn btn-primary btn-xs button">Make Reservation  <i class="fa fa-external-link"></i></a></center>
  </div>
</script>
<script type="text/javascript" src="./assets/js/get_time.php"></script>
<script type="text/javascript" src="./assets/built/scripts.js?v=/* @echo QUERY_STR */"></script>
<script type="text/javascript">
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
  ga('create', 'UA-55158287-1', 'auto');
  ga('send', 'pageview');
  </script>
<script src="./assets/js/ga/gaelt.js" type="text/javascript"></script>
  <script type="text/javascript">
  add_GA_Events(window.location.host);
</script>