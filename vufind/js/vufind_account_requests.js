var REQUESTS = {
    LIST: window.location.origin + '/api/connstart/requests/list'
};

/**
 * @param request                   Contains information on a request.
 * @param {string} request.title    Title.
 * @param {string} request.author   Author.
 * @param {string} request.bibId    BibId.
 */
function addRequest(request) {
    var table = document.getElementById("requests_table");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = request.title;
    row.insertCell(1).innerHTML = request.author;
    row.insertCell(2).innerHTML = request.bibId;
    row.insertCell(3).innerHTML = ('<input type="checkbox" class="checkbox1" value="' + request.bibId + '">');
}

function getRequests(vufindToken) {
    console.log("requesting requested items");
    return $.ajax({
        url: REQUESTS.LIST,
        type: 'POST',
        data: {
            token: vufindToken
        },
        success: function(data) {
            console.log("requested items request succeeded");
            console.log(data);

            var size = data?data.length:0;
            if(size == 0) {
                $("#requests_content").html("<h4> You have no requests </h4>");
            }
            else {
                $("#requests_content").html("<table id=\"requests_table\" class = \"clearfix:after\" border=\"1\"><tr id=\"table-header\" style = \"background-color: #EDEDED\"><td style = \"width:500px\"> Title </td><td style = \"width: 250px\"> Author </td><td style = \"width: 125px\"> Bib Id </td></table>");
                for(var i = 0; i < size; i++) {
                    addRequest(data[i]);
                }
            }
        },
        error: function () {
            console.log("requested items request failed");
        }
    });
}