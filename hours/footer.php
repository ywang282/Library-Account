<footer>
<div class="container" style="background-color: #eee;"> 
  <div class="row" role="complementary" style="padding-bottom:20px;">
	<h2 class="sr-only">library Website footer information</h2>
      <div class="col-md-3 col-sm-3 col-xs-12" role="region" aria-label="contact us">





        <div class="dropdown" aria-labelledby="address">
          <a href="#" class="dropdown-toggle footer-link" data-toggle="dropdown" aria-label="contact us"><h3 class="footerheading">Contact Us:<b class="caret"></b></h3></a>
            <ul class="dropdown-menu">
              <li><a href="http://www.library.illinois.edu/people/phone.php" aria-labelledby="Employee Directory">Employee Directory</a></li>
              <li><a href="http://www.library.illinois.edu/secondary/contactUs.html" aria-labelledby="General contact information">General contact information</a></li>
              <li><a aria-label="Submit your feedback and suggestions" href="https://illinois.edu/fb/sec/1454867" aria-labelledby="Feedback and suggestions">Feedback and suggestions</a></li>
            </ul>

        </div>

        University Library<br>
        University of Illinois at Urbana-Champaign<br>
        1408 W. Gregory Dr. | Urbana, IL 61801<br>
        217.333.2290
        <br>
        <br>
          <a class="footer-link" href="https://www.facebook.com/universitylibrary">
          <span class="fa fa-facebook fa-lg" aria-label="facebook" style="border:1px solid #BCBCBC; padding:.2em; min-width:25px; margin-bottom:.2em"></span><small> Find us on Facebook</small></a>
          <br>
          <a class="footer-link" href="http://www.library.illinois.edu/friends/gift.html">
          <span class="fa fa-gift fa-lg" aria-label="make a gift" style="border:1px solid #BCBCBC; padding:.2em;"></span><small> Make a Gift</small></a>
      </div>

      <div class="col-md-3 col-sm-3 col-xs-12" role="region" aria-label="information for">
             
         <h3 class="footerheading">Information for:</h3>
             <div class="row">
                <div class="col-md-6"> <a class="footer-link" href="http://www.library.illinois.edu/ugl/">Undergraduates</a><br>
                  <a class="footer-link" href="http://www.library.illinois.edu/learn/users/gradstudents.html">Graduate Students</a><br>
                  <a class="footer-link" href="http://www.library.illinois.edu/learn/users/faculty.html">Faculty</a><br>
                  <a class="footer-link" href="http://www.library.illinois.edu/learn/users/alumni.html">Alumni</a><br>

                  <a class="footer-link" href="http://www.library.illinois.edu/learn/users/visitors.html">Visitors</a>
                </div>
                <div class="col-md-6">
                  <a class="footer-link" href="http://www.library.illinois.edu/learn/users/affiliates.html">Affiliated Organizations</a><br>
                  <a class="footer-link" href="http://www.library.illinois.edu/learn/users/usersdisabilities.html">Users with Disabilities</a><br>
                  <a class="footer-link" href="http://www.library.illinois.edu/distance/">Distance Learners</a><br>
                  <a class="footer-link" href="http://www.library.illinois.edu/staff/">Library Staff</a><br>
                </div>
            </div>
     </div>

      <div class="col-md-3 col-sm-3 col-xs-12" role="region" aria-label="feedback">
        <h3 class="footerheading">Feedback</h3>



        <a class="footer-link" href="https://illinois.edu/fb/sec/887006">Suggest an item for purchase</a><br>
        <a aria-label="Submit your feedback and suggestions" class="footer-link" href="https://illinois.edu/fb/sec/1454867">Give us feedback/suggestions</a>




      </div>

      <div class="col-md-3 col-sm-3 col-xs-12" id="vertical" role="region" aria-label="about the site">
        <h3 class="footerheading">About this site</h3>
        <a class="footer-link" href="http://www.vpaa.uillinois.edu/policies/web_privacy.cfm">Privacy</a><br />
      </div> 
    </div>

<div class="row" role="contentinfo" aria-label="university library copyright info" style="text-align:center">
<div id="copyright-footer">

    <p>© 2014 University of Illinois Board of Trustees</p>
  <br />
    <p><a href="http://www.library.illinois.edu/doc/" aria-label="Federal Depository Library Program website link"><img src="./assets/fdlp-emblem-logo-text-bw.png" alt="Federal Depository Library Program logo" /></a></p>
</div>
</div>
</div>
</footer>
</div>
<!--closing for container-->
</body>
<!--[if lt IE 9]>
    <script type="text/javascript" src="//cdn.jsdelivr.net/g/bootstrap@3.2,underscorejs@1.6,backbonejs@1.1,fancybox,xdate"></script>
  <![endif]-->
<script type="text/javascript" src="//cdn.jsdelivr.net/g/underscorejs@1.6,backbonejs@1.1,fancybox,xdate"></script>
<script type="text/javascript" src="./assets/js/jquery-ui.min.js"></script>

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







  


  <!-- <script type="text/javascript" src="./assets/js/hours.js"></script> -->
  <script type="text/javascript" src="./assets/js/hours_page.js"></script>
  <script type="text/javascript" src="./assets/js/get_time.php"></script>
  <script type="text/javascript" src="./assets/js/jquery.fracs-0.15.0.min.js"></script>
  <script type="text/javascript" src="./assets/js/banner_resize_map.js"></script>
  <script type="text/javascript" src="./assets/js/bootstrap-accessibility.js"></script>
    
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
 
    
    
    
