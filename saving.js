import { state } from "./State.js";

// Сохранение в LocalStorage
// ссылка на MutationObserver
// https://developer.mozilla.org/ru/docs/Web/API/MutationObserver

// localStorage.clear();
const emeraldsCounter = document.getElementById("emeraldsCounter"); // кол-во собранных камней
const cursorsValue = document.getElementById("cursorsValue"); // кол-во курсоров
const pickaxesValue = document.getElementById("pickaxesValue"); // кол-во кирок
const dynamitesValue = document.getElementById("dynamitesValue"); // кол-во динамита
const minersValue = document.getElementById("minersValue"); // кол-во динамита
const bulldozersValue = document.getElementById("bulldozersValue"); // кол-во динамита

// Создаём экземпляр наблюдателя с указанной функцией колбэка
let observer = new MutationObserver(callback);

// Колбэк-функция при срабатывании мутации (изменения textContent в элементах-наблюдателях)
function callback(mutations) {
  mutations.forEach(function (mutation) {
    switch (mutation.target.id) {
      case "emeraldsCounter":
        console.log("emeraldsCounter - change");
        localStorage.setItem(
          "emeraldsCounter",
          mutation.addedNodes[0].textContent
        );
        break;
      case "cursorsValue":
        localStorage.setItem(
          "cursorsValue",
          mutation.addedNodes[0].textContent
        );
        localStorage.setItem("cursorCost", state.items.Cursor.cost);
        break;
      case "pickaxesValue":
        localStorage.setItem(
          "pickaxesValue",
          mutation.addedNodes[0].textContent
        );
        localStorage.setItem("pickaxeCost", state.items.Pickaxe.cost);
        break;
      case "dynamitesValue":
        localStorage.setItem(
          "dynamitesValue",
          mutation.addedNodes[0].textContent
        );
        localStorage.setItem("dynamiteCost", state.items.Dynamite.cost);
        break;
      case "minersValue":
        localStorage.setItem("minersValue", mutation.addedNodes[0].textContent);
        localStorage.setItem("minerCost", state.items.Miner.cost);
        break;
      case "bulldozersValue":
        localStorage.setItem(
          "bulldozersValue",
          mutation.addedNodes[0].textContent
        );
        localStorage.setItem("bulldozerCost", state.items.Bulldozer.cost);
        break;
    }
  });
}

// Конфигурация observer (за какими изменениями наблюдать)
const config = {
  childList: true, // наблюдаем за добавлением или удалением дочерних элементов (Включая текстовые узлы (text nodes))
  //characterData: true // наблюдатем за изменениями значения текстового содержимого целевого узла (текстовых узлов дочернего элемента)
};

// Начинаем наблюдение за изменениями элементов
observer.observe(emeraldsCounter, config);
observer.observe(cursorsValue, config);
observer.observe(pickaxesValue, config);
observer.observe(dynamitesValue, config);
observer.observe(minersValue, config);
observer.observe(bulldozersValue, config);

//#region - вывод на экран сохранённых значений
window.addEventListener("load", loadLocal); // при перезагрузке окна выполняется проверка localStorage и обновление данных

function loadLocal() {
  if (localStorage.length > 0) {
    // переберём ключи LocalStorage
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      switch (key) {
        case "emeraldsCounter":
          emeraldsCounter.textContent = localStorage.getItem(key);
          state.score = parseInt(localStorage.getItem(key));
          break;

        // Общая обработка для cursorsValue, pickaxesValue и dynamitesValue
        case "cursorsValue":
        case "pickaxesValue":
        case "dynamitesValue":
        case "minersValue":
        case "bulldozersValue":
          updateItemValue(key, localStorage.getItem(key));
          break;

        // Обработка Получения Цены на Предметы из LocalStorage
        case "cursorCost":
          state.items.Cursor.cost = parseInt(localStorage.getItem(key));
          break;
        case "pickaxeCost":
          state.items.Pickaxe.cost = parseInt(localStorage.getItem(key));
          break;
        case "dynamiteCost":
          state.items.Dynamite.cost = parseInt(localStorage.getItem(key));
          break;
        case "minerCost":
          state.items.Miner.cost = parseInt(localStorage.getItem(key));
          break;
        case "bulldozerCost":
          state.items.Bulldozer.cost = parseInt(localStorage.getItem(key));
          break;

        // Обработка Получения Уже Полученных Достижений
        default:
          if (key in state.achievements) {
            // Присваиваем Значение Достижения из Local Storage
            state.achievements[key].achieved =
              localStorage.getItem(key) === "true";
          }

          break;
      }
    }

    // Оффлайн Сбор Ресурсов
    collectOfflineResources();

    // Сохранение Последней Даты Входа
    saveLastLoginDate();

    // Сброс Local Storage
    //ResetLocalStorage()
  }
}

// Получение Значений Количества Предметов
function updateItemValue(itemType, value) {
  switch (itemType) {
    case "cursorsValue":
      cursorsValue.textContent = value;
      state.cursors = parseInt(value);
      break;
    case "pickaxesValue":
      pickaxesValue.textContent = value;
      state.pickaxes = parseInt(value);
      break;
    case "dynamitesValue":
      dynamitesValue.textContent = value;
      state.dynamites = parseInt(value);
      break;
    case "minersValue":
      minersValue.textContent = value;
      state.miners = parseInt(value);
      break;
    case "bulldozersValue":
      bulldozersValue.textContent = value;
      state.bulldozers = parseInt(value);
      break;
  }
}
//#endregion

//#region Оффлайн Сбор Ресурсов

// Логика сохранения Даты
function saveLastLoginDate() {
  // Получение Текущей Даты
  const currentDate = new Date();

  // Сохранение Текущей Даты в LocalStorage переменную lastLoginDate
  localStorage.setItem("lastLoginDate", currentDate.toISOString());

  // Вывод в console.log
  console.log("SAVE DATE: " + currentDate);
}

// Вычисление Количества Оффлайна В Секундах
function calculateOfflineTime() {
  // Получаем Дату из Local Storage
  const lastLoginDate = localStorage.getItem("lastLoginDate");

  // Если Дата была сохранена в Local Storage
  if (lastLoginDate) {
    // Получение Текущей Даты
    const currentDate = new Date();

    // Получение Последней Даты Входа
    const lastLogin = new Date(lastLoginDate);

    // Вывод Разницы в console.log()
    console.log(`CURRENT: ${currentDate}, LASTLOGIN: ${lastLogin}`);

    // Вычисление Разницы Дат В Секундах
    const offlineTimeInSeconds = Math.floor((currentDate - lastLogin) / 1000);

    // Вывод Разницы Дат В Секундах в console.log()
    console.log("Time In Seconds: " + offlineTimeInSeconds);

    // Возвращение Результата Оффлайна в Секундах
    return offlineTimeInSeconds;
  }
  // Возвращаем 0 Если Нет в Local Storage
  else {
    return 0;
  }
}

// Оффлайн Сбор Ресурсов
export function collectOfflineResources() {
  // Получаем Количество Оффлайна В Секундах
  const offlineTime = calculateOfflineTime();

  // Получаем Количество Добываемых Ресурсов в секунду
  const cursorIncome = state.items["Cursor"].income * state.cursors;
  const pickaxeIncome = state.items["Pickaxe"].income * state.pickaxes;
  const dynamiteIncome = state.items["Dynamite"].income * state.dynamites;
  const minerIncome = state.items["Miner"].income * state.miners;
  const bulldozerIncome = state.items["Bulldozer"].income * state.bulldozers;

  // Собранные Ресурсы в Оффлайне = Количество Добываемых Ресурсов в секунду * Разницу Между Датами ( В секундах )
  const emeraldGain =
    (cursorIncome +
      pickaxeIncome +
      dynamiteIncome +
      minerIncome +
      bulldozerIncome) *
    offlineTime;

  // Добавить ресурсы к текущему балансу
  state.score += emeraldGain;

  // Вывод Добавленной Суммы к Текущему Счету
  console.log("After Offiline + " + emeraldGain);
}

//#endregion

//#region ResetLocalStorage

// Reset Local Storage ( Полностью Очищает Прогресс из LocalStorage и обнуляет текущее состояние игры )
function ResetLocalStorage() {
  ResetStateVariables();
  ResetAchievements();
  ResetStatePrices();
}

// Reset Всех Достижений
function ResetAchievements() {
  for (const achievementKey in state.achievements) {
    // Reset Полученных Достижений
    state.achievements[achievementKey].achieved = false;

    // Reset Local Storage от Достижений
    localStorage.setItem(achievementKey, false);
  }
}

// Reset Всех Переменных Состояния
function ResetStateVariables() {
  emeraldsCounter.textContent = 0;
  state.score = 0;
  cursorsValue.textContent = 0;
  state.cursors = 0;
  pickaxesValue.textContent = 0;
  state.pickaxes = 0;
  dynamitesValue.textContent = 0;
  state.dynamites = 0;
  minersValue.textContent = 0;
  state.miners = 0;
  bulldozersValue.textContent = 0;
  state.bulldozers = 0;
}

// Reset Всех Цен
function ResetStatePrices() {
  // Установка Цен По Умолчанию
  state.items.Cursor.cost = 10;
  state.items.Pickaxe.cost = 50;
  state.items.Dynamite.cost = 100;
  state.items.Miner.cost = 150;
  state.items.Bulldozer.cost = 200;

  // Обновление UI
  document.getElementById("cursorCost").innerText = state.items.Cursor.cost;
  document.getElementById("pickaxeCost").innerText = state.items.Pickaxe.cost;
  document.getElementById("dynamiteCost").innerText = state.items.Dynamite.cost;
  document.getElementById("minerCost").innerText = state.items.Miner.cost;
  document.getElementById("bulldozerCost").innerText = state.items.Bulldozer.cost;
}

//#endregion

// РАБОЧИЙ КОД - необходимо в настройках добавить Сохранить файл, Загрузить из файла
/////////////////////////////////////////////////////////////////////////////////////
// настроить стили для кнопок-ссылок
// <button id="saveFile"><a id="toFile" href="">Save to file</a></button> // кнопка для сохранения файла
// сохранить в файл

document.getElementById("toFile").onclick = function () {
  let map = new Map();
  map.set(emeraldsCounter.id, emeraldsCounter.textContent);
  map.set(cursorsValue.id, cursorsValue.textContent);
  map.set(pickaxesValue.id, pickaxesValue.textContent);
  map.set(dynamitesValue.id, dynamitesValue.textContent);
  map.set(minersValue.id, minersValue.textContent);
  map.set(bulldozersValue.id, bulldozersValue.textContent);

  let mySerialMap = JSON.stringify(Array.from(map.entries()));
  console.log(mySerialMap);

  let myMap = new Map(JSON.parse(mySerialMap));
  console.log(myMap);

  let text = mySerialMap; //"Данные, которые мы сохрянем в файл myGame.txt";
  let myData = "data:application/txt;charset=utf-8," + encodeURIComponent(text);
  this.href = myData;
  this.download = "myGame.txt";
};

// для загрузки из файла
//<label id="load" for="fromFile">Load from file</label>
//<input id="fromFile" type="file" style="visibility:hidden;" accept=".txt"></input>

const fromFile = document.getElementById("fromFile");
fromFile.addEventListener("change", (event) => {
  let file = event.target.files[0]; // читаем 1 файл
  let reader = new FileReader();
  reader.readAsText(file); // преобразование в строку

  reader.onload = function () {
    let myMap = new Map(JSON.parse(reader.result)); // парсим строку в map
    gameRecover(myMap); // восстанавливаем игру, заполняя необходимые данные
  };

  reader.onerror = function () {
    //alert(reader.error);
    alert("Error reading file!");
  };
});

// восстановление игры
function gameRecover(map) {
  map.forEach((value, key) => {
    switch (key) {
      case "emeraldsCounter":
        emeraldsCounter.textContent = value;
        state.score = parseInt(value);
        break;
      case "cursorsValue":
        cursorsValue.textContent = value;
        state.cursors = value;
        break;
      case "pickaxesValue":
        pickaxesValue.textContent = value;
        state.pickaxes = value;
        break;
      case "dynamitesValue":
        dynamitesValue.textContent = value;
        state.dynamites = value;
        break;
      case "minersValue":
        minersValue.textContent = value;
        state.miners = value;
        break;
      case "bulldozersValue":
        bulldozersValue.textContent = value;
        state.bulldozers = value;
        break;
    }
  });
}
