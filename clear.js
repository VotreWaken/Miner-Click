// очистка всех достижений

import {ResetLocalStorage} from './saving.js';

const btnClear = document.getElementById("clearAll");
btnClear.addEventListener("click", ()=> {
    ResetLocalStorage(); // стираем всё
    EmeraldsInSecond.textContent = 0;

    // после клика модальное окно закрываем вручную
    // вызвать явно событие не удалось (см. код script.js)
    document.getElementById("legacy_modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});