

 function incrementD() {
    
    let spanElement = document.getElementById('mySpan1');
    console.log(spanElement.textContent);
    let currentScore = parseInt(spanElement.textContent);
     console.log(currentScore);
    let newScore = currentScore + 1;

    spanElement.textContent = newScore;
    
   

  }


  document.getElementById('bigButton').addEventListener('click', function() 
  {
  playClickSound();
 
  });

   function playClickSound() {
    
   let audio = new Audio("sound/udar-po-metallicheskomu-predmetu.mp3"); // Указывает путь путь к звуковому файлу
   audio.play();
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