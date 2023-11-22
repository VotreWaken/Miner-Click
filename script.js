const ctx = canvas.getContext("2d");  // получаем контекст канваса, чтоб говорить полотну где и что рисовать
let img = document.getElementById('img');

// Двигающийся фон
let x = 0;
let y = 0;
setInterval(() => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    y+=1;
    ctx.drawImage(img, x, y, 10, 5);
    if(y === 120) y = 0;
}, 200);

///////////////////////////////////////////////////////////////

