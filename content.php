  <!--container and row that are closed at end of dynamic.php to allow for proper aria landmark role=main application-->
  <div role="main" aria-label="main of the site including libray catalogs, ask a librarian, library hours and location, room servervation, news and event">
    <div class="row">
      <div class="col-md-9 mobile-col-negative-padding">
        <div id="easysearch-wrapper">
          <h2 class="sr-only">Easy Search(library catalog searh)</h2>
          <!-- Nav tabs -->
          <div class="hidden-xs" id="search-for-text">Search for</div>
          <ul class="nav nav-tabs " role="tablist" id="easysearch-tab-list" aria-label="easy search">
            <li class="active"><a class="easysearch_tab_font" href="#everythingTab" role="tab" data-toggle="tab" aria-label="everything">Everything</a></li>
            <li><a class="easysearch_tab_font" href="#booksTab" role="tab" data-toggle="tab" aria-label="books">Books</a></li>
            <li><a class="easysearch_tab_font" href="#articlesTab" role="tab" data-toggle="tab" aria-label="articles">Articles</a></li>
            <li><a class="easysearch_tab_font" href="#journalsTab" role="tab" data-toggle="tab" aria-label="journals">Journals</a></li>
            <li><a class="easysearch_tab_font" href="#mediaTab" role="tab" data-toggle="tab" aria-label="media">Media</a></li>
          </ul>
          <!-- Tab panes -->
          <div class="tab-content">
            <div class="tab-pane active" id="everythingTab">
              <!-- begin easy search content-->
                <div class="panel-body" id="search-panel-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <h3><span class="fa fa-search"></span> Easy Search</h3>
                    </div>
                    <div class="col-sm-6">  
                      <a class="pull-right hidden-xs" href="http://search.grainger.illinois.edu/searchaid2/searchassist.asp">Advanced Search</a>
                    </div>
                  </div>
                  <div class="row">
                    <form class="form-inline" role="form" method="get"
                        action="http://search.grainger.uiuc.edu/discovery/splitsearch.asp"
                        id="search_everything">
                        <label for="keyword" class="sr-only">Enter search terms</label>
                        <input type="text" class="form-control easy-search-text-input" id="keyword" 
                            name="searcharg" maxlength="255" placeholder="Enter search terms" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter search terms'"  aria-required="true"/>
                        <label for="dropdown" class="sr-only">Subject Selection</label>
                        <select id="dropdown" class="form-control easy-search-select" name="selection" aria-required="true" >
                          <option value="gen">Multi-Subject Resources</option>
                          <option value="news">Current News Sources</option>
                          <option value="ArHu">Arts &amp; Humanities</option>
                          <option value="Bus">Business</option>
                          <option value="Educ">Education</option>
                          <option value="EngRes">Engineering</option>
                          <option value="health">Health Sciences</option>
                          <option value="images">Images</option>
                          <option value="ias">International &amp; Area Studies</option>
                          <option value="LIS">Library &amp; Information Science</option>
                          <option value="lifesci">Life Sciences</option>
                          <option value="music">Music &amp; Performing Arts</option>
                          <option value="Physsci">Physical Sciences/Math</option>
                          <option value="Socsci">Social Sciences</option>                                
                        </select>
                        <input type="hidden" alt="submit" value="keyword" name="typeofsearch" class="es-bento">
                        <input type="hidden" alt="submit" value="direct" name="s2" >
                        <input type="hidden" alt="submit" value="gateway" name="project" >
                        <input type="hidden" alt="submit" value="opac" name="selection" class="es-classic" disabled>
                        <input type="hidden" alt="submit" value="web" name="selection" class="es-classic" disabled>
                        <label class="sr-only" for="easy-search-all-full">Search</label>
                        <input class="btn btn-primary" type="submit" alt="submit" value="Search" name="searchbutton">

                    </form>
                  </div>
                  <div class="row hidden-xs">
                    <div class="col-sm-6">
                      <p>Search by title, author, or keyword in a broad selection of sources. 
                        <a href="http://search.grainger.illinois.edu/searchaid2/what_searching.htm"> What am I searching?</a></p>
                    </div>
                  </div>
                </div>
              <!-- end easy search content-->
            </div>
            <div class="tab-pane" id="booksTab">
              <!--begin books panel-->
              <div class="panel-body" id="search-panel-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <h3><span class="fa fa-search"></span> Easy Search</h3>
                    </div>
                    <div class="col-sm-6">  
                      <a class="pull-right hidden-xs" href="http://search.grainger.illinois.edu/searchaid2/searchassist.asp">Advanced Search</a>
                    </div>
                  </div>
                <div class="row">
                  <form class="form-inline" id="search_books" action="http://search.grainger.illinois.edu/searchaid2/saresultsug.asp" method="get">
                    <label class="sr-only" for="Search_Argument">Enter Search Terms</label>
                    <input id="Search_Argument" class="form-control easy-search-text-input" type="text" placeholder="Enter search terms" maxlength="255" size="25" name="keyword" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter search terms'">
                    <input type="hidden" alt="submit" value="direct" name="s2">
                    <input type="hidden" alt="submit" value="gatewayopac" name="project">
                    <input type="hidden" alt="submit" value="opac" name="selection">
                    <label class="sr-only" for="booksSearch_Code">Book Search</label>
                    <select id="booksSearch_Code" class="form-control" name="booksSearch_Code" aria-required="true">
                      <option value="FT*">Keyword</option>
                      <option value="TALL">Title words</option>
                      <option value="NAME+">Author (last name, first)</option>
                    </select>
                    <input type="submit" class="btn btn-primary" alt="submit" value="Search" name="searchbutton">
                  </form>
    	          </div>
                <div class="row hidden-xs">
                  <div class="col-sm-6">
                    <p>Find books by keyword, title, or author. <a class="display-block" href="http://search.grainger.illinois.edu/searchaid2/what_searching.htm">What am I searching?</a></p>
                  </div>
                </div>
              </div>
             <!--end books panel-->
            </div>
            <div class="tab-pane" id="articlesTab">
              <!--begin articles panel-->
               <div class="panel-body" id="search-panel-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <h3><span class="fa fa-search"></span> Easy Search</h3>
                    </div>
                    <div class="col-sm-6">  
                      <a class="pull-right hidden-xs" href="http://search.grainger.illinois.edu/searchaid2/searchassist.asp">Advanced Search</a>
                    </div>
                  </div>
                <div class="row">   
                  <form id="search_articles" class="form-inline" action="http://search.grainger.illinois.edu/searchaid2/saresultsug.asp" method="get">
                    <label for="artclSubject" class="sr-only">article</label>
                    <input id="artclSubject" class="form-control easy-search-text-input"  type="text" placeholder="Enter article subject"  maxlength="255" size="25" name="keyword" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter article subject'">
                    <input type="hidden" alt="submit" value="direct" name="s2">
                    <input type="hidden" alt="submit" value="gatewayjnlarticle" name="project">
                      <label for="selection2" class="sr-only">choose the subject</label>
                      <select id="selection2" class="form-control"  name="selection" aria-required="true">
                        <option value="gen">Multi-Subject Resources</option>
                        <option value="news">Current News Sources</option>
                        <option value="ArHu">Arts &amp; Humanities</option>
                        <option value="Bus">Business</option>
                        <option value="Educ">Education</option>
                        <option value="EngRes">Engineering</option>
                        <option value="health">Health Sciences</option>
                        <option value="ias">International &amp; Area Studies</option>
                        <option value="LIS">Library &amp; Information Science</option>
                        <option value="lifesci">Life Sciences</option>
                        <option value="music">Music &amp; Performing Arts</option>
                        <option value="Physsci">Physical Sciences/Math</option>
                        <option value="Socsci">Social Sciences</option>
                      </select>
                      <input type="submit" class="btn btn-primary" alt="submit" value="Search" name="searchbutton">
                  </form>
                </div>
                <div class="row hidden-xs">
                  <div class="col-sm-6">
                    <p>Search for articles on a specific topic in magazines and journals. <a href="http://search.grainger.illinois.edu/searchaid2/what_searching.htm">What am I searching?</a></p>
                  </div>
                </div>
              </div>
              <!--begin articles panel-->
            </div>
            <!--begin journals panel-->
              <div class="tab-pane" id="journalsTab">
               <div class="panel-body" id="search-panel-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <h3><span class="fa fa-search"></span> Easy Search</h3>
                    </div>
                    <div class="col-sm-6">  
                      <a class="pull-right hidden-xs" href="http://search.grainger.illinois.edu/linker/">Advanced Search</a>
                    </div>
                  </div>
                <div class="row">   
                  <form class="form-inline"  id="search_journals" action="http://search.grainger.illinois.edu/linker/resolve88.asp" method="get">
                    <label for="jnltitle" class="sr-only">Journal Title</label>
                    <input id="jnltitle" class="form-control easy-search-text-input es-text-no-select"  type="text" placeholder="Enter journal title" maxlength="255" size="25" name="jnltitle" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter journal title'" aria-required="true">
                    <input type="hidden" alt="submit" value="gatewayjnltitle" name="project">
                    <input type="submit" class="btn btn-primary" alt="submit" value="Search" name="searchbutton">
                  </form>
                </div>
                <div class="row hidden-xs">
                  <div class="col-sm-6">
                   <p>Search for specific journal titles both in print and electronic format. <a href="http://search.grainger.illinois.edu/searchaid2/what_searching.htm">What am I searching?</a></p>
                  </div>
                </div>
               </div>
              </div>
            <!--end journals panel-->
            <!--begin media panel content-->
            <div class="tab-pane" id="mediaTab">
              <div class="panel-body" id="search-panel-body">
                  <div class="row">
                    <div class="col-sm-12">
                      <h3><span class="fa fa-search"></span> Easy Search</h3>
                    </div>
                  </div>
                <div class="row">
                  <form id="search_media" class="form-inline" action="http://vufind.carli.illinois.edu/vf-uiu/Search/Home?" method="get">
                    <label class="sr-only" for="vumedia">Media Search</label>
                    <input id="vuMedia" class="form-control easy-search-text-input es-text-no-select"  type="text" placeholder="Enter media title" maxlength="255" size="15" name="lookfor[]" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter media title'" aria-required="true">
                    <input type="hidden" name="type[]" value="all">
                    <input type="hidden" name="bool[]" value="AND">
                    <input type="hidden" name="specDate"value="YYYY">
                    <input type="hidden" name="version"value="any">
                    <input type="hidden" name="format[]"value="Music Recording">
                    <input type="hidden" name="format[]"value="Spoken Word Recording">
                    <input type="hidden" name="format[]"value="Audio CD">
                    <input type="hidden" name="format[]"value="Audiocassette">
                    <input type="hidden" name="format[]"value="Vinyl LP">
                    <input type="hidden" name="format[]"value="Movie">
                    <input type="hidden" name="format[]"value="Blu-ray">
                    <input type="hidden" name="format[]"value="DVD">
                    <input type="hidden" name="format[]"value="VHS">
                    <input type="hidden" name="format[]"value="Film">
                    <input type="hidden" name="format[]"value="Software / Computer File">
                    <input type="hidden" name="gPub"value="">
                    <input type="hidden" name="start_over"value="1">
                    <input type="hidden" name="submit"value="Find">
                    <input type="submit" class="btn btn-primary" alt="submit" value="Search" name="searchbutton">
                  </form>
                </div>
                <div class="row hidden-xs">
                  <div class="col-sm-6">
                    <p>Find CDs, DVDs, videocassettes, and games for computers and game consoles.</p>
                  </div>
                </div>
              </div>
            </div>
            <!--end media panel content-->              
          </div>
        </div> 
        <div id="resource-dropdowns" class="navbar-options" role="navigation" aria-label="links to the library catalog, course reserve, journal database, reference collection">
          <div class="container-fluid">
            <ul class="nav navbar-nav">
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="resource-dd-line">Catalogs<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                  <li><a href="http://vufind.carli.illinois.edu/vf-uiu/">U of I Catalog</a></li>
                  <li><a href="https://vufind.carli.illinois.edu/all/vf/">I-Share Catalog</a></li>
                  <li><a href="http://sfx.carli.illinois.edu/sfxuiu?rft.object_id=63750000000000325">WorldCat</a></li>
                  <li><a href="http://www.library.illinois.edu/catalog/">All Catalogs</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="resource-dd-line">Course Reserves<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                  <li><a href="https://i-share.carli.illinois.edu/uiu/cgi-bin/Pwebrecon.cgi?DB=local&PAGE=rbSearch">All Reserves (Print, Media, Electronic)</a></li>
                  <li><a href="https://reserves.library.illinois.edu/ares/ares.dll">Electronic Reserves Only</a></li>
                  <li role="presentation" class="divider"></li>
                  <li role="presentation" class="dropdown-header">Reserves Help</li>
                  <li><a href="http://www.library.illinois.edu/ugl/howdoi/reserves.html">Searching Reserves</a></li>
                  <li><a href="http://guides.library.illinois.edu/reserves">Guide to Electronic Reserves</a></li>
                  <li><a href="http://www.library.illinois.edu/cmservices/reserve.html">Placing Physical Materials on Reserve</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Databases <span class="resource-dd-wrap">and Journals<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                  <li><a href="http://search.grainger.uiuc.edu/linker/">Journal and Article Locator</a></li>
                  <li><a href="http://openurl.library.uiuc.edu/sfxlcl3/az">Online Journals &amp; Databases</a></li>
                  <li><a href="http://guides.library.illinois.edu/az.php">Databases by Subject</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Reference <span class="resource-dd-wrap">Resources<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                  <li><a href="http://www.library.illinois.edu/eref/">Online Reference Collection</a></li>
                  <li role="presentation" class="divider"></li>
                  <li><a href="http://www.library.illinois.edu/eref/formats/biography.html">Biography</a></li>
                  <li><a href="http://www.library.illinois.edu/eref/formats/bookreviews.html">Book Reviews</a></li>
                  <li><a href="http://www.library.illinois.edu/eref/formats/dictionaries.html">Dictionaries</a></li>
                  <li><a href="http://www.library.illinois.edu/eref/formats/encyclopedias.html ">Encyclopedias</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Specialized <span class="resource-dd-wrap">Resources<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                  <li><a href="https://ideals.illinois.edu/">IDEALS</a></li>
                  <li><a href="http://www.library.illinois.edu/eref/formats/dissertations.html">Dissertations</a></li>
                  <li><a href="http://www.library.illinois.edu/doc/">Government Documents</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>         
      </div>
    	<div class="col-md-3 light-area hidden-xs" id="ask-lib-col">
    		<div id="ask-lib-collapse">
    			<div class="ask-lib-box">
					<div id="chatbox" class="span6">
					  <iframe title="Ask A Librarian" id="iwonder_client" height="440px" width="100%" frameborder="0" src=""></iframe>
					  <script type="text/javascript">var iwonder_css="https://www-s2.library.illinois.edu/css/iwonder/homepage.css"</script>
					  <script src="http://chat.library.illinois.edu/widget/scripts/iwonder_client.js" type="text/javascript"></script>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
  