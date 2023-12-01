// Shop.js
// Отвечает за логику магазина приложения
import { state } from "./State.js";
import { checkAchievements } from "./Achievements.js";
import { collectOfflineResources } from "./saving.js";

// Intervals Values
let cursorInterval;
let pickaxeInterval;
let dynamiteInterval;
let minerInterval;
let bulldozerInterval;

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
document.getElementById("minerItem").addEventListener("click", function () {
  buyItem("Miner");
});
document.getElementById("bulldoserItem").addEventListener("click", function () {
  buyItem("Bulldozer");
});

// Add OnLoad Event To HTML Window
// Starts Intervals that are Responsible for
// Updating the Score Value with Current Purchases
window.addEventListener("load", (event) => {
  loadLocalPrice();
  //collectOfflineResources();
  updateShop();
  updateCenterUI();
});

function updateCenterUI() {
  UpdateCursorsImages();
  UpdatePickaxesImages();
  UpdateDynamitesImages();
  UpdateMinersImages();
  UpdateBulldozersImages();
}

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
      // Increase Miner Count And Update UI for that
      case "Miner":
        state.miners++;
        updateMiners();
        checkAchievements();
        break;
      // Increase Bulldozer Count And Update UI for that
      case "Bulldozer":
        state.bulldozers++;
        updateBulldozers();
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

// Create Images With Represent Value
function UpdateCursorsImages() {
  if (state.cursors > 0) {
    document.getElementById("row1").style.display = "block";
  }
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
    cursorImage.src = "img/cursor.png";
    cursorImage.id = "cursorImage" + i;
    cursorImage.classList.add("itemimage");
    cursorsImagesContainer.appendChild(cursorImage);
  }
}

function UpdatePickaxesImages() {
  if (state.pickaxes > 0) {
    document.getElementById("row2").style.display = "block";
  }
  // Получаем Контейнер Для Pickaxe Images
  const pickaxeImagesContainer = document.getElementById(
    "pickaxesImagesContainer"
  );

  // Обнуляем прошлые Картинки
  pickaxeImagesContainer.innerHTML = "";

  // Максимальное количество курсоров для отображения
  const maxPickaxesToShow = 30;

  // Инициализируем новые элементы добавляя к ним Image
  for (let i = 0; i < state.pickaxes && i < maxPickaxesToShow; i++) {
    const pickaxeImage = document.createElement("img");
    pickaxeImage.src = "img/pickaxe.png";
    pickaxeImage.id = "pickaxeImage" + i;
    pickaxeImage.classList.add("itemimage");
    pickaxeImagesContainer.appendChild(pickaxeImage);
  }
}

function UpdateDynamitesImages() {
  if (state.dynamites > 0) {
    document.getElementById("row3").style.display = "block";
  }
  // Получаем Контейнер Для Dynamite Images
  const dynamitesImagesContainer = document.getElementById(
    "dynamitesImagesContainer"
  );

  // Обнуляем прошлые Картинки
  dynamitesImagesContainer.innerHTML = "";

  // Максимальное количество курсоров для отображения
  const maxDynamitesToShow = 30;

  // Инициализируем новые элементы добавляя к ним Image
  for (let i = 0; i < state.dynamites && i < maxDynamitesToShow; i++) {
    const dynamiteImage = document.createElement("img");
    dynamiteImage.src = "img/dynamite.png";
    dynamiteImage.id = "dynamiteImage" + i;
    dynamiteImage.classList.add("itemimage");
    dynamitesImagesContainer.appendChild(dynamiteImage);
  }
}

function UpdateMinersImages() {
  if (state.miners > 0) {
    document.getElementById("row4").style.display = "block";
  }
  // Получаем Контейнер Для Dynamite Images
  const minersImagesContainer = document.getElementById(
    "minersImagesContainer"
  );

  // Обнуляем прошлые Картинки
  minersImagesContainer.innerHTML = "";

  // Максимальное количество курсоров для отображения
  const maxMinersToShow = 30;

  // Инициализируем новые элементы добавляя к ним Image
  for (let i = 0; i < state.miners && i < maxMinersToShow; i++) {
    const minerImage = document.createElement("img");
    minerImage.src = "img/miner.png";
    minerImage.id = "minerImage" + i;
    minerImage.classList.add("itemimage");
    minersImagesContainer.appendChild(minerImage);
  }
}
function UpdateBulldozersImages() {
  if (state.bulldozers > 0) {
    document.getElementById("row5").style.display = "block";
  }
  // Получаем Контейнер Для Bulldozer Images
  const bulldozersImagesContainer = document.getElementById(
    "bulldozersImagesContainer"
  );

  // Обнуляем прошлые Картинки
  bulldozersImagesContainer.innerHTML = "";

  // Максимальное количество курсоров для отображения
  const maxBulldozersToShow = 30;

  // Инициализируем новые элементы добавляя к ним Image
  for (let i = 0; i < state.bulldozers && i < maxBulldozersToShow; i++) {
    const bulldozerImage = document.createElement("img");
    bulldozerImage.src = "img/bulldozer.png";
    bulldozerImage.id = "bulldozerImage" + i;
    bulldozerImage.classList.add("itemimage");
    bulldozersImagesContainer.appendChild(bulldozerImage);
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

// Update UI of Pickaxes Count
function updatePickaxes() {
  document.getElementById("pickaxesValue").innerText = state.pickaxes;
  UpdatePickaxesImages();
}

// Update UI of Dynamites Count
function updateDynamites() {
  document.getElementById("dynamitesValue").innerText = state.dynamites;
  UpdateDynamitesImages();
}

// Update UI of Miners Count
function updateMiners() {
  document.getElementById("minersValue").innerText = state.miners;
  UpdateMinersImages();
}

// Update UI of Bulldozers Count
function updateBulldozers() {
  document.getElementById("bulldozersValue").innerText = state.bulldozers;
  UpdateBulldozersImages();
}

// Update UI for Shop
function updateShop() {
  // Clear Previous Intervals ( to avoid overlapping intervals )
  clearInterval(cursorInterval);
  clearInterval(pickaxeInterval);
  clearInterval(dynamiteInterval);
  clearInterval(minerInterval);
  clearInterval(bulldozerInterval);

  // Calculate total income per second
  let totalIncome =
    state.items["Cursor"].income * state.cursors +
    state.items["Pickaxe"].income * state.pickaxes +
    state.items["Dynamite"].income * state.dynamites +
    state.items["Miner"].income * state.miners +
    state.items["Bulldozer"].income * state.bulldozers;
  // Update UI for total income per second
  document.getElementById("EmeraldsInSecond").textContent = totalIncome;
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
  // Set Interval for Miners Income
  if (state.miners > 0) {
    dynamiteInterval = setInterval(function () {
      state.score += state.items["Miner"].income * state.miners;
      updateScore();
    }, 1000);
  }
  // Set Interval for Bulldozers Income
  if (state.bulldozers > 0) {
    dynamiteInterval = setInterval(function () {
      state.score += state.items["Bulldozer"].income * state.bulldozers;
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
  updateCost("Miner", state.items.Miner.cost);
  updateCost("Bulldozer", state.items.Bulldozer.cost);
}
