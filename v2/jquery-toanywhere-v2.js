/**
 * 平滑滚动页面到某元素
 *
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
 * 2011/12/13
 *  修改jQuery 插件的实现
 *  加入部分注释
 *  调用后jQuery对象返回
 * 2012/1/9
 *  增加了 anytype 属性
 */
(function($) {
  var Anywhere = {
    DEF_DURATION : 1000,
    ATTR_DURATION : "duration",
    ATTR_ANYTYPE : "anytype",
    $body_html : $("body, html"),
    $window : $(window)
  };
  $.fn.extend({
    toAnywhere: function(duration) {
      return $(this).each(function() {
        new _anyWhere(this, duration).getAnyWhere();
      });
    }
  });

  /**
   * el: 对应的dom对象
   * duration: 执行时间 毫秒
   */
  function _anyWhere(el, duration) {
    this.el = el;
    this.$el = $(el);
    this.duration = parseInt(duration) || Anywhere.DEF_DURATION;
    this.anyType = this.$el.attr(Anywhere.ATTR_ANYTYPE);
  }
  _anyWhere.prototype = {
    build: function() {
      /*
       * IE 6 不支持 fixed 定位，通过css 来实现，见jquery-toanywhere.css
       */
      if (!/MSIE 6/.test(navigator.userAgent)) {
        this.$el.css("position", "fixed");
      } 
      this.$el.css("display", "none");
    },
    getAnyWhere: function() {
      if (this.anyType != "link") {
        this.build();
        this.bindWindowScroll();
      }
      this.bindClick();
    },
    bindClick: function() {
      var duration = this.duration;
      this.$el.click(function() {
        var $this = $(this);
        Anywhere.$body_html.animate({
          scrollTop: $($this.attr("href")).offset().top + "px"
        }, parseInt($this.attr("duration")) || duration);
        return false;
      });
    },
    bindWindowScroll: function() {
      var $this = this.$el;
      Anywhere.$window.bind("scroll", function() {
        $(this).scrollTop() > 0 ? $this.fadeIn("fast") : $this.hide();
      });
    }
  }
})(jQuery);