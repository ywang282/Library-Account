$(document).ready(function() {
	var checkboxes = $("input[type='checkbox']");
	checkboxes.change(function() {
		processCheckboxInput();
	});

	processCheckboxInput();

	var searchbutton = $("#easysearchbutton");
	searchbutton.click(function() {
		addSearchParameters();
	});
});

function processCheckboxInput() {
	var cb_journals = $("input[id='articles']");
	var cb_books = $("input[id='books']");
	
	if (!cb_journals.prop("checked") && cb_books.prop("checked")) { 
		loadBooksDropdown();
	}
	else {
		loadArticlesDropdown();
	}
}

function loadArticlesDropdown() {
	var dropdown = $("select[id='dropdown']");
	dropdown.empty();

	dropdown.append('<option value="gen">Multi-Subject Resources</option>');
	dropdown.append('<option value="news">Current News Sources</option>');
	dropdown.append('<option value="ArHu">Arts &amp; Humanities</option>');
	dropdown.append('<option value="Bus">Business</option>');
	dropdown.append('<option value="Educ">Education</option>');
	dropdown.append('<option value="EngRes">Engineering</option>');
	dropdown.append('<option value="health">Health Sciences</option>');
	dropdown.append('<option value="images">Images</option>');
	dropdown.append('<option value="ias">International &amp; Area Studies</option>');
	dropdown.append('<option value="LIS">Library &amp; Information Science</option>');
	dropdown.append('<option value="lifesci">Life Sciences</option>');
	dropdown.append('<option value="music">Music &amp; Performing Arts</option>');
	dropdown.append('<option value="Physsci">Physical Sciences/Math</option>');
	dropdown.append('<option value="Socsci">Social Sciences</option>');

	dropdown.attr('name','selection');
}

function loadBooksDropdown() {
	var dropdown = $("select[id='dropdown']");
	dropdown.empty();

	dropdown.append('<option value="FT*">Keyword</option>');
	dropdown.append('<option value="TALL">Title words</option>');    
	dropdown.append('<option value="NAME+">Author (last name, first)</option>');

	dropdown.attr('name','booksSearch_Code');
}

function addSearchParameters() {
	var searchbutton = $("#easysearchbutton");

	searchbutton.remove("input");

	if (getSearchType() == "articles") {
		searchbutton.append('<input name="project" hidden="true" value="gateway">');
		searchbutton.append('<input name="selection" hidden="true" value="web">');
	}
	else {
		searchbutton.append('<input name="project" hidden="true" value="gatewayopac">');
	}

	searchbutton.append('<input name="s2" hidden="true" value="direct">');
	searchbutton.append('<input name="selection" hidden="true" value="opac">');
}

function getSearchType() {
	var dropdown = $("select[id='dropdown']");

	if (dropdown.attr('name') == 'selection')
		return "articles";
	else
		return "books";
}