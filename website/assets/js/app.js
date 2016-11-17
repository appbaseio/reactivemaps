$(document).ready(function() {

	var owl = $('.owl-carousel').owlCarousel({
		loop: true,
		margin: 15,
		nav: false,
		center: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			}
		}
	});
	$('.owl-custom-nav.left-nav').click(function() {
		owl.trigger('prev.owl.carousel', [300]);
	});
	$('.owl-custom-nav.right-nav').click(function() {
		owl.trigger('next.owl.carousel', [300]);
	});

});
