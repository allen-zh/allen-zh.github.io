!function(e){function n(){t(),d()}function t(){p.onload=r;for(var e=0;e<w.length;e++){var n=w.eq(e).attr("id");p.add($("#"+n)),p[n].onload=o,p[n].preload=a,p[n].index=E.push(n)-1}p[E[0]].show()}function a(){var e=$("#"+this.key),n=$(".page-inner",e);n.hide(),i.call(this),e.addClass("page-loaded")}function o(){var e=$("#"+this.key),n=$(".page-inner",e);p.last&&n.css({"margin-top":"+=50px"}).show().animate({"margin-top":"-=50px"},400,"easeOutQuad"),i.call(this,"load")}function i(e){this.index==E.length-1?C.fadeIn(800):C.fadeOut(400),"load"==e&&0==this.index&&$("body").removeClass("pinned"),"load"!=e&&this.index>0&&$("body").addClass("pinned")}function d(){c(document,function(e){u(e,function(e){e>0?h():f()},20)}),s(document,function(e,n){n?h():f()}),$(document).keydown(function(e){return 38==e.keyCode||37==e.keyCode?(h(p.current.key),!1):40==e.keyCode||39==e.keyCode?(f(p.current.key),!1):void 0}),x.click(function(){var e,n=$(this).data("page"),t=p[n],a=p.current,o=a.index;if(t)return e=t.index,e===o?!1:(e>o&&t&&l(n,"bottom"),o>e&&t&&l(n,"top"),!1)})}function r(){x.removeClass(k),x.each(function(){$(this).data("page")===p.current.key&&$(this).addClass(k)})}function c(e,n){e.addEventListener?(e.addEventListener("mousewheel",n,!1),e.addEventListener("DOMMouseScroll",n,!1)):e.attachEvent?e.attachEvent("onmousewheel",n):e.onmousewheel=n}function u(e,n,t){if(T){var e=window.event||e,a=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));v&&clearTimeout(v),t?v=setTimeout(function(){v=0,n(a)},t):n(a)}}function s(e,n){e.addEventListener&&(e.addEventListener("touchstart",function(e){if(e.preventDefault(),e.changedTouches.length){var n=e.changedTouches[0];g=n.pageX,m=n.pageY}},!1),e.addEventListener("touchend",function(e){if(e.preventDefault(),e.changedTouches.length){var t=e.changedTouches[0];n(t.pageX-g>0,t.pageY-m>0)}},!1))}function l(e,n){var t=p[e];t[n]&&t[n]()}function h(){var e=p.current.index;return e--,E[e]&&l(E[e],"top"),!1}function f(){var e=p.current.index;return e++,E[e]&&l(E[e],"bottom"),!1}var p=e.parallax;p.speed=800,p.easing="easeInCubic";var v,g,m,y=$(".js_control"),w=$(".page"),x=$(".point",y),k=(document.body.scrollTop,"current"),C=$(".footer"),E=[],T=!0;e.page={init:n,onDown:f,onUp:h}}(window);