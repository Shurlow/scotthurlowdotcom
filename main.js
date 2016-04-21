$('.logo').on('click', function(){
  console.log('click')
  $(window.opera ? 'html' : 'html, body').animate({
    scrollTop: 90
  }, {
    'duration': 400,
    'easing': 'swing'
  });
  $(window.opera ? 'html' : 'html, body').animate({
    scrollTop: 0
  }, {
    'duration': 300,
    'easing': 'swing'
  });
})

$(".info").click(function(e) {
  document.location.href = '#about'
})

$(".menu").click(function(e){
  var elem = $(this)
  var index = $(".menu").index(elem)

  if (elem.hasClass('selected')) {
    elem.removeClass('selected')
  } else {
    elem.addClass('selected')
  }
  // handleClick(index, $(this))
});

function handleClick(index, elem){
  console.log(index)
  $(".menu_item").each(function(i) {
    if (index === i) {
      console.log('found')
      elem.addClass('selected')
    } else {
      // elem.removeClass('selected')
    }

  })
}

