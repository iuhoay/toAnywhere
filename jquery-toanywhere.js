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
 */
(function($) {
	$.fn.toAnywhere = function(duration) {
		$(this).click(function() {
			var $this = $(this);
			var self_duration = parseInt($this.attr("duration"));
			$("body, html").animate({
				scrollTop: $($this.attr("href")).offset().top + "px"
			}, self_duration || duration);
			return false;
		});
	}
})(jQuery);
