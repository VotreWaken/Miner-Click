// Shop.js
// Отвечает за логику магазина приложения 
import { state } from './State.js';

// Intervals Values 
let cursorInterval;
let pickaxeInterval;
let dynamiteInterval;

// Add Buy Events To HTML Elements 
document.getElementById('cursorItem').addEventListener('click', function () 
{
  buyItem('Cursor');
});

document.getElementById('pickaxeItem').addEventListener('click', function () 
{
  buyItem('Pickaxe');
});

document.getElementById('dynamiteItem').addEventListener('click', function () 
{
  buyItem('Dynamite');
});

// Add OnLoad Event To HTML Window
// Starts Intervals that are Responsible for 
// Updating the Score Value with Current Purchases
window.addEventListener('load', (event) => 
{
  updateShop();
});

// Buy Item Handler
export function buyItem(item) 
{
  // Get Item Information 
  const itemInfo = state.items[item];

  // Check Is the Score enough to purchase the goods
  if (state.score >= itemInfo.cost) 
  {
    // Reducing the State Score by the purchase price
    state.score -= itemInfo.cost;
    
    // Increase Price by 1.5 After Buy 
    itemInfo.cost = Math.ceil(itemInfo.cost * 1.5);

    // Update Price 
    updateCost(item, itemInfo.cost);

    // Update Score
    updateScore()

    // Check Item Type 
    switch (item) 
    {
      // Increase Cursor Count And Update UI for that 
      case 'Cursor':
        state.cursors++;
        updateCursors();
        break;

      // Increase Pickaxe Count And Update UI for that 
      case 'Pickaxe':
        state.pickaxes++;
        updatePickaxes();
        break;

      // Increase Dynamite Count And Update UI for that 
      case 'Dynamite':
        state.dynamites++;
        updateDynamites();
        break;
    }

    // Call Function to Update UI for Shop 
    updateShop();
  } 
  // Insufficient Funds 
  else 
  {
    alert('Not enough score to buy ' + item);
  }
}

// Update Score 
function updateScore() 
{
  document.getElementById('emeraldsCounter').textContent = state.score;
}

// Update UI of Cursors Count 
function updateCursors() 
{
  document.getElementById('cursorsValue').innerText = state.cursors;
}

// Update UI of Pickaxes Count 
function updatePickaxes() 
{
  document.getElementById('pickaxesValue').innerText = state.pickaxes;
}

// Update UI of Dynamites Count 
function updateDynamites() 
{
  document.getElementById('dynamitesValue').innerText = state.dynamites;
}

// Update UI for Shop 
function updateShop() 
{
  // Clear Previous Intervals ( to avoid overlapping intervals )
  clearInterval(cursorInterval);
  clearInterval(pickaxeInterval);
  clearInterval(dynamiteInterval);

  console.log(state.cursors)
  console.log(state.pickaxes)
  console.log(state.dynamites)
  // Cursor Income Handler 
  if (state.cursors > 0) 
  {
    // Set Interval for Cursor Income 
     cursorInterval = setInterval(function () {
      state.score += state.items['Cursor'].income * state.cursors;
      updateScore();
    }, 1000);
  }

  // Set Interval for Pickaxe Income 
  if (state.pickaxes > 0) 
  {
     pickaxeInterval = setInterval(function () {
      state.score += state.items['Pickaxe'].income * state.pickaxes;
      updateScore();
    }, 1000);
  }

  // Set Interval for Dynamites Income 
  if (state.dynamites > 0) 
  {
     dynamiteInterval = setInterval(function () {
      state.score += state.items['Dynamite'].income * state.dynamites;
      updateScore();
    }, 1000);
  }
}

// Update UI for Item Cost
function updateCost(item, cost) 
{
  document.getElementById(item.toLowerCase() + 'Cost').innerText = cost;
}
