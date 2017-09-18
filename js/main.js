(function(){
	"use strict";

	var portfolioHover = $(".portfolioHover");

	$(document).ready(function(){
		$("#main-content").fadeIn();
	});

	$(".portfolio").hover(function(){
		$(this).css("background-color", "black");
		}, function(){
		$(this).css("background-color", "white");
	});

})();