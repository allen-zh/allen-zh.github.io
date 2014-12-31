var popWin = {
    scrolling: 'no',
    int: function() {
        //this.mouseClose();
        this.closeMask();
    },
    init: function() {
        $("#login")
            .mouseenter(function() {
                popWin.loadWin("1100", "520", "", "http://www.standmac.com/login.asp");
            })
            .click(function() {
                popWin.show();

                return false;
            });

        $("#reg")
            .mouseenter(function() {
                popWin.loadWin("1100", "520", "", "http://www.standmac.com/reg.asp");
            })
            .click(function() {
                popWin.show();
                return false;
            });
    },
    loadWin: function(width, height, title, src) {
        var iframeHeight = height - 52;
        var marginLeft = width / 2;
        var marginTop = height / 2;
        var inntHtml = '';
        inntHtml += '<div id="mask" style="display:none;z-index:10;width:100%; height:100%; position:fixed; top:0; left:0; z-inde:1999;background:#cccccc; filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity:0.5; "></div>';
        inntHtml += '<div id="maskTop" style="display:none;width: ' + width + 'px; height: ' + height + 'px; background: #fff; color: #333; position: fixed; top: 50%; left: 50%; margin-left: -' + marginLeft + 'px; margin-top: -' + marginTop + 'px; z-index: 2999; filter: progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;">';
        inntHtml += '<div id="popWinClose" style="width: 28px; height: 28px; cursor: pointer; position: absolute; top: 12px; right: 20px; background-image: url(http://www.standmac.com/images/c.jpg);"></div>';
        inntHtml += '<iframe width="' + width + '" height="' + iframeHeight + '" frameborder="0" scrolling="' + this.scrolling + '" src="' + src + '"></iframe>';
        inntHtml += '</div>'; // end maskTop

        if (this.$maskElements) this.$maskElements.remove();
        $("body").append(inntHtml);

        this.$maskElements = $("#mask,#maskTop");
        this.$close = $("#popWinClose", this.$maskElements);
        this.int();
    },
    show: function() {
        this.$maskElements.fadeIn();
    },
    hide: function() {
        var me = this;
        this.$maskElements.fadeOut(function() {
            me.$maskElements.remove();
        });
    },
    closeMask: function() {
        var me = this
        this.$close.click(function() {
            me.hide();
            return false;
        });
    }
};

var bgImgFix = {
    init: function() {
        this.setBgImg();
        this.bind();
    },
    bind: function() {
        $(window, document).on('resize', this.setBgImg);
    },
    setBgImg: function() {
        var $bg = $('body .bg');
        var $pageInner = $('.page-inner');
        var width = $(window).width();
        var height = $(window).height();

        if (width / height > 1440 / 750) {
            $bg.css({
                height: 'auto',
                width: '100%',
                left: 0
            });
        } else {
            $bg.css({
                width: 'auto',
                height: '100%',
                left: (width - height * 1440 / 750) / 2 + 'px'
            });
        }
        if (width < 1200) {
            $pageInner.css('margin-left', (width - 1200) / 2 + 'px');
        }
        $bg.fadeIn();
    }
};
