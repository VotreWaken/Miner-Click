

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
    
   let audio = new Audio("tihiy-odinochnyiy-metallicheskiy-stuk.mp3"); // Укажите путь к звуковому файлу
   audio.play();
}
function addShadow() {
    let imagButt = document.getElementById('imgButton');

    // Добавляем тень
    imagButt.style.boxShadow = '0 0 10px 5px rgba(0, 0, 0, 0.5)';

    // Ждем некоторое время (например, 500 миллисекунд) и убираем тень
    setTimeout(function() {
      element.style.boxShadow = 'none';
    }, 100);
  }