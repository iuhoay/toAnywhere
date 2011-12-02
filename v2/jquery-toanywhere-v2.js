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
      var $el = $(this);
      var any = _anyWhere.getAnyWhere($el);
      $(this).click(function() {
	var $this = $(this);
	$("body, html").animate({
	  scrollTop: $($this.attr("href")).offset().top + "px"
	}, parseInt($this.attr("duration")) || duration);
	return false;
      });
    });
  }
  var _anyWhere = {
    $el: null,
    el: null,
    local: null,
    getAnyWhere: function(el) {
      this.el = el,
      this.$el = $(this.el);
      this.local = this.$el.attr("any_local");
      this.setLocal();
      this.setWindowScroll();
      return this;
    },
    setLocal: function() {
      if (this.local) {
	var _local_array = this.local.split("|");
	for (i in _local_array) {
	  switch(_local_array[i]) {
	    case "bottom":
	      this.$el.addClass("up_any_bottom");
	      break;
	    case "right":
	      this.$el.addClass("up_any_right");
	      break;
	  }
	}
	return _local_array;
      }
    },
    setWindowScroll: function() {
      var any = this;
      window.onscroll = function() {
	var scrollTop;
	if (document.documentElement && document.documentElement.scrollTop) {
	  scrollTop = document.documentElement.scrollTop;
	} else if (document.body && document.body.scrollTop) {
	  scrollTop = document.body.scrollTop;
	}
	any._setElToggle(scrollTop);
      }
    },
    _setElToggle: function(scrollTop) {
      if (scrollTop > 200) this.$el.addClass("up_any_show");
      else this.$el.removeClass("up_any_show");
    }
  }
})(jQuery);
