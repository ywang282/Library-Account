  //dynamic tab news and events content
  $( window ).load(function()
  {
  //ajax call for library rss FEATURED news feeds, full and summary.  
  //full for img and headline link, summary for description
    $.ajax({
      type: "GET",
      url: "libnewsfeatured.php",
      dataType: "html",
      success: parseFeatured
    });
      //parsing featured rss feeds, full and summary
      function parseFeatured(xml)
          {
          var imgLoc = xml.search("src=&quot;/cms/");
          var indQuo = xml.indexOf('&quot;', (imgLoc + 6));
          var subImg = xml.substring(imgLoc + 14, indQuo);
          var titleLoc = xml.search("img title=");
          var titQuo = xml.indexOf('&quot;', (titleLoc + 13));
          var subTit = xml.substring(titleLoc + 16, titQuo);
            $(xml).find("item").each(function()
            {
              //console.log($(this).find("guid").text());
              $("#news_feat_img").append('<img id="library_featured_news" alt="'+subTit+'" title="' + subTit + '" src="http://www.library.illinois.edu' + subImg + '"/>');
              $("#news_feat_cont").append('<span class="libnewsdate">' + $(this).find("pubDate").text().substr(0,5) + $(this).find("pubDate").text().substr(8,4) + $(this).find("pubDate").text().substr(5,3) + $(this).find("pubDate").text().substr(12,4) + "</span></br><a href='" + $(this).find("guid").text() + "'>" + $(this).find("title").text() + "</a></br>");
            });
              
              //call to summary featured rss for summary of article
              //nested within full function to preserve order
              $.ajax({
                  type: "GET",
                  url: "libnewsfeaturedsum.php",
                  dataType: "xml",
                  success: parseFeatSum
              });
              function parseFeatSum(xml)
              {
                //find the one item and iterate through to find the one description element. 
                $(xml).find("item").each(function() {
                  $("#news_feat_cont").append($(this).find("description").text() + '</li>');
                });
              }
          }
      //ajax call for library rss news feed
      $.ajax({
          type: "GET",
          url: "libnewsproxy.php?",
          dataType: "xml",
          success: parseXml
      });
      function parseXml(xml)
      {
        //find every item and iterate through
        $(xml).find("item").each(function(index)
        {
          $("#libnews").append('<li><span class="libnewsdate">' + $(this).find("pubDate").text().substr(0,5) + $(this).find("pubDate").text().substr(8,4) + $(this).find("pubDate").text().substr(5,3) + $(this).find("pubDate").text().substr(12,4) + "</span></br><a href='" + $(this).find("link").text() + "'>" + $(this).find("title").text() + "</a></br>" + $(this).find("description").text() + "</li><li role='presentation' class='divider'></li>");
          if ( index == 3 ){
              return false;
          }
        });
      }
  });