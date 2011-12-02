/**
 * 平滑滚动页面到某元素
 * <a href="body" id="toBody" duration="slow">to Top</a>
 * $("#toBody").toAnywhere(int duration);
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
 */
(function($) {
  $.fn.toAnywhere = function(duration) {
    // 不支持 IE 6
    if(/MSIE 6/.test(navigator.userAgent)) return false;
    $(this).each(function() {
      new _anyWhere(this, duration).getAnyWhere();
    });
  }
  function _anyWhere(el, duration) {
    this.el = el;
    this.duration = duration || 1000;
    this.$el = $(el);
  }
  _anyWhere.prototype = {
    getAnyWhere: function() {
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
      if (scrollTop > 200) this.$el.fadeIn("fast");
      else this.$el.hide();
    }
  }
})(jQuery);
