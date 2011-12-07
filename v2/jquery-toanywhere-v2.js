/**
 * 平滑滚动页面到某元素
 *
 *
 * href: 
 *
 * Example 1
 * <a href="body" class="to_any">to Top</a>
 * $(".to_any").toAnywhere(int duration); // duration > 0
 * Example 2
 * <a href="body" class="to_any" duration="500">to Top</a>
 * $(".to_any").toAnywhere();
 *
 *
 * @author wuyaohui
 * https://charsky.github.com/toAnywhere
 * email: charsky.wu@gmail.com
 * 2011/11/23
 * 2011/12/2
 *  v2 版
 *  增加定位元素 bottom | right
 *  bug: IE6 定位问题
 *  v2.1
 *  去掉元素定位 可通过css 修改
 *  决定不支持 IE6 如果是 IE6 不执行
 * 2011/12/6
 *  解决IE6定位问题 见 jquery-toanywhere.css
 */
(function($) {
  $.fn.toAnywhere = function(duration) {
    $(this).each(function() {
      new _anyWhere(this, duration).getAnyWhere();
    });
  }
  function _anyWhere(el, duration) {
    this.el = el;
    this.duration = parseInt(duration) || 1000;
    this.$el = $(el);
  }
  _anyWhere.prototype = {
    build: function() {
      if (!/MSIE 6/.test(navigator.userAgent)) {
	this.$el.css("position", "fixed");
      } 
      this.$el.css("display", "none");
    },
    getAnyWhere: function() {
      this.build();
      this.bindWindowScroll();
      this.bindClick();
    },
    bindClick: function() {
      var _duration = this.duration;
      this.$el.click(function() {
	var _el = $(this);
	$("body, html").animate({
	  scrollTop: $(_el.attr("href")).offset().top + "px"
	}, parseInt(_el.attr("duration")) || _duration);
	return false;
      });
    },
    bindWindowScroll: function() {
      var any = this;
      $(window).bind("scroll", function() {
	var scrollTop;
	if (document.documentElement && document.documentElement.scrollTop) {
	  scrollTop = document.documentElement.scrollTop;
	} else if (document.body && document.body.scrollTop) {
	  scrollTop = document.body.scrollTop;
	}
	any._setElToggle(scrollTop);
      });
    },
    _setElToggle: function(scrollTop) {
      if (scrollTop > 0) this.$el.fadeIn("fast");
      else this.$el.hide();
    }
  }
})(jQuery);
