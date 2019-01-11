function revClose() {
    let temper = $('.reviews-content-box');
    for (let i = 0; i < temper.length; i++) {        temper[i].classList.remove('content-plus');    }
}
revClose();
$('.reviews-content').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    revClose();
});
$('.reviews-content-box__cbtn').on('click', function () {
    this.parentElement.parentElement.classList.toggle("content-plus");
});
 $('.reviews-content').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
 });



 $(document).ready(function(){
    $('a').click( function(){ 
  var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) { 
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top + 50 }, 1000); 
        }
      return false; 
    });
});

