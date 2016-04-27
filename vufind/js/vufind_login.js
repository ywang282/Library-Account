var CONN = {
    //LOGIN:  window.location.origin + '/api/connstart/login'
    LOGIN:'http://gateway-dev.library.illinois.edu/api/connstart/login'
};

$(document).ready(function() {

    // load vufind session
    var token = Cookies.get('vufindToken');
    if(token) {
        console.log("session token found");
        // window.location.href = './vufind_account.html';
    } else {
        console.log("session token not found");
    }

    // close
    $("#x").on("click", function(event){
        event.preventDefault();
        console.log("login window closed");
        window.parent.disablePopup();
    });

    // login
    $("#login_button").on("click", function(event) {
        event.preventDefault();
        console.log("requesting login");

        var user = $("#username").val();
        var pass = $("#password").val();
        Cookies.remove('vufindToken');

        $.ajax({
            url: CONN.LOGIN,
            type: 'POST',
            data: {
                username: user,
                password: pass
            },
            success: function(data) {
                console.log(data);
                console.log("login request succeeded");
                if(data && data.success == "true") {
                    console.log('login succeeded')
                    Cookies.set('vufindToken', data.message, { expires: 3 });
                    window.location.href = './vufind_account.html';
                }
                else {
                    console.log("login request failed");
                    var errMsg = "Invalid Login. Please try again."
                    if(data && data.message) {
                        errMsg = data.message;
                    }
                    $("#errormsg").text(errMsg);
                }
            },
            error: function (request) {
                console.log("login request failed");
                var errMsg = "Sorry. Bad connection. Please try again."
                $("#errormsg").text(errMsg);
            }
        });
    });
});