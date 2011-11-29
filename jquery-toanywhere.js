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
			$("body, html").animate({
				scrollTop: $($this.attr("href")).offset().top + "px"
			}, parseInt($this.attr("duration")) || duration);
			return false;
		});
	}
})(jQuery);
