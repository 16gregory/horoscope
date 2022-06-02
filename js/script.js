var feed = Helpers.getParameterByName('feed');
var source = 'https://deepidoo-templates.oss-eu-central-1.aliyuncs.com/data/feeds/' + feed +'.json';
var pics = [];
var news = [];
var categories = {
  'lemonde': 'news', 
  'elpais': 'news',
  'moroco': 'news',
  'sports': 'sports'
};

translateAll = function() {
  $("[data-t]").each(function(e) {
    $(this).text(translations[feed]);
  })
}

fetchFeed = function() {
  $.ajax({
    url: source,
    cache: false,
    success: function(data) {
      startFeed(data);
    }
  });
}

startFeed = function(stream) {
  $('.container').addClass(categories[feed]);
  
  var items = stream.text;
  for (var i = 0; i < items.length; i++) {
    pics.push(items[i].picture);
    news.push(items[i].title);
  };

  updateFeed();
};

showDate = function() {
  current_date = Helpers.getDate();
  document.getElementById('date').innerText = current_date['day'] + "/" + current_date['month'] + "/" + current_date['year'];
  document.getElementById('hour').innerText = current_date['hours'] + ":" + current_date['minutes']

  setTimeout(function() {
    showDate();
  }, 1000);
}

updateFeed = function() {
  var counter = 1;
  $('.picture').css('background-image',"url('" + pics[0] + "')")
  $('.info-detail').text(news[0])
  if(feed == 'moroco') {
    $('.info-detail').addClass('rtl');
  }
  setInterval(function() {
    var articlesNumber = news.length;
    $('.picture').fadeOut( "slow", function(){
      $('.picture').css('background-image',"url('" + pics[counter] + "')")
    });

    $('div.content .info-detail').slideUp(500, function(){
      $('.info-detail').text(news[counter])
      $('div.content .info-detail').slideDown();
    });
    $('.picture').fadeIn();
    counter += 1;
    if (counter === articlesNumber) {
      counter = 0;
    }
  }, 7000);
}

$(document).ready(function() {
  fetchFeed();
  translateAll();
  showDate();
});