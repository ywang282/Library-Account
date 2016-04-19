// JavaScript Document
//Credit to http://stackoverflow.com/questions/6285854/set-javascript-time-with-php-server-time for the inital idea
var server_to_client_drift;

function getTimeDrift()
{
    var serverTime = <?php echo time() * 1000; /* convert to milliseconds, which is what javascript getTime returns */ ?>;
    var localTime = new Date().getTime();

    return serverTime - localTime;
}

server_to_client_drift = getTimeDrift();

function getServerTime()
{
var local_now = new Date().getTime();
return 	new Date(local_now + server_to_client_drift);
}
