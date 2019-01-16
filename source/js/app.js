!function(i){if("function"==typeof define&&define.amd)define(["jquery"],i);else if("object"==typeof module&&module.exports){var t=require("jquery");i(t),module.exports=t}else i(jQuery)}(function(g){function s(i){this.init(i)}s.prototype={value:0,size:100,startAngle:-Math.PI,thickness:"auto",fill:{gradient:["#3aeabb","#fdd250"]},emptyFill:"rgba(0, 0, 0, .1)",animation:{duration:1200,easing:"circleProgressEasing"},animationStartValue:0,reverse:!1,lineCap:"butt",insertMode:"prepend",constructor:s,el:null,canvas:null,ctx:null,radius:0,arcFill:null,lastFrameValue:0,init:function(i){g.extend(this,i),this.radius=this.size/2,this.initWidget(),this.initFill(),this.draw(),this.el.trigger("circle-inited")},initWidget:function(){this.canvas||(this.canvas=g("<canvas>")["prepend"==this.insertMode?"prependTo":"appendTo"](this.el)[0]);var i=this.canvas;if(i.width=this.size,i.height=this.size,this.ctx=i.getContext("2d"),1<window.devicePixelRatio){var t=window.devicePixelRatio;i.style.width=i.style.height=this.size+"px",i.width=i.height=this.size*t,this.ctx.scale(t,t)}},initFill:function(){var t,e=this,i=this.fill,a=this.ctx,n=this.size;if(!i)throw Error("The fill is not specified!");if("string"==typeof i&&(i={color:i}),i.color&&(this.arcFill=i.color),i.gradient){var r=i.gradient;if(1==r.length)this.arcFill=r[0];else if(1<r.length){for(var s=i.gradientAngle||0,l=i.gradientDirection||[n/2*(1-Math.cos(s)),n/2*(1+Math.sin(s)),n/2*(1+Math.cos(s)),n/2*(1-Math.sin(s))],o=a.createLinearGradient.apply(a,l),h=0;h<r.length;h++){var c=r[h],d=h/(r.length-1);g.isArray(c)&&(d=c[1],c=c[0]),o.addColorStop(d,c)}this.arcFill=o}}i.image&&(i.image instanceof Image?t=i.image:(t=new Image).src=i.image,t.complete?u():t.onload=u);function u(){var i=g("<canvas>")[0];i.width=e.size,i.height=e.size,i.getContext("2d").drawImage(t,0,0,n,n),e.arcFill=e.ctx.createPattern(i,"no-repeat"),e.drawFrame(e.lastFrameValue)}},draw:function(){this.animation?this.drawAnimated(this.value):this.drawFrame(this.value)},drawFrame:function(i){this.lastFrameValue=i,this.ctx.clearRect(0,0,this.size,this.size),this.drawEmptyArc(i),this.drawArc(i)},drawArc:function(i){if(0!==i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;t.save(),t.beginPath(),this.reverse?t.arc(e,e,e-a/2,n-2*Math.PI*i,n):t.arc(e,e,e-a/2,n,n+2*Math.PI*i),t.lineWidth=a,t.lineCap=this.lineCap,t.strokeStyle=this.arcFill,t.stroke(),t.restore()}},drawEmptyArc:function(i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;i<1&&(t.save(),t.beginPath(),i<=0?t.arc(e,e,e-a/2,0,2*Math.PI):this.reverse?t.arc(e,e,e-a/2,n,n-2*Math.PI*i):t.arc(e,e,e-a/2,n+2*Math.PI*i,n),t.lineWidth=a,t.strokeStyle=this.emptyFill,t.stroke(),t.restore())},drawAnimated:function(e){var a=this,n=this.el,i=g(this.canvas);i.stop(!0,!1),n.trigger("circle-animation-start"),i.css({animationProgress:0}).animate({animationProgress:1},g.extend({},this.animation,{step:function(i){var t=a.animationStartValue*(1-i)+e*i;a.drawFrame(t),n.trigger("circle-animation-progress",[i,t])}})).promise().always(function(){n.trigger("circle-animation-end")})},getThickness:function(){return g.isNumeric(this.thickness)?this.thickness:this.size/14},getValue:function(){return this.value},setValue:function(i){this.animation&&(this.animationStartValue=this.lastFrameValue),this.value=i,this.draw()}},g.circleProgress={defaults:s.prototype},g.easing.circleProgressEasing=function(i){return i<.5?.5*(i*=2)*i*i:1-.5*(i=2-2*i)*i*i},g.fn.circleProgress=function(n,i){var r="circle-progress",t=this.data(r);if("widget"==n){if(!t)throw Error('Calling "widget" method on not initialized instance is forbidden');return t.canvas}if("value"==n){if(!t)throw Error('Calling "value" method on not initialized instance is forbidden');if(void 0===i)return t.getValue();var e=i;return this.each(function(){g(this).data(r).setValue(e)})}return this.each(function(){var i=g(this),t=i.data(r),e=g.isPlainObject(n)?n:{};if(t)t.init(e);else{var a=g.extend({},i.data());"string"==typeof a.fill&&(a.fill=JSON.parse(a.fill)),"string"==typeof a.animation&&(a.animation=JSON.parse(a.animation)),(e=g.extend(a,e)).el=i,t=new s(e),i.data(r,t)}})}});
!function(f){var a=[],o=!1,p=!1,s={interval:250,force_process:!1},u=f(window),c=[];function l(){p=!1;for(var e=0,r=a.length;e<r;e++){var t=f(a[e]).filter(function(){return f(this).is(":appeared")});if(t.trigger("appear",[t]),c[e]){var i=c[e].not(t);i.trigger("disappear",[i])}c[e]=t}}f.expr[":"].appeared=function(e){var r=f(e);if(!r.is(":visible"))return!1;var t=u.scrollLeft(),i=u.scrollTop(),n=r.offset(),a=n.left,o=n.top;return o+r.height()>=i&&o-(r.data("appear-top-offset")||0)<=i+u.height()&&a+r.width()>=t&&a-(r.data("appear-left-offset")||0)<=t+u.width()},f.fn.extend({appear:function(e){var r,t=f.extend({},s,e||{}),i=this.selector||this;if(!o){var n=function(){p||(p=!0,setTimeout(l,t.interval))};f(window).scroll(n).resize(n),o=!0}return t.force_process&&setTimeout(l,t.interval),r=i,a.push(r),c.push(),f(i)}}),f.extend({force_appear:function(){return!!o&&(l(),!0)}})}("undefined"!=typeof module?require("jquery"):jQuery);
function postDate(t){t=t||"dd.mm.yyyy";var m,e=new Date;m=["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];for(var n=0;n<90;n++){var r="date-"+n,a=document.getElementsByClassName(r),o=new Date(e.getTime()-864e5*n),u=0,d=f(a);d=c(d);for(var s=0;s<a.length;s++){(y=0<window.navigator.userAgent.indexOf("MSIE")?{format:a[s].getAttribute("data-format")}:a[s].dataset).format?a[s].innerHTML=h(o,y.format):a[s].innerHTML=h(o,t),/\btime\b/.test(a[s].className)&&(a[s].innerHTML+=" "+d[u],u++)}}for(n=0;n<90;n++)for(r="date"+n,a=document.getElementsByClassName(r),o=new Date(e.getTime()+864e5*n),u=0,s=0;s<a.length;s++){var y;(y=a[s].dataset).format?a[s].innerHTML=h(o,y.format):a[s].innerHTML=h(o)}function f(t,e){for(var n=[],r=!1,a=0;a<t.length;a++)t[a].className.match(/\btime\b/)&&(t[a].className.match(/\bdate-0\b/)&&(r=!0),n.push(i(r)));return e?n.sort(function(t,e){return e-t}):n.sort(function(t,e){return t-e}),n}function i(t){if(t){var e=new Date,n=60*e.getHours()+e.getMinutes();return Math.round(0+Math.random()*n)}return Math.round(0+1440*Math.random())}function c(t){for(var e=[],n=0;n<t.length;n++){var r=Math.floor(t[n]/60),a=t[n]%60,o=r<10?"0"+r:r,m=a<10?"0"+a:a;e.push(o+":"+m)}return e}function h(t,e){var n="",r=t.getDate(),a=t.getFullYear(),o=t.getMonth()+1;switch(e||!0){case"mm.dd.yyyy":return n+=o<10?"0"+o:o,n+=".",n+=r<10?"0"+r:r,n+="."+a;case"dd month yyyy":return n+=r<10?"0"+r:r,n+=" ",n+=m[o-1],n+=" "+a;case"dd month":return n+=r<10?"0"+r:r,n+=" ",n+=m[o-1];case"day dd, month yyyy":return n+=["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"][new Date(a,o-1,r).getDay()],n+=" ",n+=r<10?"0"+r:r,n+=" ",n+=m[o-1],n+=" "+a;case"dd/mm/yyyy":return n+=r<10?"0"+r:r,n+="/",n+=o<10?"0"+o:o,n+="/"+a;case"dd-mm-yyyy":return n+=r<10?"0"+r:r,n+="-",n+=o<10?"0"+o:o,n+="-"+a;default:return n+=r<10?"0"+r:r,n+=".",n+=o<10?"0"+o:o,n+="."+a}}}$(document).ready(function(){postDate()});


 $(document).ready(function(){
    $('a').click( function(){ 
  var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) { 
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top + 50 }, 1000); 
        }
      return false; 
    });
});

var circles = $('.sequela-persent-count4');

circles.appear({ force_process: true });

circles.on('appear', function() {
  var circle = $(this);
  if (!circle.data('inited')) {
    circle.circleProgress({
      value: .18,
  size: 225,
  startAngle: -Math.PI / 8 * 4,
  thickness: 36,
  emptyFill: '#b2c88b',
  fill: {
    gradient: ["#fff"]
  }
    });
    circle.data('inited', true);
  }
}).on('circle-animation-progress', function(event, progress) {
	$(this).find('strong').html(Math.round(18 * progress) + '<i>%</i>');
});

var circles = $('.sequela-persent-count2');

circles.appear({ force_process: true });

circles.on('appear', function() {
  var circle = $(this);
  if (!circle.data('inited')) {
    circle.circleProgress({
			value: .40,
			size: 225,
			startAngle: -Math.PI / 8 * 4,
			thickness: 36,
			emptyFill: '#b2c88b',
			fill: {
				gradient: ["#fff"]
			}
    });
    circle.data('inited', true);
  }
}).on('circle-animation-progress', function(event, progress) {
	$(this).find('strong').html(Math.round(40 * progress) + '<i>%</i>');
});




var circles = $('.sequela-persent-count1');

circles.appear({ force_process: true });

circles.on('appear', function() {
  var circle = $(this);
  if (!circle.data('inited')) {
    circle.circleProgress({
			value: .15,
			size: 225,
			startAngle: -Math.PI / 8 * 4,
			thickness: 36,
			emptyFill: '#b2c88b',
			fill: {
				gradient: ["#fff"]
			}
    });
    circle.data('inited', true);
  }
}).on('circle-animation-progress', function(event, progress) {
	$(this).find('strong').html(Math.round(15 * progress) + '<i>%</i>');
});
var circles = $('.sequela-persent-count3');

circles.appear({ force_process: true });

circles.on('appear', function() {
  var circle = $(this);
  if (!circle.data('inited')) {
    circle.circleProgress({
			value: .27,
			size: 225,
			startAngle: -Math.PI / 8 * 4,
			thickness: 36,
			emptyFill: '#b2c88b',
			fill: {
				gradient: ["#fff"]
			}
    });
    circle.data('inited', true);
  }
}).on('circle-animation-progress', function(event, progress) {
	$(this).find('strong').html(Math.round(27 * progress) + '<i>%</i>');
});



(function($){
	$(window).resize(function(){
			if($(this).width()>=1023){
				$(window).scroll(function() {
					if($(window).scrollTop() >= 1) {
						$('.fix-menu').addClass('f-nan');
						 } else {
							$('.fix-menu').removeClass('f-nan');
							
					}   
				 });
			}else{
		
			}
	}).trigger("resize");
})(jQuery);
$("#toggle-mnu").on('click', function(e) {
	e.preventDefault();
	$(this).toggleClass("on");
	$(this).parent().toggleClass('navbar-hide');
});

$(document).ready(function(){
  $('.reviews__list').slick({
    slidesToShow: 3,
     infinite: true,
    variableWidth: true,
     // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          infinite: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
           dots: true
        }
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
           dots: true
        }
      }
    ]
  });


//   $('.reviews__list').find(".slick-slide").height("auto");
// $('.reviews__list').slickSetOption(null, null, true);



// screens 
    $('.screens__list').slick({
    slidesToShow: 3,
     infinite: true,
    // variableWidth: true,
     // adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
           dots: true
        }
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
           dots: true
        }
      }
    ]
  });

});