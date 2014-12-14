var popWin = {
    scrolling: 'no',
    int: function() {
        //this.mouseClose();
        this.closeMask();
    },
    loadWin: function(width, height, title, src) {
        var iframeHeight = height - 52;
        var marginLeft = width / 2;
        var marginTop = height / 2;
        var inntHtml = '';
        inntHtml += '<div id="mask" style="display:none;width:100%; height:100%; position:fixed; top:0; left:0; z-inde:1999;background:#cccccc; filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity:0.5; "></div>';
        inntHtml += '<div id="maskTop" style="display:none;width: ' + width + 'px; height: ' + height + 'px; background: #fff; color: #333; position: fixed; top: 50%; left: 50%; margin-left: -' + marginLeft + 'px; margin-top: -' + marginTop + 'px; z-index: 2999; filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;">';
        inntHtml +=     '<div id="popWinClose" style="width: 28px; height: 28px; cursor: pointer; position: absolute; top: 12px; right: 20px; background-image: url(http://www.standmac.com/images/c.jpg);"></div>';
        inntHtml +=     '<iframe width="' + width + '" height="' + iframeHeight + '" frameborder="0" scrolling="' + this.scrolling + '" src="' + src + '"></iframe>';
        inntHtml += '</div>'; // end maskTop

        if(this.$maskElements) this.$maskElements.remove();
        $("body").append(inntHtml);

        this.$maskElements = $("#mask,#maskTop");
        this.$close = $("#popWinClose", this.$maskElements);
        this.int();
    },
    show: function(){
        this.$maskElements.fadeIn();
    },
    hide: function(){
        var me = this;
        this.$maskElements.fadeOut(function(){
            me.$maskElements.remove();
        });
    },
    closeMask: function() {
        var me = this
        this.$close.click(function(){
            me.hide();
            return false;
        });
    }
    // mouseClose: function() {
    //     $("#popWinClose").on('mouseenter',
    //         function() {
    //             $(this).css("background-image", "url()");
    //         });

    //     $("#popWinClose").on('mouseleave',
    //         function() {
    //             $(this).css("background-image", "url()");
    //         });
    // },
    /*mouseDown : function(){
		var dragging = false;
		var iX, iY;
		//var elmen = $("div#maskTop");
		$("#maskTop").on('mousedown' , function(e){
			dragging = true;
                iX = e.clientX - this.offsetLeft;
                iY = e.clientY - this.offsetTop;
                this.setCapture && this.setCapture();
                return false;
		});
		document.onmousemove = function(e) {
                if (dragging) {
                var e = e || window.event;
                var oX = e.clientX - iX;
                var oY = e.clientY - iY;
                $("#maskTop").css({"left":oX + "px", "top":oY + "px"});
                return false;
                }
            };
            $(document).mouseup(function(e) {
                dragging = false;
                $("#maskTop")[0].releaseCapture();
                e.cancelBubble = true;
            })
	},*/
};