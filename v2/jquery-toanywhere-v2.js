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
 */
(function($) {
  $.fn.toAnywhere = function(duration) {
    $(this).each(function() {
      console.info(this.id);
      var any = new _anyWhere(this).getAnyWhere();
      $(this).click(function() {
	var $this = $(this);
	$("body, html").animate({
	  scrollTop: $($this.attr("href")).offset().top + "px"
	}, parseInt($this.attr("duration")) || duration);
	return false;
      });
    });
  }
  function _anyWhere(el) {
    this.el = el;
    this.$el = $(el);
  }
  _anyWhere.prototype = {
    getAnyWhere: function() {
      this.setWindowScroll();
    },
    setWindowScroll: function() {
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
