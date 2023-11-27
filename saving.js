import { state } from './State.js';

// Сохранение в LocalStorage
// ссылка на MutationObserver
// https://developer.mozilla.org/ru/docs/Web/API/MutationObserver

// localStorage.clear();
const emeraldsCounter = document.getElementById("emeraldsCounter"); // кол-во собранных камней
const cursorsValue = document.getElementById("cursorsValue");       // кол-во курсоров
const pickaxesValue = document.getElementById("pickaxesValue");     // кол-во кирок
const dynamitesValue = document.getElementById("dynamitesValue");   // кол-во динамита

// Создаём экземпляр наблюдателя с указанной функцией колбэка
let observer = new MutationObserver(callback);

// Колбэк-функция при срабатывании мутации (изменения textContent в элементах-наблюдателях)
function callback(mutations) {
    mutations.forEach(function(mutation) {

        switch(mutation.target.id)
        {
            case 'emeraldsCounter':
                console.log('emeraldsCounter - change');
                localStorage.setItem("emeraldsCounter", mutation.addedNodes[0].textContent);
                break;
            case 'cursorsValue':
                localStorage.setItem("cursorsValue", mutation.addedNodes[0].textContent);
                break;
            case 'pickaxesValue':
                localStorage.setItem("pickaxesValue", mutation.addedNodes[0].textContent);
                break;
            case 'dynamitesValue':
                localStorage.setItem("dynamitesValue", mutation.addedNodes[0].textContent);
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

//#region - вывод на экран сохранённых значений
window.addEventListener("load", loadLocal); // при перезагрузке окна выполняется проверка localStorage и обновление данных

function loadLocal()
{
    if (localStorage.length > 0)
    {
        for(let i = 0; i < localStorage.length; i++) // переберём ключи LocalStorage
        {
            let key = localStorage.key(i);
            switch(key)
            {
                case 'emeraldsCounter':
                    emeraldsCounter.textContent = localStorage.getItem(key);
                    state.score = parseInt(localStorage.getItem(key));
                    break;
                case 'cursorsValue':
                    cursorsValue.textContent = localStorage.getItem(key);
                    state.cursors = localStorage.getItem(key);
                    break;
                case 'pickaxesValue':
                    pickaxesValue.textContent = localStorage.getItem(key);
                    state.pickaxes = localStorage.getItem(key);
                    break;
                case 'dynamitesValue':
                    dynamitesValue.textContent = localStorage.getItem(key);
                    state.dynamites = localStorage.getItem(key);
                    break;

            }
        }
    }
}
//#endregion


// РАБОЧИЙ КОД - необходимо в настройках добавить Сохранить файл, Загрузить из файла
/////////////////////////////////////////////////////////////////////////////////////
// // настроить стили для кнопок-ссылок
// // <button id="saveFile"><a id="toFile" href="">Save to file</a></button> // кнопка для сохранения файла
// // сохранить в файл

// document.getElementById('toFile').onclick = function() {

//     let map = new Map();
//     map.set(emeraldsCounter.id, emeraldsCounter.textContent);
//     map.set(cursorsValue.id, cursorsValue.textContent);
//     map.set(pickaxesValue.id, pickaxesValue.textContent);
//     map.set(dynamitesValue.id, dynamitesValue.textContent);
    
//     let mySerialMap = JSON.stringify(Array.from(map.entries()))
//     console.log(mySerialMap);
    
//     let myMap = new Map(JSON.parse(mySerialMap));
//     console.log(myMap);

//     let text = mySerialMap; //"Данные, которые мы сохрянем в файл myGame.txt";
//     let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text);
//     this.href = myData;
//     this.download = 'myGame.txt';
// };

// // для загрузки из файла
// //<label id="load" for="fromFile">Load from file</label>
// //<input id="fromFile" type="file" style="visibility:hidden;" accept=".txt"></input>

// const fromFile = document.getElementById('fromFile');
// fromFile.addEventListener("change", (event)=> {

//     let file = event.target.files[0];   // читаем 1 файл
//     let reader = new FileReader();
//     reader.readAsText(file);            // преобразование в строку

//     reader.onload = function() {
//     let myMap = new Map(JSON.parse(reader.result));  // парсим строку в map
//     gameRecover(myMap); // восстанавливаем игру, заполняя необходимые данные
//   };

//   reader.onerror = function() {
//     //alert(reader.error);
//     alert("Error reading file!");
//   };
// });

// // восстановление игры
// function gameRecover(map) {

//     map.forEach((value, key) => {
//         switch(key)
//         {
//             case 'emeraldsCounter':
//                 emeraldsCounter.textContent = value;
//                 state.score = parseInt(value);
//                 break;
//             case 'cursorsValue':
//                 cursorsValue.textContent = value;
//                 state.cursors = value;
//                 break;
//             case 'pickaxesValue':
//                 pickaxesValue.textContent = value;
//                 state.pickaxes = value;
//                 break;
//             case 'dynamitesValue':
//                 dynamitesValue.textContent =value;
//                 state.dynamites = value;
//                 break;
//         }
//     });
// }
