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
// Modal dialog
const btnOptions = document.getElementById("options");
const clsModal = document.getElementById("close-btn");

btnOptions.addEventListener("click", openModal);
clsModal.addEventListener("click", closeModal);

function closeModal() {
    console.log('clossed modal');
  document.getElementById("options_modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
function openModal() {
    console.log('opened modal');
  document.getElementById("options_modal").style.display = "flex";
  document.getElementById("overlay").style.display = "block";
}
