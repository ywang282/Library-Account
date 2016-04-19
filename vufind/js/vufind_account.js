$(document).ready(function() {

    // logout
    $("#logout").on("click", function() {
        console.log("logging out");
        Cookies.remove('vufindToken');
        window.parent.disablePopup();
        window.location.href = './vufind_login.html';
    });

    // close
    $("#x").on("click", function() {
        console.log("login window closed");
        window.parent.disablePopup();
    });

    // title
    // $("#account_login").text('My Account');

    // load vufind session
    var vufindToken = Cookies.get('vufindToken');
    if(vufindToken) {
        console.log("session token found");
        // load the page
        $.spin('true');
        $.when(
            getBlocks(vufindToken),
            getCheckedOutItems(vufindToken),
            getFavorites(vufindToken),
            getFines(vufindToken),
            getRequests(vufindToken)
        ).done(function() {
            console.log("Finished!")
            $.spin('false');
        }).fail(function() {
            console.log("Error downloaded data");
            Cookies.remove('vufindToken');
            $.spin('false');
            window.location.href = './vufind_login.html';
        });
    } else {
        console.log("session token not found");
        window.location.href = './vufind_login.html';
    }
});