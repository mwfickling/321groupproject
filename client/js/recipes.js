const recipeUrl = "http://localhost:5010/api/recipes";
let recipeIDs = [];

document.addEventListener("DOMContentLoaded", async () => {
  populateRecipeCards();
  document.getElementById('searchInput').addEventListener('input', populateRecipeCards);
  document.getElementById('cuisineFilter').addEventListener('change', populateRecipeCards);
  document.getElementById('clearFiltersLink').addEventListener('click', clearFilters);
  document.getElementById('feelingLuckyBtn').addEventListener('click', () => {
    showConfirmationPopup();
});

});

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
              <a href="SingleRecipe.html?id=${recipe.id}" class="btn btn-primary btn-view-recipe">View Recipe</a>

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
  cuisineFilter.innerHTML = '<option value="All">All</option>'; s

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
    const recipeIds = recipes2.map(recipe => recipe.id);
    const randomRecipeId = getRandomItemFromArray(recipeIds);
    const randomRecipe = recipes2.find(recipe => recipe.id === randomRecipeId);
    if (randomRecipe) {
        window.location.href = `SingleRecipe.html?id=${randomRecipe.id}`;
    } else {
        console.error('Random recipe not found.');
    }
}

function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}