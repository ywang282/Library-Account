<?php
//Verbose Error Checking. Only enable on local/testing servers
//ini_set('display_errors', 1); 
//error_reporting(E_ALL);

//Only allow execution of this code on the server itself, not for remote users
if(php_sapi_name() === 'cli')
{

	
	//This application attempts to retrieve data from the HOURS API and then store it in a local file.
	//This should be set as a CRON job ever ten minutes on the server
	//Make sure this file is located outside the web root, to ensure that only the server can run it, and not the public from a URL
	
	//Need to use server variable for hostname to make this portable between gateway-dev, stage, and prod
	$fileOrAPItoRetrieve = "http://gateway-dev.library.illinois.edu/api/times_locations/alllibraryhours"; //URL of file/API results we will be grabbing
	$fileLocationToStoreOnServer = "/var/www/html/cached_files/hoursResults.txt";
	$errorsemail = "webmaster@library.illinois.edu"; //who to email any encountered error message to
	
	$newline = "</br>\n\n"; //convenince variable in case we want to target for web or email client viewing later
	$hasErrors = 0; //Keep track of how many custom errors occur
	$errors = ""; //Capture custom errors 
	$has_server_errors = 0; //Keep track of how many server errors occur
	$server_errors = ""; //Caputure server errors
	
	
	//custom error handler function
	function customError($errno, $errstr) {
	  global $server_errors, $has_server_errors, $newline; //global keyword required to directly access variables outside the function
	  $server_errors .= "<b>Error:</b> [$errno] $errstr" .$newline;
	  $has_server_errors++;
	}
	//set custom error handler
	set_error_handler("customError");
	
	//echo "I am: " . exec('whoami') . $newline;
	
	$ch = curl_init($fileOrAPItoRetrieve); //file/restful api results to get
	$returned_content = ""; //variable to temporarily hold content of returned file, which includes the HTTP response headers for checking/validation
	$returned_header = ""; //store http headers from $returned_content here
	$returned_body = ""; //store non-header content of $returned_content here
	
	curl_setopt($ch, CURLOPT_HEADER, 1); //include http response headers in returned content. When doing this, you must split/parse the reponse header from the actual content you are going to use/store later
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Don't return the results to the browser, we are storing them in a string instead
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,30); //at most, wait 30 seconds for inital respnse from server
	curl_setopt($ch, CURLOPT_TIMEOUT, 60); //at most, wait another 30 seconds after beginning to recieve file before giving up -- CURLOPT_TIMEOUT must include the amount of time set in CURLOPT_CONNECTTIMEOUT. If both are set to 30, and it took 30 seconds to begin to recieve the file, it would immediately abort because CURLOPT_TIMEOUT (30 total) - CURLOPT_CONNECTTIMEOUT (30 used) = 0 
	
	//Retrieve the file and store in a string variable
	$returned_content = curl_exec($ch);
	$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
	$returned_header = substr($returned_content, 0, $header_size);
	$returned_body = substr($returned_content, $header_size);
	
	//make sure curl returned without error, if note, update error info
	if($returned_content === false)
	{
		$errors .= curl_error($ch) . $newline;
		$hasErrors++;
	}
	/*
	elseif(1===1) //Check headers and file contents here, update error messages if not
	{
		
	}
	*/
	else //Write the contents to the file
	{
		//Write the vetted contents to the file
		$opened_file = fopen($fileLocationToStoreOnServer, "w"); //Returns a file pointer resource on success, or FALSE on error.
		if($opened_file === false)
			{
			$errors .= "Could not open file to write to server." . $newline;
			$hasErrors++;
			}
		$file_write_check = fwrite($opened_file, $returned_body);
		if($file_write_check === false)
			{
			$errors .= "Could not write file to the server." . $newline;
			$hasErrors++;
			}
		$file_close_check = fclose($opened_file);
		if($file_close_check === false)
			{
			$errors .= "Could not close the file on the server." . $newline;
			$hasErrors++;
			}
	}
	
	curl_close($ch);
	
	//This is for debugging when we know we've encountered problems. We'll be monitoring the actual JSON file written out above using IP monitor 
	// (SEE Library IT IMS staff about this) which will send an email to webmaster@library.illinois.edu if the JSON file hasn't been updated in the last
	// 30 minutes (meaning 2-3 tiumes in a row it's failed to be able to read/write the content)
	
	/* */
	if($hasErrors !== 0 || $has_server_errors !== 0)
	{
		//for use during programming/debugging only
		//echo "<h1>Encountered " . $hasErrors . " Custom Errors, including:</h1><hr/>" . $errors . "<hr/>";	
		//echo "<h1>Encountered " . $has_server_errors . " Server Errors, including:</h1><hr/>" . $server_errors . "<hr/>";	
		
			
	}
		else //for use during programming/debugging only
	{
		//echo "<h1>Results Are</h1><hr/>" . $returned_body . "<hr/>";		
		//echo "Accessing IP Address is: " . $_SERVER[REMOTE_ADDR] .$newline;	
		//echo "Server IP Address is: " . $_SERVER[SERVER_ADDR] .$newline;	
	}
	/* */
}
else
{
	echo '<!doctype html><html><head><meta charset="utf-8"><title>Access Forbidden</title></head></head><body><h1>Access Forbidden</h1><p>Contact the <a href="http://www.library.illinois.edu/it/helpdesk/">Library IT Help Desk</a> for additoinal assitance.</p></body></html>';	
}
?>