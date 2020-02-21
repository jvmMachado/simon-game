const buttonColours = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let numberOfClicks = 0;
$('h1').toggleClass('hide');
$('.start').on('click', function() {
  if (started === false) {
    nextSequence();
    started = true;
    $('.start').toggleClass('hide');
    $('h1').toggleClass('hide');
    $('h2').html('');
  } else {
  }
});

$('.btn').on('click', function() {
  if (started) {
    const userChosenColour = $(this).attr('id');

    userClickedPattern.push(userChosenColour);

    playSound(this);

    animatePress(this);

    if (
      userClickedPattern[userClickedPattern.length - 1] !==
      gamePattern[numberOfClicks]
    ) {
      error();
      return;
    }
    numberOfClicks++;

    if (numberOfClicks === gamePattern.length) {
      checkSequence();
      setTimeout(nextSequence, 1000);
      numberOfClicks = 0;
    }
}
});

function playSound(btn) {
  const audioName = $(btn).attr('id');
  const audioFile = new Audio();

  audioFile.src = `/sounds/${audioName}.mp3`;
  audioFile.play();
}

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  const nextButton = $(`#${randomChosenColour}`);

  userClickedPattern = [];

  level++;
  $('h1').text(`Level ${level}`);

  gamePattern.push(randomChosenColour);

  nextButton
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(nextButton);
}

function animatePress(btn) {
  $(btn).toggleClass('pressed');
  setTimeout(function() {
    $(btn).toggleClass('pressed');
  }, 90);
}

function checkSequence() {
  // if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern))
  if (
    userClickedPattern[userClickedPattern.length - 1] ===
    gamePattern[gamePattern.length - 1]
  ) {
    $('h1').text('Tudo ok');
  } else {
    error();
  }
}

function error() {
  $('body').toggleClass('game-over');
  setTimeout(function() {
    $('body').toggleClass('game-over');
  }, 200);

  $('h1').html('Errou!');

  const wrongAudio = new Audio();
  wrongAudio.src = '/sounds/wrong.mp3';
  wrongAudio.play();
  
  $('.start').toggleClass('hide');
  $('.re').removeClass('spanhide');
  $('h1').toggleClass('hide');
  $('h2').html(`Você foi até o level ${level}`);

  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
  numberOfClicks = 0;
}
