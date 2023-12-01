import { state } from "./State.js";

// Добавил в твой скрипт переменную счётчика кликов
// и закинул ее в локалку
let clicks = 0;
clicks = +localStorage.getItem("clicks");
// мне это нужно для того что бы делать статистику
// и что бы не делать еще один обработчик у себя просто добавил 4 строки кода тут

function incrementD() {
  let spanElement = document.getElementById("emeraldsCounter");
  console.log(spanElement.textContent);
  let currentScore = parseInt(spanElement.textContent);
  //console.log(currentScore);
  let newScore = currentScore + 1;
  clicks++;
  localStorage.setItem("clicks", clicks);
  state.score = newScore;
  spanElement.textContent = newScore;
}

document.getElementById("bigButton").addEventListener("click", function () {
  incrementD();
  playClickSound();
  createTransformAndRemoveImage();
});

function playClickSound() {
  let audio = new Audio("sound/udar-po-metallicheskomu-predmetu.mp3"); // Указывает путь путь к звуковому файлу
  audio.play();
  audio.volume = 0.5;
}

function createTransformAndRemoveImage() {
  ///сщздание кристаллов при клике и добавление в див
  // Создание элемента <img>
  let img = document.createElement("img");
  img.id = "dinamicImg";

  img.src = "img/emerald.png";

  img.classList.add("transformed");

  let left_div = document.getElementById("infoLeft");
  left_div.appendChild(img);

  setTimeout(function () {
    //трансформаци кристалика

    img.classList.remove("transformed");

    // Удаление изображения после завершения трансформации
    setTimeout(function () {
      left_div.removeChild(img);
    }, 500);
  }, 0);
}

//#region  фоновая музыка
document.addEventListener("click", function () {
  let backgroundMusic = document.getElementById("backgroundMusic");
  let backgroundMusic1 = document.getElementById("backgroundMusic1");
  // Воспроизведение музыки

   backgroundMusic.play();
   backgroundMusic1.play();
  // Пауза музыки
  // backgroundMusic.pause();

  // Изменение громкости (значение от 0.0 до 1.0)
  //backgroundMusic.volume = 0.3;
  //backgroundMusic1.volume = 0.3;
});

let volumeControl = document.getElementById("rangeinput");
volumeControl.addEventListener("input", function () {
  backgroundMusic.volume = volumeControl.value;
  backgroundMusic1.volume = volumeControl.value;
});
//#endregion

let pulseImage = document.getElementById("imgButton");

pulseImage.addEventListener("click", function () {
  pulseImage.classList.add("pulse");

  setTimeout(function () {
    pulseImage.classList.remove("pulse");
  }, 200);
});
//#region  дождь из брилиантов
function createDiamond() {
  let l_div = document.getElementById('infoLeft')
  const diamond = document.createElement('img');
  diamond.src = 'img/emerald.png';
  diamond.style.width = '30px'; 
  diamond.style.height = '30px';
  diamond.style.left = `${Math.random() * (l_div.offsetWidth-20)}px`;
  diamond.style.top = '0';
  diamond.style.zIndex = '1'
  diamond.classList.add('falling');
  l_div.appendChild(diamond);
}
function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


let minInterval = 1000; 
let maxInterval = 20000; 




function createDiamondRain(numDiamonds) {
  for (let i = 0; i < numDiamonds; i++) {
    setInterval(function() {
      
    
      var randomInterval = getRandomInterval(minInterval, maxInterval);
      createDiamond();
    
    }, getRandomInterval(minInterval, maxInterval));
    //createDiamond();
  }
}

createDiamondRain(10);
//#endregion