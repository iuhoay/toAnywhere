/**
 * 平滑滚动页面到某元素
 * <a href="body" id="toBody" duration="slow">to Top</a>
 *
 * duration = slow | fast | millisecond
 *
 *
 * $("#toBody").toAnywhere(int duration);
 * 
 *
 * @author wuyaohui
 * https://github.com/wuyaohui/toAnywhere
 * email: charsky.wu@gmail.com
 * 2011/11/23 
 */
(function($) {
	$.fn.toAnywhere = function(duration) {
		if (!(duration = parseInt(duration))) duration = "slow";
		$(this).click(function() {
			var $this = $(this);
			var self_duration = parseInt($this.attr("duration"));
			$("body, html").animate({
				scrollTop: $($this.attr("href")).offset().top + "px"
			}, self_duration ? self_duration : duration);
			return false;
		});
	}
})(jQuery);
