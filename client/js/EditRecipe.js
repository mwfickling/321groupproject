async function handleOnLoad(){
    const page = document.getElementById('EditRecipePage')
    let html = `<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          
    <a class="navbar-brand ps-3" href="Analytics.html">Shop By Recipe</a>

    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
 
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
            
        </div>
    </form>
  
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#!">Settings</a></li>
                <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#!">Logout</a></li>
            </ul>
        </li>
    </ul>
</nav>
<div id="layoutSidenav">
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <div class="nav">
                    <div class="sb-sidenav-menu-heading">Core</div>
                    <a class="nav-link" href="Analytics.html">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        Analytics
                    </a>
                    
                   
                    <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                        <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                Authentication
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" href="login.html">Login</a>
                                    <a class="nav-link" href="register.html">Register</a>
                                    <a class="nav-link" href="password.html">Forgot Password</a>
                                </nav>
                            </div>
                            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                Error
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            </div>
                        </nav>
                    </div>
                    <div class="sb-sidenav-menu-heading">Admin Dashboard</div>
                    <a class="nav-link" href="AddRecipe.html">
                        <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                        Add Recipe
                    </a>
                    <a class="nav-link" href="EditRecipe.html">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                        Edit Recipe
                    </a>
                    <a class="nav-link" href="AdminSettings.html">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                        Account Information
                    </a>
                    <a class="nav-link" href="CustomerList.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                    Customer List
                </a>
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                **USERNAME**
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Edit Recipe</h1>
                <div class="card">
                    <div class="card-header">
                        Select Recipe to Edit
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="selectRecipe">Select Recipe:</label>
                            <select id="selectRecipe" class="form-control" onchange="populateRecipeFields()">
                                <option value="">Select a recipe</option>
                                <!-- Options will be dynamically populated here -->
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        New Recipe
                    </div>
                    <div class="card-body">
                    <form id="recipeForm" onsubmit="handleAddRecipe(event)">
                    <div class="mb-3">
                        <label for="recipeName">Recipe Name:</label>
                        <input type="text" id="recipeName" name="recipeName" class="form-control">
                    </div>
                
                
                    <div class="mb-3">
                        <label for="cuisineType">Cuisine Type:</label>
                        <input type="text" id="cuisineType" name="cuisineType" class="form-control">

                    </div>
                
                    <div class="mb-3">
                        <label for="instructions">Instructions:</label>
                        <textarea id="instructions" name="instructions" class="form-control"></textarea>
                    </div>
                
                    <div class="mb-3">
                        <label for="numofServings">Number of Servings:</label>
                        <input type="number" id="numofServings" name="numofServings" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="prepTime">Preparation Time:</label>
                        <input type="text" id="prepTime" name="prepTime" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="cookTime">Cooking Time:</label>
                        <input type="text" id="cookTime" name="cookTime" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="totalTime">Total Time:</label>
                        <input type="text" id="totalTime" name="totalTime" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="strImageSource">Image Source:</label>
                        <input type="text" id="strImageSource" name="strImageSource" class="form-control">
                    </div>
                
                    <!-- Ingredients section -->
                    <div class="ingredients-section mb-3">
                        <h3>Ingredients</h3>
                        <div class="total-ingredients-section">
                            <div class="total-ingredient-entry">
                                <label for="totalIngredientName">Ingredient Name:</label>
                                <input type="text" id="totalIngredientName" name="totalIngredientName" class="form-control">
                                
                                <label for="totalIngredientAmount">Amount:</label>
                                <input type="number" id="totalIngredientAmount" name="totalIngredientAmount" min="1" max="9999" class="form-control">
                                
                                <label for="totalIngredientUnit">Unit:</label>
                                <select id="totalIngredientUnit" name="totalIngredientUnit" class="form-control">
                                    <option value="grams">grams</option>
                                    <option value="kilograms">kilograms</option>
                                    <option value="liters">liters</option>
                                    <option value="milliliters">milliliters</option>
                                    <option value="cups">cups</option>
                                    <option value="tablespoons">tablespoons</option>
                                    <option value="teaspoons">teaspoons</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" onclick="handleAddIngredient()" id="addIngredientButton" class="btn btn-primary">Add Ingredient</button>
                    </div>
                    <div id="ingredientsTable" class="ingredients-table">
                        <!-- Ingredients will be listed here -->
                    </div>
                
                    <button type="submit" class="btn btn-primary">Edit Recipe</button>
                </form>
                
                    </div>
                </div>
            </div>
        </main>
        
        <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; CrimsonTech 2024</div>
                    <div>
                        <a href="#">About Us</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</div>`
    page.innerHTML = html;
    populateRecipeDropdown();
}

function handleAddIngredient() {
    const ingredientName = document.getElementById('totalIngredientName').value;
    const ingredientAmount = document.getElementById('totalIngredientAmount').value;
    const ingredientUnit = document.getElementById('totalIngredientUnit').value;

    const newIngredient = {
        id: crypto.randomUUID(),
        name: ingredientName,
        amount: ingredientAmount,
        unit: ingredientUnit,
        deleted: false
    };

    ingredients.push(newIngredient);
    populateIngredientsTable();
    clearIngredientFields();
}

function deleteIngredient(id) {
    const index = ingredients.findIndex(ingredient => ingredient.id === id);

    if (index !== -1) {
        ingredients[index].deleted = true;
    }

    populateIngredientsTable();
}


function clearIngredientFields() {
    document.getElementById('totalIngredientName').value = "";
    document.getElementById('totalIngredientAmount').value = "";
    document.getElementById('totalIngredientUnit').selectedIndex = 0;
}

async function populateRecipeDropdown() {
    const selectRecipe = document.getElementById('selectRecipe');

    try {
        const response = await fetch('http://localhost:5010/api/recipes');
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const recipes = await response.json();

        selectRecipe.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select a recipe';
        selectRecipe.appendChild(defaultOption);

        recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.value = recipe.recipeID; 
            option.textContent = recipe.recipeName;
            selectRecipe.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}
async function populateRecipeFields() {
    const selectedRecipeId = document.getElementById('selectRecipe').value;

    const response = await fetch(`http://localhost:5010/api/recipes/${selectedRecipeId}`);
   const recipe = await response.json();

    if (recipe) {
        document.getElementById('recipeName').value = recipe.recipeName;
        document.getElementById('cuisineType').value = recipe.cuisineType;
        document.getElementById('instructions').value = recipe.instructions;
        document.getElementById('numofServings').value = recipe.numofServings;
        document.getElementById('prepTime').value = recipe.prepTime;
        document.getElementById('cookTime').value = recipe.cookTime;
        document.getElementById('totalTime').value = recipe.totalTime;
        document.getElementById('strImageSource').value = recipe.recipeIMG;
        populateIngredientsTable();
    } else {
        document.getElementById('recipeName').value = '';
        document.getElementById('cuisineType').value = '';
        document.getElementById('instructions').value = '';
        document.getElementById('numofServings').value = '';
        document.getElementById('prepTime').value = '';
        document.getElementById('cookTime').value = '';
        document.getElementById('totalTime').value = '';
        document.getElementById('strImageSource').value = '';
    }
}

async function populateIngredientsTable() {
    const selectedRecipeId = document.getElementById('selectRecipe').value;

    try {
        const response = await fetch(`http://localhost:5010/api/ingredients/${selectedRecipeId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch ingredients');
        }
        const ingredients = await response.json();

        const table = document.getElementById('ingredientsTable');
        let html = `<table class="table">
            <tr>
                <th>Ingredient</th>
                <th>Price</th>
            </tr>`;

        ingredients.forEach(ingredient => {
            html += `
            <tr>
                <td>${ingredient.ingredientName}</td>
                <td>${ingredient.unitPrice}</td>
                
            </tr>`;
        });

        html += `</table>`;
        table.innerHTML = html;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
}