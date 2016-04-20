var RECOMMENDATION = {
    //LIST:  window.location.origin + '/api/connstart/checked_out/list',
    //RENEW:  window.location.origin + '/api/connstart/checked_out/list'
    LIST:'http://gateway-dev.library.illinois.edu/api/connstart/checked_out/list',
    RENEW:'http://gateway-dev.library.illinois.edu/api/connstart/checked_out/list',
};

//
//function addRecommendedItem(recommended_item) {
//    console.log("add recommended item");
//    var table = document.getElementById("recommneded_table");
//    var row = table.insertRow(1);
//    row.insertCell(0).innerHTML = recommended_item.title_field;
//    row.insertCell(1).innerHTML = recommended_item.author;
//    row.insertCell(2).innerHTML = recommended_item.image;
//}
//
//function getRecommendedItems(vufindToken) {
//    console.log("requesting recommended items");
//    return $.ajax({
//        url: RECOMMENDATION.LIST,
//        type: 'POST',
//        data: {
//            token: vufindToken
//        },
//        success: function(data) {
//            console.log("recommended items request succeeded");
//            console.log(data);
//
//            var size = data?data.length:0;
//            if(size == 0) {
//                $("#recommend_content").html("<h4> You have no recommended items </h4>");
//            }
//            else {
//                $("#recommend_content").html("<table id=\"recommneded_table\" class = \"clearfix:after\" border=\"1\"><tr id=\"table-header\" style = \"background-color: #EDEDED\"><td style = \"width:500px\"> Image </td><td style = \"width: 250px\"> Title </td><td style = \"width: 125px\">Author </td></tr></table>");//DEBUG
//                for(var i = 0; i < size; i++) {
//                    addRecommendedItem(data[i]);
//                }
//            }
//        },
//        error: function () {
//            console.log("recommended items request failed");
//        }
//    });
//}




function addRecommendedItem(recommended_item) {
    console.log("add recommended item");
    var table = document.getElementById("recommneded_table");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = recommended_item.image;
    row.insertCell(1).innerHTML = recommended_item.title;
    row.insertCell(2).innerHTML = recommended_item.author;
}

function getRecommendedItems(vufindToken) {
    console.log("requesting recommended items");

    var items = [
        {
            image: "https://www.google.com/search?q=uiuc+icon&espv=2&biw=1706&bih=700&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiZ45rLl57MAhVMsoMKHS35DZUQ_AUIBigB#imgrc=FVT7NV-SCii62M%3A",
            title: "title 1",
            author: "author 1"
        },
        {
            image: "https://www.google.com/search?q=uiuc+icon&espv=2&biw=1706&bih=700&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiZ45rLl57MAhVMsoMKHS35DZUQ_AUIBigB#imgrc=FVT7NV-SCii62M%3A",
            title: "title 2",
            author: "author 2"
        },
        {
            image: "https://www.google.com/search?q=uiuc+icon&espv=2&biw=1706&bih=700&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiZ45rLl57MAhVMsoMKHS35DZUQ_AUIBigB#imgrc=FVT7NV-SCii62M%3A",
            title: "title 3",
            author: "author 3"
        },
        {
            image: "https://www.google.com/search?q=uiuc+icon&espv=2&biw=1706&bih=700&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiZ45rLl57MAhVMsoMKHS35DZUQ_AUIBigB#imgrc=FVT7NV-SCii62M%3A",
            title: "title 4",
            author: "author 4"
        },
        {
            image: "https://www.google.com/search?q=uiuc+icon&espv=2&biw=1706&bih=700&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiZ45rLl57MAhVMsoMKHS35DZUQ_AUIBigB#imgrc=FVT7NV-SCii62M%3A",
            title: "title 5",
            author: "author 5"
        },
    ];

    console.log("recommended items request succeeded");
    console.log(items);

    var size = items?items.length:0;
    if(size == 0) {
        $("#recommend_content").html("<h4> You have no recommended items </h4>");
    }
    else {
        $("#recommend_content").html("<table id=\"recommneded_table\" class = \"clearfix:after\" border=\"1\"><tr id=\"table-header\" style = \"background-color: #EDEDED\"><td style = \"width:500px\"> Image </td><td style = \"width: 250px\"> Title </td><td style = \"width: 125px\">Author </td></tr></table>");//DEBUG
        for(var i = 0; i < size; i++) {
            addRecommendedItem(items[i]);
        }
    }
}

