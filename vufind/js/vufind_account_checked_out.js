var CHECKED_OUT = {
    LIST:  window.location.origin + '/api/connstart/checked_out/list',
    RENEW:  window.location.origin + '/api/connstart/checked_out/list'
};


/**
 * @param checked_item                          Contains information on checked out item.
 * @param {string} checked_item.title_field     Title
 * @param {string} checked_item.status          Status
 * @param {string} checked_item.due_date        Due date
 * @param {string} checked_item.institution     Institution
 */
function addCheckedOutItem(checked_item) {
    console.log("add checked out item");
    var table = document.getElementById("checked_table");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = checked_item.title_field;
    row.insertCell(1).innerHTML = checked_item.status;
    row.insertCell(2).innerHTML = checked_item.due_date;
    row.insertCell(3).innerHTML = checked_item.institution;
}

function getCheckedOutItems(vufindToken) {
    console.log("requesting checked out items");
    return $.ajax({
        url: CHECKED_OUT.LIST,
        type: 'POST',
        data: {
            token: vufindToken
        },
        success: function(data) {
            console.log("checked out items request succeeded");
            console.log(data);

            var size = data?data.length:0;
            if(size == 0) {
                $("#checked_content").html("<h4> You have no checked out items </h4>");
            }
            else {
                $("#checked_content").html("<table id=\"checked_table\" class = \"clearfix:after\" border=\"1\"><tr id=\"table-header\" style = \"background-color: #EDEDED\"><td style = \"width:500px\"> Title </td><td style = \"width: 250px\"> Status </td><td style = \"width: 125px\"> Due Date </td><td style = \"width: 200px\"> Institution </td></tr></table>");
                for(var i = 0; i < size; i++) {
                    addCheckedOutItem(data[i]);
                }
            }
        },
        error: function () {
            console.log("checked out items request failed");
        }
    });
}