$(document).ready(function() {
	function handleResponsive() {
		var tabHeight = $('.tab-pane.fade.in .img-container').height();
		$('.tab-pane .img-container').css({
			'height': tabHeight
		});
	}
	handleResponsive();
	$(window).resize(function() {
		handleResponsive();
	})

});