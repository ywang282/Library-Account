var FINES = {
    //LIST:  window.location.origin + '/api/connstart/fines/list'
     LIST:'http://gateway-dev.library.illinois.edu/api/connstart/fines/list'
};

/**
 * @param fine                      Contains information on a fine.
 * @param {string} fine.institution Institutionc.
 * @param {string} fine.dates       Dates.
 * @param {string} fine.titles      Titles.
 * @param {string} fine.types       Types.
 * @param {string} fine.amounts     Amount.
 */
function addFine(fine) {
    console.log("add fine");
    var table = document.getElementById("fines_table");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = fine.institution;
    row.insertCell(1).innerHTML = fine.dates;
    row.insertCell(2).innerHTML = fine.titles;
    row.insertCell(3).innerHTML = fine.types;
    row.insertCell(4).innerHTML = fine.amounts;
}

function getFines(vufindToken) {
    console.log("requesting fines");
    return $.ajax({
        url: FINES.LIST,
        type: 'POST',
        data: {
            token: vufindToken
        },
        success: function(data) {
            console.log("fines request succeeded");
            console.log(data);

            var size = data?data.length:0;
            if(size == 0) {
                $("#fines_content").html("<h4> You owe nothing. </h4>");
            }
            else {
                $("#fines_content").html("<table id=\"fines_table\" class = \"clearfix:after\" border=\"1\"><tr id=\"table-header\" style = \"background-color: #EDEDED\"><td style = \"width:150px\"> Institution </td><td style = \"width: 150px\"> Date </td><td style = \"width: 250px\"> Title </td><td style = \"width: 125px\"> Type </td><td style = \"width: 125px\"> Amount </td></table>");
                for(var i = 0; i < size; i++) {
                    addFine(data[i]);
                }
            }
        },
        error: function () {
            console.log("fines request failed");
        }
    });
}