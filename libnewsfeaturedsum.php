<?php
header('Content-type: text/html');

$libguidesURL = "http://www.library.illinois.edu/xml/news_articles.rss?sf=yes&f=/news/featured/&full=no";
$query_string = $_SERVER["QUERY_STRING"];
$fixed_url = $libguidesURL;
                
$ch = curl_init() or die(curl_error());
curl_setopt($ch, CURLOPT_URL,$fixed_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$data1=curl_exec($ch) or die(curl_error());
echo $data1;

curl_close($ch);

?>
