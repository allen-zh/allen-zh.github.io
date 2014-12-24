/*
 *           File:  4-1.js
 *         Author:  zhangwentao
 *       Modified:  2014-4-1
 *    Description:  愚人节活动入口文件
 */

//程序入口
//define(function(require) {
(function(global) {
    var p = global.parallax; // = require("parallax.js");
    p.speed = 1000;
    p.easing = 'easeInCirc';

    // fixed control element
    var $control = $('.js_control'),
        $pages = $('.page'),
        $points = $('.point', $control),
        scrolltop = document.body.scrollTop,
        POINT_CUR_CLS = 'current';
    var $footer = $('.footer');
    var $wrap = $('.wrap');
    var pageArray = [];

    function init() {
        initPage();
        initControl();
    }

    function initPage() {
        p.onload = updatePoints;

        for (var i = 0; i < $pages.length; i++) {
            var pid = $pages.eq(i).attr('id');

            p.add($("#" + pid));
            p[pid].onload = pageLoad;
            p[pid].preload = pagePreLoad;
            p[pid].index = pageArray.push(pid) - 1;
        }

        p[pageArray[0]].show();
    }

    function pagePreLoad() {
        var $page = $("#" + this.key);
        var $inner = $('.page-inner', $page);

        $inner.hide();
        showOrHideTools.call(this);
        $page.addClass('page-loaded');
    }

    function pageLoad() {

        var $page = $("#" + this.key);
        var $inner = $('.page-inner', $page);

        if (!!p.last) {
            $inner.css({
                'margin-top': '+=50px'
            }).show().animate({
                'margin-top': '-=50px'
            }, 400, 'easeOutQuad');
        }

        showOrHideTools.call(this, 'load');
    }

    function showOrHideTools(type) {

        if (this.index == pageArray.length - 1) {
            $footer.fadeIn(800);
        } else {
            $footer.fadeOut(400);
        }

        if (type == 'load' && this.index == 0) {
            $('body').removeClass('pinned');
        }
        if (type != 'load' && this.index > 0) {
            $('body').addClass('pinned');
        }
    }

    function initControl() {

        bindMouseWheel(document, function(e) {
            MouseWheelHandler(e, function(delta) {
                if (delta > 0) {
                    onUp();
                } else {
                    onDown();
                }
            }, 20);
        });

        bindSwipe($wrap[0], function(swipeLeft, swipeUp) {
            //console.log(left, up);
            if (swipeUp) {
                onUp();
            } else {
                onDown();
            }
        });

        //fixScroll();

        $(document).keydown(function(e) {
            if (e.keyCode == 38 || e.keyCode == 37) {
                // if($topAnchor.offset().top == $pageLast.offset().top) 
                //  isTrigger = true;

                // if(isTrigger){
                onUp(p.current.key);
                return false;
                //}
            } else if (e.keyCode == 40 || e.keyCode == 39) {
                //if(p.current.key != 'pageLast'){
                onDown(p.current.key);
                return false;
                //}
            }
        });

        $points.click(function() {
            var pageKey = $(this).data('page'),
                page = p[pageKey],
                index,
                lastPage = p.current,
                lastIndex = lastPage.index;

            if (!page) return;
            index = page.index;

            if (index === lastIndex) return false;
            if (index > lastIndex) {
                page && goPage(pageKey, 'bottom');
            }

            if (index < lastIndex) {
                page && goPage(pageKey, 'top');
            }
            return false;
        });
    }

    function updatePoints(points) {

        $points.removeClass(POINT_CUR_CLS);
        $points.each(function(index) {
            if ($(this).data('page') === p.current.key) {
                $(this).addClass(POINT_CUR_CLS);
            }
        });
    }

    function bindMouseWheel(element, Handler) {

        if (element.addEventListener) {
            // IE9, Chrome, Safari, Opera
            element.addEventListener("mousewheel", Handler, false);
            // Firefox
            element.addEventListener("DOMMouseScroll", Handler, false);
        }
        // IE 6/7/8
        else if (element.attachEvent) {
            element.attachEvent("onmousewheel", Handler);
        } else {
            element.onmousewheel = Handler;
        }
    }

    var MouseWheelTimer;
    var isTrigger = true;

    function MouseWheelHandler(e, fn, delay) {
        // cross-browser wheel delta
        // if not isTrigger, return
        if (!isTrigger) return;

        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        if (MouseWheelTimer) {
            clearTimeout(MouseWheelTimer);
        }
        if (delay) {
            MouseWheelTimer = setTimeout(function() {
                MouseWheelTimer = 0;
                fn(delta);
            }, delay);
        } else {
            fn(delta);
        }
    }

    var touchX, touchY;

    function bindSwipe(ele, Handler) {
        if (!ele.addEventListener) return;

        ele.addEventListener("touchstart", function(event) {
            event.preventDefault();
            if (!event.changedTouches.length) return;
            var touch = event.changedTouches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
        }, false);

        ele.addEventListener("touchend", function(event) {

            // alert(event.changedTouches.length);
            if (!event.changedTouches.length) return;
            var touch = event.changedTouches[0];
            // 如果没动
            if (touch.pageY - touchY === 0) return;

            event.preventDefault();
            Handler(touch.pageX - touchX > 0, touch.pageY - touchY > 0);
        }, false);
    }

    /*function fixScroll(){
        var timer, timer2;
        $pageLast.scroll(function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                if($topAnchor.offset().top == $pageLast.offset().top){
                    //clearTimeout(timer2);

                    //timer2 = setTimeout(function(){
                        isTrigger = true;
                    //},30);
                }else{
                    isTrigger = false;
                }
            },20);
        });
    }*/

    function goPage(pageKey, fnName) {
        var page = p[pageKey];

        page[fnName] && page[fnName]();
    }

    function onUp() {
        var index = p.current.index;
        index--;

        pageArray[index] && goPage(pageArray[index], 'top');
        return false;
    }

    function onDown() {
        var index = p.current.index;
        index++;
        pageArray[index] && goPage(pageArray[index], 'bottom');
        return false;
    }

    global.page = {
        init: init,
        onDown: onDown,
        onUp: onUp
    };

})(window);
