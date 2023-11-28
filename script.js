// preloader загрузочный экран
// load – браузер загрузил HTML и внешние ресурсы (картинки, стили и т.д.).
window.addEventListener("load", ()=> {
  setTimeout(function() {                                           // с помощью таймера делаем плавный переход 

    document.getElementById("preloader").style.display = "none";   // скрываем загрузочный экран

  }, 1000);
});

///////////////////////////////////////////////////////////////

// Modal dialogs
const btnOptions = document.getElementById("options");
const btnInfo = document.getElementById("info");
const btnLegacy = document.getElementById("legacy");
const btnStats = document.getElementById("stats");

btnOptions.onclick = () => { openClose("options_modal"); };

btnInfo.onclick = () => { openClose("info_modal"); };

btnLegacy.onclick = () => { openClose("legacy_modal"); };

btnStats.onclick = () => { openClose("stats_modal"); };


function openClose(idName) {
  openModal(idName);
  const closing = document.getElementById(idName).querySelector(`#close-btn`);
  closing.onclick = () => {
    closeModal(idName);
  };
}

function closeModal(idName) {
  document.getElementById(idName).style.display = "none";
  document.getElementById("overlay").style.display = "none";
}


function openModal(idName) {
  document.getElementById(idName).style.display = "flex";
  document.getElementById("overlay").style.display = "block";
}


  
