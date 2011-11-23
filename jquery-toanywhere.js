/**
 * 平滑滚动页面到某元素
 * <a href="body" id="toBody">to Top</a>
 * $("#toBody").toAnywhere();
 * 
 *
 * @author wuyaohui
 * email: charsky.wu@gmail.com
 * 2011/11/23 
 */
(function($) {
	$.fn.toAnywhere = function() {
		$(this).click(function() {
			$("body, html").animate({
				scrollTop: $($(this).attr("href")).offset().top + "px"
			},{
				duration: 500,
				easing: "swing"
			});
			return false;
		});
	}
})(jQuery);
