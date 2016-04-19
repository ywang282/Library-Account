$(document).ready(function () {
//scroll to orange bar if not showing 25% of panel
  function tabScroll(x) {
    var fracs = $(x).next().fracs();
    var vhref = "#" + $(x).attr("id");
    var vHeight = $(vhref + "+div>div").height();
    var vVis = fracs.visible * vHeight;
    if (vVis <= 200) {
      console.log("bourbon vhref : ",vhref);
      $('html, body').animate({
        scrollTop: $(vhref).offset().top
      }, 1000);
    }   
  }

  if (window.innerWidth > 767) {
    $('.accordion-tabs-minimal').each(function(index) {
      $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
    });
  } 

  $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs-minimal');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
      console.log("this in accordionTabs: ",this);

      tabScroll(this);

      } else {
      event.preventDefault();

      tabScroll(this);

      if (window.innerWidth < 768) {
        var accordionTabs = $(this).closest('.accordion-tabs-minimal');
        accordionTabs.find('.is-open').removeClass('is-open').hide();
        $(this).removeClass('is-active');
      }
    }
  });

});