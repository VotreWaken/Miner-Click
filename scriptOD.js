


 function incrementD() {
    
    let spanElement = document.getElementById('mySpan1');
    //console.log(spanElement.textContent);
    let currentScore = parseInt(spanElement.textContent);
     //console.log(currentScore);
    let newScore = currentScore + 1;

    spanElement.textContent = newScore;
  }


  document.getElementById('bigButton').addEventListener('click', function() 
  {

    incrementD();
    playClickSound();
 
  });

   function playClickSound() {
    
   let audio = new Audio("sound/udar-po-metallicheskomu-predmetu.mp3"); // Указывает путь путь к звуковому файлу
   audio.play();
   audio.volume = 0.5;
}


document.addEventListener('DOMContentLoaded', function () {
  var myElement = document.getElementById('imgButton');

  myElement.addEventListener('click', function () {
    // Добавляем класс "clicked" для анимации тени
    myElement.classList.add('clicked');

    // Убираем класс "clicked" через 0.5 секунды для сброса анимации
    setTimeout(function () {
      myElement.classList.remove('clicked');
    }, 500);
  });
});

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

