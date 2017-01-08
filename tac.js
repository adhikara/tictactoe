function initialise (player, choice) {
	this.name = player;
	this.code = choice;
	//choice == "X" ? this.turn = true : this.turn = false;
}

var arenaHTML = '<div id="col1"><div id="cell0" class="cell"></div><div id="cell1" class="cell"></div><div id="cell2" class="cell"></div></div><div id="col2"><div id="cell3" class="cell"></div><div id="cell4" class="cell"></div><div id="cell5" class="cell"></div></div><div id="col3"><div id="cell6" class="cell"></div><div id="cell7" class="cell"></div><div id="cell8" class="cell"></div></div>';


// note: instead of using the traditional row definition to think of the cells, i am using columns.

var arena = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 

var winIf = [[arena[0], arena[1], arena[2]], 
             [arena[3], arena[4], arena[5]],
             [arena[6], arena[7], arena[8]],
             [arena[0], arena[3], arena[6]],
             [arena[1], arena[4], arena[7]],
             [arena[2], arena[5], arena[8]],
             [arena[0], arena[4], arena[8]],
             [arena[2], arena[4], arena[6]],
             ];


$(document).ready(function() {

	function evaluate() {
		console.log("does this work");
	}

	$( "#bX" ).click(function() {
		$("#contents").fadeOut("fast", function() {
			$(this).html(arenaHTML).fadeIn('slow', function() {
				$( ".cell" ).click(function() {
					var change = ($(this).attr("id")).substr(-1);
					if(arena[change] != 1) {
						$(this).text("X");
						console.log("arena updated");
						arena[change] = 1;
					}
				});
				//}
			});
		});
	});

	$( "#bY" ).click(function() {
		$("#contents").fadeOut("fast", function() {
			$(this).html(arenaHTML).fadeIn('slow', function() {
				$( ".cell" ).click(function() {
					$(this).text("O");
					var change = $(this).attr("id");
					change = change.substr(-1);
					console.log(change);
					evaluate();
				});
			});
		});
	});
});


