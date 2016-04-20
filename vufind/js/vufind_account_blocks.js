var BLOCKS = {
    //LIST:  window.location.origin + '/api/connstart/blocks/list'
    LIST:'http://gateway-dev.library.illinois.edu/api/connstart/blocks/list'
};

/**
 * @param block                         Contains information on block.
 * @param {string} block.institution    The institution that has blocked you.
 * @param {string} block.date_limits    The dates that you are blocked for.
 * @param {string} block.types          They type of block on your account.
 */
function addBlock(block) {
    console.log("add block");

    var table = document.getElementById("blocks_table");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = block.institution;
    row.insertCell(1).innerHTML = block.date_limits;
    row.insertCell(2).innerHTML = block.types;
}

function getBlocks(vufindToken) {
    console.log("requesting blocks");
    return $.ajax({
        url: BLOCKS.LIST,
        type: 'POST',
        data: {
            token: vufindToken
        },
        success: function (data) {
            console.log("blocks request succeeded");
            console.log(data);

            var size = data?data.length:0;
            if (size == 0) {
                $("#blocks_content").html("<h4> You have no blocks </h4>");
            }
            else {
                $("#blocks_content").html("<table id=\"blocks_table\" class = \"clearfix:after\" border=\"1\"><tr id=\"table-header\" style = \"background-color: #EDEDED\"><td style = \"width:250px\"> Institution </td><td style = \"width: 250px\"> Date </td><td style = \"width: 125px\"> Type </td></table>");
                for (var i = 0; i < size; i++) {
                    addBlock(data[i]);
                }
            }
        },
        error: function () {
            console.log("blocks request failed");
        }
    });
}