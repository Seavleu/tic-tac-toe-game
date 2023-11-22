// function setSize(elementClass, size) {
//   $(elementClass).css({
//     width: size + "px",
//     height: size + "px",
//   });
// }
$(document).ready(function () {
  // Code inside this block runs when the document is fully loaded and ready to be manipulated.
  $(".dots1").click(function () {
    // When an element with the class "dots" is clicked, hide options and a paragraph, show table cells, set aiCo and huCo, and log "white".
    $(".options, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    aiCo = "#333"; // sword
    huCo = "white"; // turtle
    console.log("white");
    // setSize(".dots1",7)
  });
  $(".dots2").click(function () {
    // When an element with the class "dots2" is clicked, hide options and a paragraph, show table cells, and log "black".
    $(".options, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    console.log("black");
    // setSize(".dots2", 7);
  });
  $("td").click(function () {
    // When any table cell is clicked, call the move function with huPlayer and huCo, and log "clicked".
    move(this, huPlayer, huCo);
    console.log("clicked");
  });
});

var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "#333"; // sword
var huCo = "white"; // turtle
// var aiCo = "url('/dots1.png')";
// var huCo = "url('/dots2.png')";

function move(element, player, color) {
  console.log("element" + element.id);
  if (board[element.id] != "P" && board[element.id] != "C") {
    round++;
    $(element).css("background-color", color);
    // $(element).css("background-color", "url(" + color + ")");
    board[element.id] = player;
    console.log(board);

    if (winning(board, player)) {
      setTimeout(function () {
        alert("Maricle!!! YOU WIN");
        reset();
      }, 500);
      return;
    } else if (round > 8) {
      setTimeout(function () {
        alert("Told ya, it's impossible!!!😌 TIE");
        reset();
      }, 500);
      return;
    } else {
      round++;
      var index = minimax(board, aiPlayer).index;
      var selector = "#" + index;
      $(selector).css("background-color", aiCo);
      board[index] = aiPlayer;
      console.log(board);
      console.log(index);
      if (winning(board, aiPlayer)) {
        setTimeout(function () {
          alert("Just give up!!!😂 YOU LOSE");
          reset();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function () {
          alert("tie");
          reset();
        }, 500);
        return;
      }
    }
  }
}

function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").css("background-color", "transparent");
}

function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10,
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10,
    };
  } else if (array.length === 0) {
    return {
      score: 0,
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

//available spots
function avail(reboard) {
  return reboard.filter((s) => s != "P" && s != "C");
}

// winning combinations
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
