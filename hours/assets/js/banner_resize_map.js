$(document).ready(function () {
	var img = document.getElementById('library-brand-img'); 
	var width = img.clientWidth;
	var height = img.clientHeight;
	var imarkX2 = Math.round(width * .076);
	var libBanX1 = imarkX2 + 1; 
	var imarkCoords  = "0,0," + imarkX2 + "," + height;
	var libBanCoords = libBanX1 + ",0," + width + "," + height;
	document.getElementById("imark-img-area").coords = imarkCoords;
	document.getElementById("library-banner-area").coords = libBanCoords;
});
$( window ).resize(function() {
	var img = document.getElementById('library-brand-img'); 
	var width = img.clientWidth;
	var height = img.clientHeight;
	var imarkX2 = Math.round(width * .076);
	var libBanX1 = imarkX2 + 1; 
	var imarkCoords  = "0,0," + imarkX2 + "," + height;
	var libBanCoords = libBanX1 + ",0," + width + "," + height;
	document.getElementById("imark-img-area").coords = imarkCoords;
	document.getElementById("library-banner-area").coords = libBanCoords;
});