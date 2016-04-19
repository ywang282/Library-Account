$(".easy-search-text-input").keyup(function() {
	var es_ids_arr = [];
	var current_id = this.id;
	var typed_text = $(this).val();
	$(".easy-search-text-input").each(function(){
		if (this.id != current_id){
			es_ids_arr.push(this.id);
		}
	});
	for (i = 0; i < es_ids_arr.length; i++) {
		$("#" + es_ids_arr[i]).val(typed_text);
	}

});