
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    
var street=$('#street').val();
    var city=$('#city').val();
    var address=street+', '+city;
    $greeting.text('so you want to go to '+address+'?');
    var url="http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+address;
    $body.append('<img class="bgimg" src="'+url+'">');
    
  var nyurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=843712fd02634dc4bf18d3b82655f5f7"+"&q="+city;
$.getJSON(nyurl,function(data){
   $nytHeaderElem.text('New York Times Articles About '+city);
    articles=data.response.docs;
    for(var i=0;i<articles.length;i++){
        var article=articles[i];
        $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
    };
    
}).error(function(e){//if request fails
    $nytHEaderElem.text('cant load');
});
     var wikiBaseUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=';
    var wikiUrl = wikiBaseUrl + city;
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text('Could not load wikipedia links');
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(data){
            for (var i = 0; i <= data[1].length - 1; i++) {
                var pageLink = '<li><a href="' + data[3][i] + '">' + data[1][i] + '</a></li>';
                $wikiElem.append(pageLink);
            };

            clearTimeout(wikiRequestTimeout);
        }
    });
    
    return false;
    
};

$('#form-container').submit(loadData);
