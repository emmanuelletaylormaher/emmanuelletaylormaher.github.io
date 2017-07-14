(function (){
"use strict";

/***************AUDIO VARIABLES**************/
// backround music
var simonMusic = new Audio('/sound/simonMusicFinal.mp3');
var musicCheck = false;
//synth sounds
var synthHead = $("#synthHead")[0];
var synthLeftArm = $("#synthLeftArm")[0];
var synthRightArm = $("#synthRightArm")[0];
var synthAbs = $("#synthAbs")[0];
//misc sounds
var simonSaysFight = $("#simonSaysFight")[0];
var simonTaunt = $("#simonTaunt")[0];
var simonLaugh = $("#simonLaugh")[0];
var punchSFX = $("#punchSFX")[0];
/****************GAME VARIABLES ********************/
var sequence = [];
var iteration = 0;
var count = 0;
var round = 1;
var speed = 1500;
var doc = $(document);

/********************* MUSIC FUNCTIONS *******************/

function toggleMusic(){
console.log("Toggle Music");
	if (musicCheck) {
		console.log("Music Check was true, starting Music");
		musicCheck = false;
		simonMusic.addEventListener('ended',musicLoop,musicCheck)

		function musicLoop(){
			this.currentTime = 0;
			this.play();
		}
		simonMusic.play();
	}else {
		console.log('Music Check was false, Pause Music');
		simonMusic.pause();
		simonMusic.currentTime = 0;
		musicCheck = true;
	}
}
/************************ GAME FUNCTIONS ******************/
function startGame(){
	simonLaugh.currentTime = 0;
	simonSaysFight.play();
	randomNumber();
	$('#tattoo').off('click');
}
function gameOver(){
	disableEvents();
	simonTaunt.play();
	$('#tattoo').on('click',startGame)
	sequence = [];
	iteration = 0;
	count = 0;
}


//random number generator from 1-4
function randomNumber(){
	disableEvents();
	var number = parseInt(Math.random() * (5 - 1) + 1);
	$('#round').append(round);
	if (round % 5 == 0) {
		speed -= 50;
	}else if (speed == 400 ) {
		speed = 350;
	}
	console.log("The round is: " + round);
	console.log("The count is: " + count);
	console.log("the speed is: " + speed);
	sequence.push(number);
  console.log(sequence);
	boxSelected(speed);
};


 // runs through sequence array and changes opacity of boxes determined by number value
function boxSelected(){
	setTimeout(function(){

		var changeOpacity = setInterval(function(){
			if (count < sequence.length) {
				if (sequence[count] == 1) {
					$('#head').toggleClass('head').toggleClass('headSelect')
					synthHead.play();
					setTimeout(function(){
						$('#head').toggleClass('headSelect').toggleClass('head')
						synthHead.currentTime = 0;
					},400);
					count++;
				}else if (sequence[count] == 2) {
					$('#leftArm').toggleClass('leftArm').toggleClass('leftArmSelect')
					synthLeftArm.play();
					setTimeout(function(){
						$('#leftArm').toggleClass('leftArmSelect').toggleClass('leftArm');
						synthLeftArm.currentTime = 0;
					},400);
					count++;
				}else if (sequence[count] == 3) {
					$('#rightArm').toggleClass('rightArm').toggleClass('rightArmSelect')
					synthRightArm.play();
					setTimeout(function(){
						$('#rightArm').toggleClass('rightArmSelect').toggleClass('rightArm')
						synthRightArm.currentTime = 0;
					},400);
					count++
				}else if (sequence[count] == 4) {
					$('#abs').toggleClass('abs').toggleClass('absSelect')
					synthAbs.play();
					setTimeout(function(){
						$('#abs').toggleClass('absSelect').toggleClass('abs')
						synthAbs.currentTime = 0;
					},400);
					count++
				}
			}else {
				attachEvents();
				clearInterval(changeOpacity);
				count = 0;
				console.log("All Done");
			}
		},speed)
	},500);
}

function compare(input){
	console.log('--- compare! ---');
	console.log('input: ' + input);
	console.log('sequence: ' + sequence + ' length: ' + sequence.length);
	console.log('iteration: ' + iteration);
  if ((iteration - 1) < sequence.length) {
    if (sequence[iteration-1] == input ) {
      console.log("GOOD");
			if (iteration == sequence.length) {
				round++;
		    iteration = 0;
		    randomNumber();
			}
    }else {
      console.log("GAME OVER");
			gameOver();
    }
  }
}

//assigning the numbers to each keypress


function attachEvents(){
	$("#head").on('click',head)
	doc.on('keyup',upArrow)

	$("#leftArm").on('click',leftArm)
	doc.on('keyup',leftArrow)

	$("#rightArm").on('click',rightArm)
 	doc.on('keyup',rightArrow)

	$("#abs").on('click',abs)
	doc.on('keyup',downArrow)
}

function disableEvents(){
	doc.off('keyup');
	$("#head").off('click')
	$("#leftArm").off('click')
	$("#rightArm").off('click')
	$("#abs").off('click')
}

function upArrow(e){
	console.log(e);
	e.preventDefault();
		if(e.keyCode == 38){
			head();
		};
}

function leftArrow(e){
	e.preventDefault();
		if(e.keyCode == 37){
			leftArm();
		};
}

function rightArrow(e){
	e.preventDefault();
		if(e.keyCode == 39){
			rightArm();
		};
}

function downArrow(e){
	e.preventDefault();
		if(e.keyCode == 40){
			abs();
		};
}
function head(){
	$("#head").toggleClass('head').toggleClass('headHit')
	punchSFX.play();
	iteration++;
	setTimeout(function(){
		$("#head").toggleClass('headHit').toggleClass('head');
		punchSFX.currentTime = 0;
		compare(1);
	},250)
}

function leftArm(){
	$("#leftArm").toggleClass('leftArm').toggleClass('leftArmHit')
	punchSFX.play();
	iteration++;
	setTimeout(function(){
		$("#leftArm").toggleClass('leftArmHit').toggleClass('leftArm')
		punchSFX.currentTime = 0;
		compare(2);
	},250)
}

function rightArm(){
	$("#rightArm").toggleClass('rightArm').toggleClass('rightArmHit')
	punchSFX.play();
	iteration++;
	setTimeout(function(){
		$("#rightArm").toggleClass('rightArmHit').toggleClass('rightArm')
		punchSFX.currentTime = 0;
		compare(3);
	},250)
}
function abs(){
	$("#abs").toggleClass('abs').toggleClass('absHit')
	punchSFX.play();
	iteration++;
	setTimeout(function(){
		$("#abs").toggleClass('absHit').toggleClass('abs')
		punchSFX.currentTime = 0;
		compare(4);
	},250)
}
$("#tattoo").on('click',startGame);
$('#toggleMusic').click(toggleMusic)
simonMusic.play();
console.log(musicCheck);


})();

// Enter: 13
// Up: 38
// Down: 40
// Right: 39
// Left: 37
