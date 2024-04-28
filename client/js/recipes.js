const recipeUrl = "http://localhost:5010/api/recipes";
const customerUrl = "http://localhost:5010/api/customers";
let recipeIDs = [];

document.addEventListener("DOMContentLoaded", async () => {
  populateRecipeCards();
  document.getElementById('searchInput').addEventListener('input', populateRecipeCards);
  document.getElementById('cuisineFilter').addEventListener('change', populateRecipeCards);
  document.getElementById('clearFiltersLink').addEventListener('click', clearFilters);
  document.getElementById('feelingLuckyBtn').addEventListener('click', () => {
    showConfirmationPopup();
  });
  updateCartItemCount();
  // Log the logged-in user
  const loggedInUserId = sessionStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    const user = await getUserInfo(loggedInUserId);
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`;
      updateLoginSignUpLink(fullName);
    }
  }
  
  // Check if user is admin
  const isAdmin = await checkAdminStatus(loggedInUserId);
  if (isAdmin) {
    document.getElementById('adminSettingsOption').style.display = 'block';
  }

  // Populate cuisine filter
  populateCuisineFilter();
});

async function getUserInfo(userId) {
  try {
    const response = await fetch(`${customerUrl}/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

async function checkAdminStatus(userId) {
  try {
    const response = await fetch(`${customerUrl}/getAdminStatusById?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch admin status');
    }
    const isAdmin = await response.json();
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

function updateLoginSignUpLink(userName) {
  const loginSignUpItem = document.getElementById('loginSignUpItem');
  if (loginSignUpItem) {
    loginSignUpItem.innerHTML = `<a class="dropdown-item" href="settings.html">${userName}</a>`;
  }
}


function updateLoginSignUpLink(userName) {
  const loginSignUpItem = document.getElementById('loginSignUpItem');
  if (loginSignUpItem) {
    loginSignUpItem.innerHTML = `<a class="dropdown-item" href="settings.html">${userName}</a>`;
  }
}
async function getAllRecipes() {
  let response = await fetch(recipeUrl);
  return await response.json();
}

async function populateRecipeCards() {
    const recipes = await getAllRecipes();
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    const cuisineFilter = document.getElementById('cuisineFilter').value;
    const recipeCardsContainer = document.getElementById('recipeCards');
    const noRecipesFoundMessage = document.getElementById('noRecipesFoundMessage');
    const clearFiltersLink = document.getElementById('clearFiltersLink');
    recipeCardsContainer.innerHTML = '';
    
    const filteredRecipes = recipes.filter(recipe =>
      recipe.recipeName.toLowerCase().includes(searchQuery) &&
      (cuisineFilter === "All" || recipe.cuisineType === cuisineFilter)
    );
  
    if (filteredRecipes.length === 0) {
      noRecipesFoundMessage.style.display = 'block';
      clearFiltersLink.style.display = 'block';
      return;
    } else {
      noRecipesFoundMessage.style.display = 'none';
      clearFiltersLink.style.display = 'none';
    }
  
    filteredRecipes.forEach(recipe => {
      const cardHtml = `
        <div class="col">
          <div class="card">
            <img src="${recipe.recipeIMG}" class="card-img-top" alt="${recipe.recipeName}">
            <div class="card-body">
              <h5 class="card-title">${recipe.recipeName}</h5>
              <p class="card-text">Cuisine: ${recipe.cuisineType}</p>
              <p class="card-text">Total Time: ${recipe.totalTime}</p>
              <a href="SingleRecipe.html?id=${recipe.recipeID}" class="btn btn-primary btn-view-recipe">View Recipe</a>

            </div>
          </div>
        </div>`;
      recipeCardsContainer.innerHTML += cardHtml;
    });
}

async function populateCuisineFilter() {
  const recipes = await getAllRecipes();
  const cuisineOptions = new Set(recipes.map(recipe => recipe.cuisineType));
  const cuisineFilter = document.getElementById('cuisineFilter');
  cuisineFilter.innerHTML = '<option value="All">All</option>';

  cuisineOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.textContent = option;
    cuisineFilter.appendChild(optionElement);
  });
}

populateCuisineFilter();

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('cuisineFilter').value = 'All';
    populateRecipeCards();
}

function showConfirmationPopup() {
    const confirmation = confirm('Ready to try your luck at a random recipe?');
    if (confirmation) {
        showRandomRecipe();
    } else {
    }
}

async function showRandomRecipe() {
    const recipes2 = await getAllRecipes();
    const recipeIds = recipes2.map(recipe => recipe.recipeID);
    const randomRecipeId = getRandomItemFromArray(recipeIds);
    const randomRecipe = recipes2.find(recipe => recipe.recipeID === randomRecipeId);
    if (randomRecipe) {
        window.location.href = `SingleRecipe.html?id=${randomRecipe.recipeID}`;
    } else {
        console.error('Random recipe not found.');
    }
}

function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartButton = document.getElementById('shoppingCartBtn');
  if (cartItemCount > 0) {
    cartButton.textContent = `Checkout (${cartItemCount})`;
  } else {
    cartButton.textContent = 'Checkout';
  }
}