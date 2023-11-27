const ctx = canvas.getContext("2d"); // получаем контекст канваса, чтоб говорить полотну где и что рисовать
let img = document.getElementById("img");

// Двигающийся фон
let x = 0;
let y = 0;
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  y += 1;
  ctx.drawImage(img, x, y, 10, 5);
  if (y === 120) y = 0;
}, 200);

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


  
