const input = document.querySelector('.input');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.btn');
const wordDisplay = document.querySelector('.word');

let words = ['hello'];
let score = 0;
let isPlaying = false;
const GAME_TIME = 2;
let currentTime;
let interval;

init();

fetch('https://random-word-api.herokuapp.com/word?number=100').then((res) => {
  res.json().then((data) => {
    data.forEach((word) => {
      words.push(word);
    });
  });
});

function init() {
  button.classList.remove('loading');

  // 게임시작 버튼을 누르면
  button.addEventListener('click', () => {
    if (isPlaying) {
      return;
    }
    currentTime = GAME_TIME;
    isPlaying = true;
    remainingTime();
    isPlayingGame();
    showWord();
  });
}

// 게임중에 따라 버튼 텍스트&스타일 변경 (수정추가 필요)
function isPlayingGame() {
  if (isPlaying) {
    input.value = '';
    input.focus();

    // 버튼에 loading 클래스가 있으면,
    if (button.classList.contains('loading')) {
      button.classList.remove('loading'); // 제거하고
      button.innerText = '게임시작'; // 게임시작으로 변경
    } else {
      button.classList.add('loading'); // 클래스 추가하고
      button.innerText = '게임중'; // 게임중으로 변경
    }
  } else {
    button.classList.remove('loading');
    button.innerText = '게임시작';
  }
}

function showWord() {
  wordDisplay.innerText = words[Math.floor(Math.random() * words.length)];
}

// 남은 시간 타이머 (0보다 크면 1씩 감소한다.)
function remainingTime() {
  if (isPlaying) {
    interval = setInterval(() => {
      wordMatch(); // 정답이 맞는지 계속 확인

      timeDisplay.innerText = currentTime;
      if (timeDisplay.innerText == 0) {
        score = 0;
        scoreDisplay.innerText = score;
        isPlaying = false;
        clearInterval(interval);
        isPlayingGame();
      }
      timeDisplay.innerText > 0 ? currentTime-- : (isPlaying = false);
    }, 1000);
  } else {
    isPlaying = false;
  }
}

// 입력값과 문제가 동일한지 확인
function wordMatch() {
  input.addEventListener('input', () => {
    if (isPlaying) {
      if (wordDisplay.innerText.toLowerCase() === input.value.toLowerCase()) {
        score += 1;
        scoreDisplay.innerText = score;
        input.value = '';
        currentTime = GAME_TIME;
        showWord();
      }
    }
  });
}
