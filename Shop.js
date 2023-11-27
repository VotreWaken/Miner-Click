// Data Variables
let score = 500;
let cursors = 0;
let pickaxes = 0;
let dynamites = 0;

// Products Data
const items = 
{
  'Cursor': { cost: 10, income: 1 },
  'Pickaxe': { cost: 50, income: 5 },
  'Dynamite': { cost: 100, income: 10 }
};

// Add Events To HTML Elements 
document.getElementById('cursorItem').addEventListener('click', function() {
  buyItem('Cursor');
});

document.getElementById('pickaxeItem').addEventListener('click', function() {
  buyItem('Pickaxe');
});

document.getElementById('dynamiteItem').addEventListener('click', function() {
  buyItem('Dynamite');
});

// Buy Item Handler
export function buyItem(item) 
{
  // 
  const itemInfo = items[item];

  // Check Is the Score enough to purchase the goods
  if (score >= itemInfo.cost) 
  {

    // Reducing the Score by the purchase price
    score -= itemInfo.cost;

     // Increase Price by 1.5 After Buy 
    itemInfo.cost = Math.ceil(itemInfo.cost * 1.5);

    // Update Price 
    updateCost(item, itemInfo.cost);

    // Update Score
    updateScore();

    // Check Item Type 
    switch (item) 
    {
      // Increase Cursor Count And Update UI for that 
      case 'Cursor':
        cursors++;
        updateCursors();
        break;

      // Increase Pickaxe Count And Update UI for that 
      case 'Pickaxe':
        pickaxes++;
        updatePickaxes();
        break;

      // Increase Dynamite Count And Update UI for that 
      case 'Dynamite':
        dynamites++;
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
  document.getElementById('emeraldsCounter').innerText = score;
}

// Update UI of Cursors Count 
function updateCursors() 
{
    document.getElementById('cursorsValue').innerText = cursors;
}

// Update UI of Pickaxes Count 
function updatePickaxes() 
{
    document.getElementById('pickaxesValue').innerText = pickaxes;
}

// Update UI of Dynamites Count 
function updateDynamites() 
{
    document.getElementById('dynamitesValue').innerText = dynamites;
}

// Update UI for Shop 
function updateShop() 
{
  // Clear Previous Intervals ( to avoid overlapping intervals )
  clearInterval(cursorInterval);
  clearInterval(pickaxeInterval);
  clearInterval(dynamiteInterval);

  // Cursor Income Handler 
  if (cursors > 0) 
  {
    // Set Interval for Cursor Income 
    var cursorInterval = setInterval(function() 
    {
      score += items['Cursor'].income * cursors;
      updateScore();
    }, 1000);
  }

  // Set Interval for Pickaxe Income 
  if (pickaxes > 0) 
  {
    var pickaxeInterval = setInterval(function() 
    {
      score += items['Pickaxe'].income * pickaxes;
      updateScore();
    }, 1000);
  }

  // Set Interval for Dynamites Income 
  if (dynamites > 0) 
  {
    var dynamiteInterval = setInterval(function() 
    {
      score += items['Dynamite'].income * dynamites;
      updateScore();
    }, 1000);
  }
}

// Update UI for Cursor Count 
function updateCursor() 
{
    const cursorElement = document.getElementById('cursor');
    cursorElement.innerHTML = `Cursors: ${cursors}`;
    cursorElement.onclick = clickHandler;
}

// Update UI for Item Cost
function updateCost(item, cost) 
{
  document.getElementById(item.toLowerCase() + 'Cost').innerText = cost;
}