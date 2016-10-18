$(document).ready(function() {
    //////////////////////////////////////////////////////////////////
$('#mySelect').on('change', function(event){
  event.preventDefault();
  var selected = $(this).val();
$('.article-list').empty();
$('.img-logo').css({ height: "50%", width: "50%" });
$('.main-header').css({ height: "auto" }),
$('.loader').css('display','block')
$.ajax({
  url: "https://api.nytimes.com/svc/topstories/v2/"+ selected +".json?api-key=a27ac5940c684d0d9780bde51acbfd70",
  method: 'GET',
  dataType: 'json'
}).done(function(data) {

var oneItem = '';
var i = 0;
$.each(data.results, function(key, value){
  if (value.multimedia.length && i < 12){
    itemText = value.abstract;
    itemImage =value.multimedia[4].url;
    itemLink = value.url;

    oneItem += '<li>';
    oneItem +=  '<a class="item-link" href="' + itemLink + '">';
    oneItem +=    '<div class="wrapper">';
    oneItem +=      '<div class="article" style="background-image:url('+itemImage+')">';
    oneItem +=        '<div class="articleText">';
    oneItem +=          '<p>' + itemText + '<p>';
    oneItem +=        '</div>';
    oneItem +=       '</div>';
    oneItem +=     '</div>';
    oneItem +=   '</a>';
    oneItem += '</li>';
    i++;
  }
});
  $('.article-list').append(oneItem);
}).fail(function() {
  $('.article-list').append('<li> Error, try again pls.');
}).always(function() {
  $('.loader').css('display','none');
})
})
// $("#mySelect").heapbox({
//   showFirst: !1,
//   "onChange":function() {
//
// }
// });
});
