import { state } from "./State.js";
//СТАТИСТИКА
////////////////////////////////////////////////////////////////

const statsBtn = document.getElementById("stats");

// просто закидываем значения из локального хранилища в нужные места на странице
statsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const allItemsCount = +state.pickaxes + +state.dynamites + +state.cursors + +state.miners + +state.bulldozers;
  document.getElementById("nowGems").textContent = state.score.toLocaleString();
  document.getElementById("pickaxes").textContent = state.pickaxes;
  document.getElementById("dynamites").textContent = state.dynamites;
  document.getElementById("cursors").textContent = state.cursors;
  document.getElementById("miners").textContent = state.miners;
  document.getElementById("bulldozers").textContent = state.bulldozers;
  document.getElementById("total").textContent = allItemsCount;
  document.getElementById("clicks").textContent = localStorage.getItem("clicks");
});
