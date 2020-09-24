var playerOne = prompt("Player one, name?(blue)");
var playerOneColor = "rgb(86, 151, 155)";

var playerTwo = prompt("player two, name?(red)");
var playerTwoColor = "rgb(237, 45, 73)";

var game_on = true;
var table = $("table tr");

function reportWin(rowNum, colNum) {
  console.log("You Won at this row, col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color", color);
}

function returnColor(rowIndex, colIndex) {
  return table
    .eq(rowIndex)
    .find("td")
    .eq(colIndex)
    .find("button")
    .css("background-color");
}

function checkBottom(colIndex) {
  var colorReport = returnColor(5, colIndex);
  for (var row = 5; row > -1; i--) {
    colorReport = returnColor(row, colIndex);
    if (colorReport === "rgb(128, 128, 128)") {
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgba(128,128,128)" &&
    one !== undefined
  );
}

// horizonatlwin

function horizonatlWin() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        console.log("horiz");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function vericalWin() {
  for (var row = 0; col < 7; row++) {
    for (var col = 0; row < 3; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        console.log("ver");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

function sideWin() {
  for (var row = 0; col < 5; row++) {
    for (var col = 0; row < 7; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        console.log("side");
        reportWin(row, col);
        return true;
      } else if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row - 1, col + 1),
          returnColor(row - 2, col + 2),
          returnColor(row - 3, col + 3)
        )
      ) {
        console.log("side");
        reportWin(row, col);
        return true;
      } else {
        continue;
      }
    }
  }
}

// game logic

var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$("h3").text(playerOne + " it is your turn");

$(".board button").on("click", function () {
  var col = $(this).closest("td").index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col, currentColor);
  if (horizonatlWin() || vericalWin() || sideWin()) {
    $("h1").text(currentName + " You have won!");
    $("h3").fadeOut("fast");
    $("h2").fadeOut("fast");
  }
  currentPlayer = currentPlayer * -1;
  if (currentPlayer === 1) {
    currentName = playerOne;
    $("h3").text(currentName + " it is your turn");
    currentColor = playerOneColor;
  } else {
    currentName = playerTwo;
    $("h3").text(currentName + " it is your turn");
    currentColor = playerTwoColor;
  }
});
