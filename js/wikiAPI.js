function dowiki(placeName){
  thisVM.wikiElem("<p class='border p-3 rounded m-1'>Loading...</p>");
  var wikiRequestTimeOut = setTimeout(function(){
            thisVM.wikiElem('<p class="border p-3 border-danger rounded m-1">... failed to load. Please check internet connectivity');
        }, 6000);
  var wikiURL = 'https://en.wikipedia.org/w/api.php?continue=&action=query&list=search&srsearch=';
  $.ajax({
    url: wikiURL + placeName + '&srprop=title|snippet&format=json&callback=?',
    cache: true,
    data: {
        format: 'json'
    },
    dataType: 'jsonp',
    success: function(jsondata){
      var items = [];
      $.each(jsondata , function(jsonKey, jsonVal) {
        if (jsonKey == "query") {
            console.log(jsonVal.search[0]);
                items.push("<div class='border p-3 border-secondary rounded m-1'>" +
                "<a href='https://en.wikipedia.org/wiki/" +
                jsonVal.search[0].title.replace(/ /g,"_") +
                "' target='_blank'>" +
                jsonVal.search[0].title +
                "</a>" +
                '<p>' +
                jsonVal.search[0].snippet +
                "... (Courtsey: en.wikipedia.org) </p></div>");
            clearTimeout(wikiRequestTimeOut);
          }
        });
      thisVM.wikiElem(items.join(''));
    }
  });
}
