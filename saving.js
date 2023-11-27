// Сохранение в LocalStorage
// ссылка на MutationObserver
// https://developer.mozilla.org/ru/docs/Web/API/MutationObserver

// localStorage.clear();

const diamondsCounter = document.getElementById("mySpan1");         // кол-во собранных камней
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
            case 'mySpan1':
                console.log('mySpan1 - change');
                localStorage.setItem("diamondsCounter", mutation.addedNodes[0].textContent);
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
observer.observe(diamondsCounter, config);
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
                case 'diamondsCounter':
                    diamondsCounter.textContent = localStorage.getItem(key);
                    break;
                case 'cursorsValue':
                    cursorsValue.textContent = localStorage.getItem(key);
                    break;
                case 'pickaxesValue':
                    pickaxesValue.textContent = localStorage.getItem(key);
                    break;
                case 'dynamitesValue':
                    dynamitesValue.textContent = localStorage.getItem(key);
                    break;

            }
        }
    }
}
//#endregion


/////////////////////////////////////////////////////////////////////////////////////
// настроить стили для кнопок-ссылок
//<button id="saveFile"><a id="todownload" href="">Save to file</a></button> // кнопка для сохранения файла
//сохранить в файл

// document.getElementById('todownload').onclick = function() {

//     let map = new Map();
//     map.set(diamondsCounter.id, diamondsCounter.textContent);
//     map.set(cursorsValue.id, cursorsValue.textContent);
//     map.set(pickaxesValue.id, pickaxesValue.textContent);
//     map.set(dynamitesValue.id, dynamitesValue.textContent);
    
//     let mySerialMap = JSON.stringify(Array.from(map.entries()))
//     console.log(mySerialMap);
    
//     let myMap = new Map(JSON.parse(mySerialMap));
//     console.log(myMap);

//     let text = mySerialMap; //"Данные, которые мы сохрянем в файл data.txt";
//     let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(text);
//     this.href = myData;
//     this.download = 'myGame.txt';
// }



