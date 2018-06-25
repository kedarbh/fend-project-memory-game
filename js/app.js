/*
 * Create a list that holds all of your cards
 */
let card = document.querySelectorAll('.card');
let cards = Array.from(card);

const deck = document.querySelector('.deck');

let openCards = [];

let moves = 0;

let moveCounts = document.querySelector('.moves');

let stars = document.getElementsByClassName('fa-star');

let hours= 0,
	minutes = 0,
	seconds = 0,
	t;

let time = document.querySelector('.time');

let matchCard = document.getElementsByClassName('match');

let messageBox = document.querySelector('.complete-message');

const closePopup = document.querySelector('.popup-close');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//@description shuffle card
//@param {array} array
//@returns shuffled cards
//ref: Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//@description start the game
function start() {
	//load cards with shuffle feature
	shuffledCards = shuffle(cards);
	//replace the contents in deck with shuffled cards
	deck.innerHTML = '';
	//remove classes from the cards and append cards in deck
	// TODO: check the performance of this code
	shuffledCards.forEach(function(item, index, array) {
		item.classList.remove('match', 'open', 'show','disabled');
		deck.appendChild(item);
	});
	//reset moves to 0
	moves = 0;
	moveCounts.innerHTML = moves + ' Moves';
	//reset timer
	clearTimeout(t);
	time.textContent = '00:00:00';
	hours = 0;
	minutes = 0;
	seconds = 0;
	//reset rating
	for( i= 0; i < 3; i++){
        stars[i].style.color = '#e3e634';
    }
}

// @description display content of cards
function displayCard() {
	this.classList.add('open', 'show', 'disabled');
}

// @description check whether the flipped card matches
function checkMatch() {
	openCards.push(this);

	if(openCards.length === 2) {
		countMoves();
		if (openCards[0].innerHTML === openCards[1].innerHTML) {
			openCards.forEach(function(item){
				item.classList.add('match');
				item.classList.remove('show','open');
			});
			openCards = [];
		} else {
			openCards.forEach(function(item) {
				setTimeout(function() {
					item.classList.remove('show','open','disabled');
				}, 500);
			});
			openCards = [];
		}
	}
}

// @description count moves, track time and ratings
function countMoves() {
	moves++;
	if (moves === 1) {
		moveCounts.innerHTML = moves + ' Move';
		startTime();
	} else{
		moveCounts.innerHTML = moves + ' Moves';
	}

	//ratings
	if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.color = "#d3d3d3";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.color = "#d3d3d3";
            }
        }
    }
}

// @description add time to the timer
function timer() {
	seconds++;
	if(seconds >= 60) {
		minutes++;
		seconds = 0;
		if(minutes >= 60) {
			hours++;
			minutes = 0;
		}
	}

	time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

	startTime();
}

// @description start to count time
function startTime() {
	t = setTimeout(timer, 1000);
}


function completeGame() {
	if(matchCard.length === 16) {

		clearTimeout(t);
		//make congratulation box appear
		messageBox.style.visibility = 'visible';
		let totalMove = document.querySelector('.total-move');
		let totalTime = document.querySelector('.total-time');
		let finalStar = document.querySelector('.ratings');

		totalTime.innerHTML = time.innerHTML;
		totalMove.innerHTML = moveCounts.innerHTML;
		finalStar.innerHTML = document.querySelector('.stars').innerHTML;

		closeInfoBox();
	}
}

// @description reset the game
function restart() {
	messageBox.style.visibility = 'hidden';
	start();
}

// @description closes the popup
function closeInfoBox() {
	closePopup.addEventListener('click', function() {
		restart();
	});
}

//start game
document.body.onload = start();

//loop on card to handle events
shuffledCards.forEach(function(item) {
	item.addEventListener('click', displayCard);
	item.addEventListener('click', checkMatch);
	item.addEventListener('click', completeGame);
});

