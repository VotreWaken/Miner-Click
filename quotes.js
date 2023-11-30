// Цитаты
let quotes = 
[
    "Get crystals and become more successful!",
    "These gemstones work magic!",
    "There are many items in the store that will help you mine even more gems!",
    "Let's mine!",
    "Emerald has pronounced magical properties...",
    "You're mining the perfect mineral!",
    "Expensive emeralds are always transparent.",
    "Magicians and fortune tellers used the gem to communicate with the souls of ancestors.",
    "These bright minerals are driving humanity crazy.",
    "Stones of a deep green tone are most valued.",
    "Emerald is considered one of the most beautiful stones.",
    "Check out the store - you might need a pickaxe!",
    "The main deposits of the gem are Colombia, Zambia, Brazil, Pakistan, and Zimbabwe.",
    "Take dynamite. Without it, it is more difficult to mine rock.",
    "Emerald is a rather fragile stone.",
    "Earn more with store items!"
];

const div = document.getElementById("comment");
div.style.visibility = "hidden";
div.style.height = "32px";
div.style.opacity = "0.0";
div.style.margin = "24px";
div.style.fontSize = "0.8em";
div.style.fontWeight = "100";

setInterval(change, 12000);

function change()
{
    let ind = Math.floor(Math.random() * quotes.length + 1);
    div.textContent = quotes[ind];
    
    div.animate([
        { visibility: "visible"},
        { opacity: "0.0"},
        { opacity: "0.1"},
        { opacity: "0.2"},
        { opacity: "0.3"},
        { opacity: "0.4"},
        { opacity: "0.5"},
        { opacity: "0.6"},
        { opacity: "0.7", offset: 0.1},
        { opacity: "0.7", offset: 0.1},
        { opacity: "0.6", offset: 0.1},
        { opacity: "0.5"},
        { opacity: "0.4"},
        { opacity: "0.3"},
        { opacity: "0.2"},
        { opacity: "0.1"},
        { opacity: "0.0"},
      ], {
        duration: 10000
      });
}