//provides keyboard support for orange accordion/tabs.  

$( '.arrow-access' ).keydown( function(e) {
      // Down key
    if (e.keyCode == 39) {      
        $(".arrow-access:focus").closest('li').next().find('a.arrow-access').focus().click();        
    }

    // Up key
    if (e.keyCode == 37) {      
        $(".arrow-access:focus").closest('li').prev().find('a.arrow-access').focus().click();        
    }
});
