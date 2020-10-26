let activePlayer = 'X'; // keeps track of player turn

let selectedSquares = []; // stores array of moves, used in win condition

function placeXOrO(squareNumber) {  // function used to place image in selected square
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
    let select = document.getElementById(squareNumber);
    if (activePlayer === 'X') {
        select.style.backgroundImage = 'url("images/xenomorph.jpg")';
    } else {
        select.style.backgroundImage = 'url("images/predator.jpg") ';
    }
    selectedSquares.push(squareNumber + activePlayer);
    checkWinCondition();  //checks win condition before next move
    if (activePlayer === 'X') {
        activePlayer = 'O';
    } else {
        activePlayer = 'X';
    }


    audio('./media/predator.mp3'); // sound used when a move is made

    if (activePlayer === 'O') {  // loop used to disable clicks made by the player
        disableClick();
        setTimeout(function (){ computersTurn(); }, 2000);
    }
    return true;
    }

    function computersTurn() { // function used by computer when it is its turn
        let success = false;
        let pickAsquare;
        while (!success) {
            pickAsquare = String(Math.floor(Math.random() * 9)) ; // selects a random square to make a move so long as it has not been selected
            if (placeXOrO(pickAsquare)){
                placeXOrO(pickAsquare);
                success = true;
            };
        }
    }
}

function checkWinCondition() {  // checks square lines to determine if a player has won
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }  // first part checks win condition, second part draws the win line.
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 305, 558); }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 508); }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    else if (selectedSquares.length >= 9) {  // used in determining a tie. if all 9 spaces are filled and elif/if statements above are not satisfied a tie is decided
        audio('./media/xeno.mp3') ;
        setTimeout(function () { resetGame(); }, 2000); // resets the board in 2 seconds(extended to fill time to accomodate sound bite)
    }

function arrayIncludes(squareA, squareB, squareC) { // the function used to decide a winner
    const a = selectedSquares.includes(squareA) ;
    const b = selectedSquares.includes(squareB) ;
    const c = selectedSquares.includes(squareC) ;

    if (a === true && b === true && c === true) {return true;}
    }
}

function disableClick() {  // disable click function makes body element temporarily unclickable
    body.style.pointerEvents = 'none';
    setTimeout(function () {body.style.pointerEvents = 'auto';}, 2000);
}

function audio(audioURL) { // function to handle audio
    let audio = new Audio(audioURL);
    audio.play();
}


function drawWinLine(coordX1, coordY1, coordX2, coordY2) {  // function executed when a winner was decided and to reveal where the win took place by illustrating it
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;



    function animateLineDrawing() {  // creates a gradual line animation
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608);
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.lineWidth = 10;
        c.strokeStyle = 'rgba(200, 255, 33, .8)';
        c.stroke();
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10; }
            if (y < y2) { y += 10; }
            if (x >= x2 && y>= y2) {cancelAnimationFrame(animationLoop); }
        }

        if (x1 <= x2 && y1 >= y2) {  // necessary for the 6, 4, 2 win condition
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }

    function clear() { // clears the game board
        const animationLoop = requestAnimationFrame(clear) ;
        c.clearRect(0, 0, 608, 608);
        cancelAnimationFrame(animationLoop);
    }
    disableClick(); 
    audio('./media/winSound.mp3'); // produces the win sound
    animateLineDrawing();
    setTimeout(function() { clear(); resetGame(); }, 2000)
}

function resetGame() {  // resets the game to be played again
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        square.style.backgroundImage = '';
    }
    selectedSquares = [];
}

