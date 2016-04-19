var FAVORITES = {
    LIST:  window.location.origin + '/api/connstart/favorites/list',
    DELETE:  window.location.origin + '/api/connstart/favorites/delete'
};

/**
 * @param favorited_item                    Contains information on a favorited item.
 * @param {string} favorited_item.title     Favorited title.
 * @param {string} favorited_item.author    Favorited author.
 * @param {string} favorited_item.format    Favorited format.
 * @param {string} favorited_item.bibId     Favorited bib id.
 */
function addFavoritedItem(favorited_item) {
    console.log("add favorite");
    var table = document.getElementById("favs_table");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = favorited_item.title;
    row.insertCell(1).innerHTML = favorited_item.author;
    row.insertCell(2).innerHTML = favorited_item.format;
    // row.insertCell(3).innerHTML = favorited_item.bibId;
    // row.insertCell(4).innerHTML = ('<input type="checkbox" class="checkbox1" name="coolcheck" value="' + favorited_item.bibId + '">');
}

function getFavorites(vufindToken) {
    console.log("requesting favorites");
    return $.ajax({
        url: FAVORITES.LIST,
        type: 'POST',
        data: {
            token: vufindToken
        },
        success: function(data) {
            console.log("favorites request succeeded");

            var size = data?data.length:0;
            if(size == 0) {
                $("#favs_content").html("<h4> You have no favorites </h4>");
            }
            else {
                $("#favs_content").html("<table id=\"favs_table\" class = \"clearfix:after\" border=\"1\"><tr id=\"table-header\" style = \"background-color: #EDEDED\"><td style = \"width: 500px\"> Title </td><td style = \"width: 250px\"> Author </td><td style = \"width: 125px\"> Format </td></tr></table>");
                for(var i = 0; i < size; i++) {
                    addFavoritedItem(data[i]);
                }
            }
        },
        error: function () {
            console.log("favorites request failed");
        }
    });
}