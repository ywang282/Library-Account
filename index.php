<!DOCTYPE html>
<html lang="en">
<?php
$title = "University Library, University of Illinois";
//contains the HTML declarations and the logo bar
include("preproc_head.php");
?>
<?php
//contains the sitewide navigation bar
include("siteheader.php");
//contains the gateway navigation bar
include("shared_navbar.php");
//contains the gateway alert 
include("alert.php");
//contains (manually edited) optional "info" box, less glaring than alerts but still noticeable
include("info.php");
//contains the main content box with search/chat
include("content.php");
//contains the dynamic content tabs
include("dynamic.php");
//contains the footer and external JS resources
include("preproc_footer.php");
?>
</html>