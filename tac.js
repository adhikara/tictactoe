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

var available = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var turn = 1; // 1 = player; 0 = computer
var playerSign = "";
var computerSign = "";

$(document).ready(function() {

	function weakComputer() {
		//if(turn===0) {
			var item = Math.floor(Math.random()*available.length);
			here = available[item];
			arena[here] = 2;
			available.splice(item, 1);
			$( "#cell"+here ).html(computerSign);
			turn = 1;
		//}
	}

	function eventX(token) {
		$( ".cell" ).click(function() {
			if(turn === 1) {
				var change = ($(this).attr("id")).substr(-1);
				if(arena[change] != 1) {

					var index = available.indexOf(change);
					available.splice(index, 1);

					$(this).text(token);
					console.log("arena updated");
					arena[change] = 1;
					turn = 0;
					console.log(turn);
					weakComputer();
				}
			}
		});
	}

	$( "#bX" ).click(function() {
		$("#contents").fadeOut("fast", function() {
			playerSign = "X";
			computerSign = "O";
			$(this).html(arenaHTML).fadeIn('slow', function() {
				eventX(playerSign);
				//}
			});
		});
	});

	$( "#bY" ).click(function() {
		$("#contents").fadeOut("fast", function() {
			playerSign = "O";
			computerSign = "X";
			$(this).html(arenaHTML).fadeIn('slow', function() {
				eventX(computerSign);
			});
		});
	});
});


