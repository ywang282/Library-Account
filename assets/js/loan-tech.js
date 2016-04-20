  //library technology, ugl loanable technology function
  $( window ).load(function () {
      $.getJSON(window.location.origin + "/api/tech/list",
      //using this proxy until gateway tech api is corrected 

          function processData(jsonData) {

          // Loop through each data block
          $.each(jsonData, function (object, objectData) {
        var vdesc = objectData.name.replace('<','&lt;').replace('>', '&gt;');
              $('#uglTechItem').append("<li><a href='http://vufind.carli.illinois.edu/vf-uiu/Record/" +
                objectData.bibId + "/Holdings'>" +
                vdesc + "</a>" + "<span class='badge'>" + objectData.count + "</span></li>");

          });
      });
  });