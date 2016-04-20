<?php
header('Content-type: text/html');

$libguidesURL = "http://minrva.library.illinois.edu/api/tech/list";
$query_string = $_SERVER["QUERY_STRING"];
$fixed_url = $libguidesURL;
                
$ch = curl_init() or die(curl_error());
curl_setopt($ch, CURLOPT_URL,$fixed_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$data1=curl_exec($ch) or die(curl_error());
echo $data1;

curl_close($ch);

?>
