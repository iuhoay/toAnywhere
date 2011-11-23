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
