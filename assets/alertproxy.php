<?php
header('Content-type: text/html');

$libguidesURL = "https://status.uillinois.edu/SystemStatus/jsp/rss_feed.jsp?id=300&sub=1";

$fixed_url = $libguidesURL;
                
$ch = curl_init() or die(curl_error());
curl_setopt($ch, CURLOPT_URL,$fixed_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$data1=curl_exec($ch) or die(curl_error());
echo $data1;

curl_close($ch);

?>