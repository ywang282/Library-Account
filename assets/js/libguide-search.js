        //libguides search function
        //event handler for submit button on libSearchForm
        $( "#libSearchForm" ).submit(function( event ) {
        //create query string variable before event.preventDefault(); is invoked
            var libstring = $('#libSearchForm').serialize();
            //prevent default behavior of form
            event.preventDefault();
            //ajax call to proxy at libguidessearch.php?
                $.ajax({
                     url: "libguidessearch.php?",
                     dataType: 'html',
                     data: libstring,
                     success: function(data) {
                        $("#libGuideSearch").html( data );
                     }
                });
        });