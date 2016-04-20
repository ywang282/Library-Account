    <div class="row lib-shared-header">
      <div class="col-sm-6 col-xs-10">
        <h1 class="sr-only">University Library, University of Illinois at Urbana-Champaign</h1>
        <div class="table-row">
          <div class="table-cell banner-image-imark-div">
            <a href="http://illinois.edu"><img class="img-responsive col-xs-12 banner-image-imark" alt="University of Illinois I-Mark" src="./shared_content/assets/images/imark.png"></a>
          </div>
          <div class="table-cell banner-table-spacer">
          </div>
          <div class="table-cell banner-image-library-div hidden-xs">
            <a href="http://www.library.illinois.edu"><img class="img-responsive col-xs-12 banner-image-library" alt="University Library, University of Illinois at Urbana-Champaign" src="./shared_content/assets/images/university_libraries_wordmark.png" ></a>
          </div>
          <div class="table-cell banner-image-library-div visible-xs">
            <a href="http://www.library.illinois.edu"><img class="img-responsive col-xs-12 banner-image-library banner-mobile-img" alt="Library" src="./shared_content/assets/images/library_wordmark.png" ></a>
          </div>
        </div>
      </div>
      <div class="col-xs-2 visible-xs">
        <a id="mobile-canvas-button" class="pull-right" href="javascript:void(0)">
          <i class="fa fa-bars"><span class="sr-only">Site Navigation Menu</span> </i>
        </a>
      </div>
      <div class="col-sm-6 col-xs-12 site-utilities">
        <form id="sitesearch" class="search form-inline pull-right hidden-xs" method="get" action="search.php" role="search">
          <div class="input-group">
            <input title="Search Library Webpages" id="searchQuery" class="form-control input-sm" maxlength="1000" size="25" name="q" placeholder="Search Library Webpages" type="text" aria-required="true">
            <label class="sr-only" for="searchQuery">Search Library Webpages</label>
            <div class="input-group-btn">
              <button type="submit" class="btn btn-default btn-sm" aria-label="submit">
                <span class="fa fa-search"></span>
              </button>
            </div>
          </div>
          <input name="hl" value="en" type="hidden" />
          <input name="safe" value="off" type="hidden" />
          <input name="filter" value="0" type="hidden" />
          <button id="myaccount" type = "button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-user" aria-labelledby="my account"></span> My Account</button>
        </form>
        <div id="site-header-controls-small" class="text-center hidden-md hidden-lg hidden-sm">
          <div class="btn-group btn-group-xs">
            <a type="button" class="btn btn-default site-header-control-group dark-button" href="https://vufind.carli.illinois.edu/vf-uiu/MyResearch/Home">My Account</a>
            <a class="btn btn-default site-header-control-group dark-button" role="widget" onclick="open('http://www.library.illinois.edu/iwonder/index.php', 'chat', 'width=400,height=440,resizable=yes');return false;" href="http://www.library.illinois.edu/iwonder" target="_blank">Ask A Librarian</a>
            <a class="btn btn-default site-header-control-group dark-button" data-toggle="collapse" data-parent="#site-header-controls-small" href="#site_search_collapse_mobile">Site Search</a>
          </div>
          <div id="site_search_collapse_mobile" class="collapse site-header-control-group">
            <form id="sitesearch" class="search form-inline" method="get" action="search.php" role="search">
              <div class="form-group">
                <input name="hl" value="en" type="hidden" />
                <input name="safe" value="off" type="hidden" />
                <input name="filter" value="0" type="hidden" />
                <input id="searchQuery_mobile" class="form-control input-sm" maxlength="1000" size="25" name="q" placeholder="Search Library Webpages" type="text"  aria-required="true" aria-label="Enter keywords to search library web pages.  Press enter to submit."/>
                <span class="sr-only">enter keywoards to search library web pages. Press enter to submit</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  