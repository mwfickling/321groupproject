function handleOnLoad() {
    const recipeId = localStorage.getItem('selectedRecipeId'); //Retrieve the recipe ID
    console.log('Retrieved Recipe ID:', recipeId); 
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = JSON.parse(storedRecipes) || [];
    const recipe = recipes.find(r => r.RecipeID === recipeId); //Find the recipe

    if (recipes.length === 0) {
        console.error('No recipes found in localStorage');
        return;
    }

    const page = document.getElementById('SingleRecipePage'); //ChatGPT error handling
    if (!page) {
        console.error('The page element with ID \'SingleRecipePage\' was not found.');
        return;
    }
    

    const totalPrice = recipe.ingredients.reduce((total, ingredient) => {
        const price = parseFloat(ingredient.unitPrice.replace('$', '')); //format is "$1.20"
        return total + price;
    }, 0);

  
    const pricePerServing = (totalPrice / recipe.numOfServings).toFixed(2); //toFixed acts as a double

    let html = `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        ...
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
                <h3>Total Price</h3>
                <p>$${totalPrice.toFixed(2)}</p>
            </div>
            <div class="price-box">
                <h3>Price Per Serving</h3>
                <p>$${pricePerServing}</p>
            </div>
            <a href="#ingredientsList" class="button">View Ingredients</a>
            <a href="./PayScreen.html" class="button">Checkout</a>
        </div>
    </div>
    <footer class="py-4 bg-light mt-auto">
        ...
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
