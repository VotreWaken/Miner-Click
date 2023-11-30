// Shop.js
// Отвечает за логику магазина приложения
import { state } from "./State.js";
import { checkAchievements } from "./Achievements.js";
import { collectOfflineResources } from "./saving.js";

// Intervals Values
let cursorInterval;
let pickaxeInterval;
let dynamiteInterval;


// Add Buy Events To HTML Elements
document.getElementById("cursorItem").addEventListener("click", function () {
  buyItem("Cursor");
});

document.getElementById("pickaxeItem").addEventListener("click", function () {
  buyItem("Pickaxe");
});

document.getElementById("dynamiteItem").addEventListener("click", function () {
  buyItem("Dynamite");
});

// Add OnLoad Event To HTML Window
// Starts Intervals that are Responsible for
// Updating the Score Value with Current Purchases
window.addEventListener("load", (event) => {
  loadLocalPrice();
  //collectOfflineResources();
  updateShop();
  UpdateCursorsImages()
});

// Buy Item Handler
export function buyItem(item) {
  // Get Item Information
  const itemInfo = state.items[item];

  // Check Is the Score enough to purchase the goods
  if (state.score >= itemInfo.cost) {
    // Reducing the State Score by the purchase price
    state.score -= itemInfo.cost;

    // Increase Price by 1.5 After Buy
    itemInfo.cost = Math.ceil(itemInfo.cost * 1.3);

    // Update Price
    updateCost(item, itemInfo.cost);

    // Update Score
    updateScore();

    // Check Item Type
    switch (item) {
      // Increase Cursor Count And Update UI for that
      case "Cursor":
        state.cursors++;
        updateCursors();
        checkAchievements();
        break;

      // Increase Pickaxe Count And Update UI for that
      case "Pickaxe":
        state.pickaxes++;
        updatePickaxes();
        checkAchievements();
        break;

      // Increase Dynamite Count And Update UI for that
      case "Dynamite":
        state.dynamites++;
        updateDynamites();
        checkAchievements();
        break;
    }

    // Call Function to Update UI for Shop
    updateShop();
  }
  // Insufficient Funds
  else {
    alert("Not enough score to buy " + item);
  }
}

// Update Score
function updateScore() {
  document.getElementById("emeraldsCounter").textContent = state.score;
}

// Update UI of Cursors Count
function updateCursors() {
  document.getElementById("cursorsValue").innerText = state.cursors;

  // Call the function to update cursor images
  UpdateCursorsImages();
}

// Create Images With Represent Value
function UpdateCursorsImages() {
  // Получаем Контейнер Для Cursor Images
  const cursorsImagesContainer = document.getElementById(
    "cursorsImagesContainer"
  );

  // Обнуляем прошлые Картинки
  cursorsImagesContainer.innerHTML = "";

  // Максимальное количество курсоров для отображения
  const maxCursorsToShow = 30;

  // Инициализируем новые элементы добавляя к ним Image
  for (let i = 0; i < state.cursors && i < maxCursorsToShow; i++) {
    const cursorImage = document.createElement("img");
    cursorImage.src = "/img/volume.png";
    cursorImage.id = "cursorImage" + i;
    cursorImage.classList.add("cursorImage");
    cursorsImagesContainer.appendChild(cursorImage);
  }
}

// Update UI of Pickaxes Count
function updatePickaxes() {
  document.getElementById("pickaxesValue").innerText = state.pickaxes;
}

// Update UI of Dynamites Count
function updateDynamites() {
  document.getElementById("dynamitesValue").innerText = state.dynamites;
}

// Update UI for Shop
function updateShop() {
  // Clear Previous Intervals ( to avoid overlapping intervals )
  clearInterval(cursorInterval);
  clearInterval(pickaxeInterval);
  clearInterval(dynamiteInterval);

  // Calculate total income per second
  let totalIncome =
    state.items["Cursor"].income * state.cursors +
    state.items["Pickaxe"].income * state.pickaxes +
    state.items["Dynamite"].income * state.dynamites;

  // Update UI for total income per second
  document.getElementById("EmeraldsInSecond").textContent = totalIncome;

  console.log(state.cursors);
  console.log(state.pickaxes);
  console.log(state.dynamites);
  // Cursor Income Handler
  if (state.cursors > 0) {
    // Set Interval for Cursor Income
    cursorInterval = setInterval(function () {
      state.score += state.items["Cursor"].income * state.cursors;
      updateScore();
    }, 1000);
  }

  // Set Interval for Pickaxe Income
  if (state.pickaxes > 0) {
    pickaxeInterval = setInterval(function () {
      state.score += state.items["Pickaxe"].income * state.pickaxes;
      updateScore();
    }, 1000);
  }

  // Set Interval for Dynamites Income
  if (state.dynamites > 0) {
    dynamiteInterval = setInterval(function () {
      state.score += state.items["Dynamite"].income * state.dynamites;
      updateScore();
    }, 1000);
  }
}

// Update UI for Item Cost
function updateCost(item, cost) {
  document.getElementById(item.toLowerCase() + "Cost").innerText =
    cost.toLocaleString();
}

// Загружаем и Обновляем Новые Цены На Предметы
function loadLocalPrice() {
  // обновляем цены при загрузке
  updateCost("Cursor", state.items.Cursor.cost);
  updateCost("Pickaxe", state.items.Pickaxe.cost);
  updateCost("Dynamite", state.items.Dynamite.cost);
}
