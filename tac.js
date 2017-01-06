function initialise (player, choice) {
	this.name = player;
	this.code = choice;
	//choice == "X" ? this.turn = true : this.turn = false;
}

var arena = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 

$(document).ready(function() {
	$( "#bX" ).click(function() {
		$("#contents").fadeOut("fast", function() {
			$(this).html("Ok, let's begin your romantic journey").fadeIn('slow');
		});
	});
	$( "#bY" ).click(function() {
		//alert( "Handler for .click() called." );
	});
});
