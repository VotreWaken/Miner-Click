import { state } from './State.js';



 function incrementD() {
    
    let spanElement = document.getElementById('emeraldsCounter');
    console.log(spanElement.textContent);
    let currentScore = parseInt(spanElement.textContent);
     //console.log(currentScore);
    let newScore = currentScore + 1;
    state.score = newScore;
    spanElement.textContent = newScore;
  }


  document.getElementById('bigButton').addEventListener('click', function() 
  {

    incrementD();
    playClickSound();
    createTransformAndRemoveImage()
  });

   function playClickSound() {
    
   let audio = new Audio("sound/udar-po-metallicheskomu-predmetu.mp3"); // Указывает путь путь к звуковому файлу
   audio.play();
   audio.volume = 0.5;
}

function createTransformAndRemoveImage() {
  // Создание элемента <img>
  let img = document.createElement('img');
   img.id = 'dinamicImg';
  // Установка атрибута src (путь к изображению)
  img.src = 'img/emerald.png';

  // Добавление класса для применения стилей трансформации
  img.classList.add('transformed');

  // Добавление элемента <img> к body (вы можете выбрать другой контейнер)
  let left_div = document.getElementById('infoLeft');
 left_div.appendChild(img);

  // Выполнение трансформации (в данном случае, добавление класса)
  // Можете изменить этот блок в соответствии с вашими требованиями для трансформации
  setTimeout(function () {
    // Время для отображения изображения перед трансформацией

    // Удаление класса (можете изменить это на другие операции трансформации)
    img.classList.remove('transformed');

    // Удаление изображения после завершения трансформации
    setTimeout(function () {
      left_div.removeChild(img);
    }, 500); // Например, через 1 секунду после трансформации
  }, 0); // Передача 0 миллисекунд для выполнения в следующем доступном кадре анимации
}

//#region  фоновая музыка
document.addEventListener('click', function () {
  let backgroundMusic = document.getElementById('backgroundMusic');
  let backgroundMusic1 = document.getElementById('backgroundMusic1')
  // Воспроизведение музыки
  
  backgroundMusic.play();
  backgroundMusic1.play();
  // Пауза музыки
  // backgroundMusic.pause();

  // Изменение громкости (значение от 0.0 до 1.0)
  backgroundMusic.volume = 0.3;
  backgroundMusic1.volume = 0.3;
  
});
//#endregion