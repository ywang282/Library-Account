
var RECOMMENDATION = {
    LIST: 'http://minrva-dev.library.illinois.edu:8080/api/catalog/search?loc=uiu_undergrad&query=cat&type=all&page=2&format=Book'
};


function addRecommendedItem(recommended_item) {
    console.log("add recommended item");
    var table = document.getElementById("recommneded_table");
    var row = table.insertRow(1);

    // insert the image
    row.insertCell(0).innerHTML = "<div class=\"image-frame\"><img src=\"" + recommended_item.thumbnail + "\"" + "></div>";

    // check for empty title field and check for empty author field and then insert
    var bookInfoHTMLLeft = "<div class=\"book-info\">";
    var bookInfoHTMLRight = "</div>";

    var titleHTMl = "<h4>" + recommended_item.title + "</h4>";
    var authorHTML = "<h5>" + recommended_item.author + "</h5>";
    var showMoreButton = "<p class=\"button\">SHOW MORE LIKE THIS</p>";
    if (recommended_item.title.length === 0){
        titleHTMl = "<p>title information not available.</p>";
    }
    if (recommended_item.author.length === 0){
        authorHTML = "<p>author information not available.</p>";
    }

    row.insertCell(1).innerHTML = bookInfoHTMLLeft + titleHTMl + authorHTML + "<br>" + showMoreButton + bookInfoHTMLRight;


    // add the td for request item icon button
    row.insertCell(2).innerHTML = "<div><div class=\"request-icon\"><i class=\"fa fa-3x fa-inbox\" aria-hidden=\"true\"></i></div><p id=\"request-text\">Requested Item</p></div>";

}

function getRecommendedItems(vufindToken) {
    console.log("requesting recommended items");
    return $.ajax({
        url: RECOMMENDATION.LIST,
        type: 'GET',
        success: function(data) {
            console.log("requested items request succeeded");
            console.log(data);

            var size = data?data.length:0;
            if(size == 0) {
                $("#recommend_content").html("<h4> You have no recommended items</h4>");
            }
            else {
                // DEBUG
                // var recommendedItemTopic = blahblah;
                 var recommendedItemTopic = "DEBUG";
                var subTitle = "<h4> Items like " + recommendedItemTopic + "</h4>";
                var tableHTML = "<table id=\"recommneded_table\" class = \"clearfix:after\" border=\"1\">" +
                                    "<tr id=\"table-header\" style = \"background-color: #EDEDED\">" +
                                        "<td style = \"width:200px\"></td>" +
                                        "<td class=\"middle-td\" style = \"width: 550px\"></td>" +
                                        "<td style = \"width: 125px\"></td>" +
                                    "</tr>" +
                                "</table>";

                var recommend_contentHTML = subTitle + tableHTML;

                $("#recommend_content").html(recommend_contentHTML);//DEBUG
                for(var i = 0; i < size; i++) {
                    addRecommendedItem(data[i]);
                }
            }
        },
        error: function () {
            console.log("requested items request failed");
        }
    });
}

