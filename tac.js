var arenaHTML = '<div id="status">status: play the game!</div><br/><div id="col1"><div id="cell0" class="cell"></div><div id="cell1" class="cell"></div><div id="cell2" class="cell"></div></div><div id="col2"><div id="cell3" class="cell"></div><div id="cell4" class="cell"></div><div id="cell5" class="cell"></div></div><div id="col3"><div id="cell6" class="cell"></div><div id="cell7" class="cell"></div><div id="cell8" class="cell"></div></div>';


// note: instead of using the traditional row definition to think of the cells, i am using columns.

var arena = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 

var winIf = [[0, 1, 2],  // 
             [3, 4, 5],
             [6, 7, 8],
             [0, 3, 6],
             [1, 4, 7],
             [2, 5, 8],
             [0, 4, 8],
             [2, 4, 6],
             ];

var available = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var turn = 1; // 1 = player; 0 = computer
var playerSign = "";
var computerSign = "";

$(document).ready(function() {

	function isGridFull () {
		var lesson = 0;
		for(i=0; i<arena.length; i++) {
			if(arena[i] === 0) {
				lesson = 1;
			}
		}
		return lesson;
	}

	function resetGrid() {
		arena = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		for(i=0; i<arena.length; i++) {
			$( "#cell"+i ).text("");
		}
	}

	function hasSomeoneWon() {
		var record = "";
		for(i=0; i<winIf.length; i++) {
			for(j=0; j<(winIf[i]).length; j++) {
				record += arena[winIf[i][j]].toString();
			}
			console.log("this is the record: " + record);
			if(record === "222") {
				$("#status").text("status: the computer won!");
				setTimeout(function(){
					resetGrid();
					turn = 1;
					$("#status").text("status: play again!");
				}, 2000);
				break;

			} else if (record === "111") {
				$("#status").text("status: the human won!");
				setTimeout(function(){
					resetGrid();
					turn = 1;
					$("#status").text("status: play again!");
				}, 4000);
				break;

			} else {
				$("#status").text("status: keep playing...");
			}
			record = "";
		}
	}

	function checkPoint(){ // if grid is full, it will restart the game
		var checkpoint = isGridFull();
		if(checkpoint == 0) {
			$("#status").text("status: game is over");
			setTimeout(function(){
				resetGrid();
				$("#status").text("status: play again!");
			}, 2000);
		}
	}


	function weakComputer() { // intentionally weak algorithm so that the game does not end in ties; that's boring.
			var item = Math.floor(Math.random()*available.length);
			here = available[item];
			arena[here] = 2;
			available.splice(item, 1);

			$( "#cell"+here ).text(computerSign);

			turn = 1;
			hasSomeoneWon();
			checkPoint();
	}

	function eventX(token) {
		$( ".cell" ).click(function() {
			if(turn === 1) {
				var change = ($(this).attr("id"));
				change = Number(change.substring(4));
				if(arena[change] === 0) {

					var index = available.indexOf(change);

					console.log(index);
					available.splice(index, 1);
					console.log(available);

					$(this).text(token);
					console.log(arena);
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
				eventX(playerSign);
			});
		});
	});
});


