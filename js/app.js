/*
 * Create a list that holds all of your cards
 */
let card = document.querySelectorAll('.card');
let cards = Array.from(card);

const deck = document.querySelector('.deck');

let openCards = [];

let moves = 0;

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
		item.classList.remove('match', 'open', 'show');
		deck.appendChild(item);
	});

	//reset moves to 0
	moves = 0;
}

document.body.onload = start();

function displayCard() {
	this.classList.add('open', 'show', 'disabled')
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

let moveCounts = document.querySelector('.moves');
let stars = document.getElementsByClassName('fa-star');

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

let hours= 0,
	minutes = 0,
	seconds = 0,
	t;

let time = document.querySelector('.time');
let matchCard = document.getElementsByClassName('match');

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
		//console.log('game complete');
		clearTimeout(t);

		let totalMove = document.querySelector('.total-move');
		let totalTime = document.querySelector('.total-time');
		let finalStar = document.querySelector('.ratings');
		totalTime.innerHTML = time.innerHTML;
		totalMove.innerHTML = moveCounts.innerHTML;
		// finalStar.innerHTML =


	}
}



//loop on card to handle events
shuffledCards.forEach(function(item) {
	item.addEventListener('click', displayCard);
	item.addEventListener('click', checkMatch);
	item.addEventListener('click', completeGame);
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
