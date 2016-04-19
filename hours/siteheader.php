<body>
 <!--[if lte IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->  
<div style="background-color:#fff; box-shadow: 0px 0px 10px 2px  #858585;" class="container">
<div class="row">
<header id="first-navbar" role="banner">
    <div class="container" aria-labelledby="bannerHeading"aria-label="university of illinois library banner">
    <h1 class="sr-only">University Library, University of Illinois at Urbana-Champaign</h1>
		<div class="row">
		<div class="col-md-12" id="header-full-width-column">
		<div class="row">
           <div class="col-sm-6 col-md-7">
                <div>
                    <img id="library-brand-img" alt="University of Illinois libary" class="img-responsive" src="assets/university_libraries_wordmark_with_imark_reverse.png" usemap="#bannermap">
                    <map name="bannermap">
                        <area id="imark-img-area" shape="rect" coords="0,0,36,47" href="http://illinois.edu/" alt="University of Illinois">
                        <area id="library-banner-area" shape="rect" coords="37,0,472,47" href="../index.php" alt="University Library, University of Illinois at Urbana-Champaign">
                    </map>
                </div>	
            </div>
			<div id="site-header-controls-medium"> 
				<div class="col-sm-6 col-md-5">
					<span class="pull-right" style="padding-top:5px;">
					<form id="sitesearch" class="search form-inline " method="get" action="search.php"  role="search" aria-label="Search Library Webpages" style="display:inline; padding-top:2px;">
						<div class="form-group">
							<input name="hl" value="en" type="hidden" />
							<input value="off" name="safe" type="hidden" />
							<input name="filter" value="0" type="hidden" />
							<div class="input-group">
								<input id="searchQuery" class="form-control input-sm" maxlength="1000" size="25" name="q" placeholder="Search Library Webpages" type="text" aria-required="true" aria-label="Enter key words to search library web pages.  Press enter to submit."/>
								<span class="input-group-btn">
								<button type="submit" class="btn btn-default btn-sm" alt="submit">
									<span class="fa fa-search"><span class="sr-only">Search</span></span>
								</button>
								</span>
							</div>
							<label class="sr-only" for="searchQuery">Search Library Webpages</label>							
						</div>
					</form>
					<a id="myaccount" class="btn btn-default btn-sm" href="https://vufind.carli.illinois.edu/vf-uiu/MyResearch/Home"><span class="fa fa-user" aria-labelledby="my account"></span> My Account</a>
					</span>
				</div>
			</div>		
		</div>
		<div id="site-header-controls-small" class="text-center">
			<div class="btn-group btn-group-xs">
				<a type="button" class="btn btn-default site-header-control-group " href="https://vufind.carli.illinois.edu/vf-uiu/MyResearch/Home">My Account</a>
				<a class="btn btn-default site-header-control-group " onclick="open('http://www.library.illinois.edu/iwonder/index.php', 'chat', 'width=400,height=440,resizable=yes');return false;" href="http://www.library.illinois.edu/iwonder" target="_blank">Ask A Librarian</a>
				<a class="btn btn-default site-header-control-group " data-toggle="collapse" data-parent="#site-header-controls-small" href="#site_search_collapse_mobile">Site Search</a>
			</div>
			<div id="site_search_collapse_mobile" class="collapse site-header-control-group">
				<form id="sitesearch" class="search form-inline" method="get" action="search.php" role="search">
					<div class="form-group">
						<input name="hl" value="en" type="hidden" />
						<input value="off" name="safe" type="hidden" />
						<input name="filter" value="0" type="hidden" />
						<input id="searchQuery_mobile" class="form-control input-sm" maxlength="1000" size="25" name="q" placeholder="Search Library Webpages" type="text"  aria-required="true" aria-label="Enter key words to search library web pages.  Press enter to submit."/>
						<label class="sr-only" for="searchQuery_mobile">Site Search</label>
					</div>
				</form>
			</div>
		</div>
		</div>
		</div>
    </div>
</header>