



 $(document).ready(function(){
    $('a').click( function(){ 
  var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) { 
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top + 50 }, 1000); 
        }
      return false; 
    });
});
var animForSect2 = {
	".sing-content-box": "animationarrow"
};
addAnimForSection(".sing-content", animForSect2);
function addAnimForSection(el, arr) {
	var target = $(el);
	var targetPos = target.offset().top;
	var winHeight = $(window).height();
	var scrollToElem = targetPos - winHeight;
	$(window).scroll(function(){
	  var winScrollTop = $(this).scrollTop();
	  var flag = true;
	  if(winScrollTop > scrollToElem){
	  	if (flag){
		  	for(var i = 0; i <= Object.keys(arr).length; i++){
		  		var key = Object.keys(arr)[i];
		  		$(el + " " + key).addClass(arr[key]);
		  	}
		  	flag = false;
	  	}
	  }
	});
}