// Сохранение в LocalStorage
// по таймеру
// setTimeout(saving, 10000); // сохранение каждые пол секунды

//     const diamondsCounter = document.getElementById("mySpan1"); // кол-во собранных камней
//     const cursorsValue = document.getElementById("cursorsValue"); // кол-во курсоров
//     const pickaxesValue = document.getElementById("pickaxesValue"); // кол-во кирок
//     const dynamitesValue = document.getElementById("dynamitesValue"); // кол-во динамита

// function saving()
// {
    
//     // перезапись в localStorage
//     localStorage.setItem("diamondsCounter", JSON.stringify(diamondsCounter.textContent));
//     localStorage.setItem("cursorsValue", JSON.stringify(cursorsValue.textContent));
//     localStorage.setItem("pickaxesValue", JSON.stringify(pickaxesValue.textContent));
//     localStorage.setItem("dynamitesValue", JSON.stringify(dynamitesValue.textContent));
    
// }

// //#region - вывод на экран сохранённых значений
// if (localStorage.length > 0)
// {
//     diamondsCounter.textContent = localStorage.getItem("diamondsCounter");
//     cursorsValue.textContent = localStorage.getItem("cursorsValue");
//     pickaxesValue.textContent = localStorage.getItem("pickaxesValue");
//     dynamitesValue.textContent = localStorage.getItem("dynamitesValue");
// }
// //#endregion

// ссылка на MutationObserver
// https://developer.mozilla.org/ru/docs/Web/API/MutationObserver

localStorage.clear();

const diamondsCounter = document.getElementById("mySpan1");         // кол-во собранных камней
const cursorsValue = document.getElementById("cursorsValue");       // кол-во курсоров
const pickaxesValue = document.getElementById("pickaxesValue");     // кол-во кирок
const dynamitesValue = document.getElementById("dynamitesValue");   // кол-во динамита

// Создаём экземпляр наблюдателя с указанной функцией колбэка
let observer = new MutationObserver(callback);

// Колбэк-функция при срабатывании мутации (изменения textContent в элементах-наблюдателях)
function callback(mutations) {
    mutations.forEach(function(mutation) {

        console.dir(mutation.target); //объект с изменениями
        console.log(mutation.target.id + " " + mutation.addedNodes[0].textContent);

        switch(mutation.target.id)
        {
            case 'mySpan1':
                localStorage.setItem("diamondsCounter", JSON.stringify(mutation.addedNodes[0].textContent));
                break;
            case 'cursorsValue':
                localStorage.setItem("cursorsValue", JSON.stringify(mutation.addedNodes[0].textContent));
                break;
            case 'pickaxesValue':
                localStorage.setItem("pickaxesValue", JSON.stringify(mutation.addedNodes[0].textContent));
                break;
            case 'dynamitesValue':
                localStorage.setItem("dynamitesValue", JSON.stringify(mutation.addedNodes[0].textContent));
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