function handleOnLoad() {
    const recipeId = localStorage.getItem('selectedRecipeId'); // Retrieve the recipe ID
    console.log('Retrieved Recipe ID:', recipeId); 
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = JSON.parse(storedRecipes) || [];
    const recipe = recipes.find(r => r.RecipeID === recipeId); // Find the recipe

    if (!storedRecipes) {
        console.error('No recipes found in localStorage');
        return; 
    }


    if (recipes.length === 0) {
        console.error('No recipes found in localStorage');
        return;
    }

    const page = document.getElementById('SingleRecipePage');
    if (!page) {
        console.error('The page element with ID \'SingleRecipePage\' was not found.');
        return;
    }
    
    let html = `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container-fluid">
            <img src="./assets/img/oopsies.png" class="navbar-logo" />
            <a class="navbar-brand" href="Analytics.html">Shop By Recipe</a>
            <div class="d-flex justify-content-center flex-grow-1">
                <a class="navbar-brand" href="./recipes.html">Recipes</a>
                <a class="navbar-brand" href="./contact.html">Contact</a>
                <a class="navbar-brand" href="#" id="thirdSection">Coming Soon</a>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-user fa-fw"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="./settings.html">Settings</a></li>
                        <li><a class="dropdown-item" href="./login.html">Login / Sign-up</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li><a class="dropdown-item" href="./PayScreen.html">Checkout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
    <style>
    .navbar-logo {
        height: 48px;
        width: auto;
        object-fit: contain;
    }
</style>
    <div class="container">
        <div class="main-content">
            <h1 class="recipe-name">${recipe.recipename}</h1>
            <img src="${recipe.strImageSource}" alt="${recipe.recipename}" class="recipe-image">
            <div class="instructions">
                <h2>Instructions</h2>
                <p>${recipe.instructions}</p>
            </div>
            <div class="ingredients-list" id="ingredientsList">
                <h3>Ingredients</h3>
                <ul>`;
    recipe.ingredients.forEach(ingredient => {
        html += `<li class="ingredient">${ingredient.name} - ${ingredient.measure}</li>`;
    });
    html += `       </ul>
            </div>
        </div>
        <div class="sidebar">
            <div class="time-box">
                <h3>Prep Time</h3>
                <p>${recipe.prepTime}</p>
            </div>
            <div class="time-box">
                <h3>Cook Time</h3>
                <p>${recipe.cookTime}</p>
            </div>
            <div class="time-box">
                <h3>Total Time</h3>
                <p>${recipe.totalTime}</p>
            </div>
            <div class="price-box">
                <h3>Price</h3>
                <p>Price details not provided</p> <!-- Modify as needed -->
            </div>
            <div class="price-box">
                <h3>Price Per Serving</h3>
                <p>Price per serving details not provided</p> <!-- Modify as needed -->
            </div>
            <a href="#ingredientsList" class="button">View Ingredients</a>
            <a href="./PayScreen.html" class="button">Checkout</a>
        </div>
    </div>
    <footer class="py-4 bg-light mt-auto">
        <div class="container-fluid text-center">
            <div class="d-flex justify-content-between small">
                <div class="text-muted">Copyright &copy; CrimsonTech 2023</div>
                <div>
                    <a href="#">About Us</a>
                    &middot;
                    <a href="#">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
    </footer>`;
    
    page.innerHTML = html;
}
  function saveToLocalStorage(key, value) { //key = first value, value= second value
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  saveToLocalStorage('recipes', recipes);
  saveToLocalStorage('ingredients', ingredients);
  console.log(recipes)
  console.log(ingredients)
