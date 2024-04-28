async function handleOnLoad(){
    const page = document.getElementById('EditRecipePage')
    let html = `<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          
    <a class="navbar-brand ps-3" href="recipes.html">Shop By Recipe</a>
 
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
            
        </div>
    </form>
  
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="analytics.html">Analytics</a></li>
            <li><a class="dropdown-item" href="addrecipe.html">Add Recipe</a></li>
            <li><a class="dropdown-item" href="editrecipe.html">Edit Recipe</a></li>
            <li><a class="dropdown-item" href="customerlist.html">Customers</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#" onclick="handleLogout()">Logout</a></li>            </ul>
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
                    <a class="nav-link" href="CustomerList.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                    Customer List
                </a>
                </div>
            </div>
            <div class="sb-sidenav-footer">
            <div class="small">Logged in as:</div>
            <span id="loggedInUsername">Loading...</span>
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
                    <form id="recipeForm" onsubmit="handleEditRecipe(event)">
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
                                
                                <label for="totalIngredientPrice">Price:</label>
                                <input type="number" id="totalIngredientPrice" name="totalIngredientPrice" min="1" max="9999" class="form-control">
                            
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
    try {
        const userId = sessionStorage.getItem('loggedInUserId');
        const userData = await fetchUserData(userId);
        setLoggedInUsername(userData.firstName, userData.lastName);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    }
    async function fetchUserData(userId) {
    const response = await fetch(`http://localhost:5010/api/customers/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return await response.json();
    }

    async function addNewIngredient(name, unitPrice, imageURL) {
        const selectedRecipeId = document.getElementById('selectRecipe').value;
        const newIngredient = {
            recipeID: selectedRecipeId,
            ingredientName: name,
            ingredientDescripiton: '',
            unitPrice: parseFloat(unitPrice), 
            ingredientIMG: imageURL 
        };
        console.log(JSON.stringify(newIngredient))
    
        try {
            const response = await fetch('http://localhost:5010/api/Ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newIngredient)
            });
        } catch{
        }
        await populateIngredientsTable();
    }


async function deleteIngredient(ingredientID) {
    try {
        const response = await fetch(`http://localhost:5010/api/Ingredients/${ingredientID}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Reload ingredients table after deletion
            await populateIngredientsTable();
        } else {
            console.error('Failed to delete ingredient:', response.status);
        }
    } catch (error) {
        console.error('Error deleting ingredient:', error);
    }
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
        <th>Action</th> <!-- New column for delete button -->
    </tr>`;

        ingredients.forEach(ingredient => {
            html += `
            <tr>
                <td>${ingredient.ingredientName}</td>
                <td>${ingredient.unitPrice}</td>
                <td><button onclick="deleteIngredient('${ingredient.ingredientID}')" class="btn btn-danger">Delete</button></td> <!-- Delete button -->

            </tr>`;
        });

        html += `</table>`;
        table.innerHTML = html;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
}

function setLoggedInUsername(firstName, lastName) {
    const loggedInUsernameElement = document.getElementById('loggedInUsername');
    loggedInUsernameElement.textContent = `${firstName} ${lastName}`;
}

async function handleLogout() {
    // Clear logged-in user
    sessionStorage.clear();
    // Redirect to login page
    window.location.href = 'login.html';
}
async function handleEditRecipe(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const selectedRecipeId = document.getElementById('selectRecipe').value;
    const recipeName = document.getElementById('recipeName').value;
    const cuisineType = document.getElementById('cuisineType').value;
    const instructions = document.getElementById('instructions').value;
    const numofServings = document.getElementById('numofServings').value;
    const prepTime = document.getElementById('prepTime').value;
    const cookTime = document.getElementById('cookTime').value;
    const totalTime = document.getElementById('totalTime').value;
    const strImageSource = document.getElementById('strImageSource').value;

    const editedRecipe = {
        recipeID: selectedRecipeId,
        recipename: recipeName,
        cuisineType: cuisineType,
        instructions: instructions,
        numofServings: numofServings,
        prepTime: prepTime,
        cookTime: cookTime,
        totalTime: totalTime,
        recipeIMG: strImageSource,
        deleteRecipe: false
    };
    console.log(editedRecipe)
    try {
        await fetch(`http://localhost:5010/api/recipes/${selectedRecipeId}`, {
            method: 'PUT',
            body: JSON.stringify(editedRecipe),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
    } catch (error) {
        console.error('Error editing recipe:', error);
    }
}

async function handleAddIngredient() {
    
    const ingredientName = document.getElementById('totalIngredientName').value;
    const unitPrice = document.getElementById('totalIngredientPrice').value;

    const matchingIngredients = await getIngredientsByName(ingredientName);

    if (matchingIngredients.length > 0) {
        const imageURL = matchingIngredients[0].ingredientIMG;
        addNewIngredient(ingredientName, unitPrice, imageURL);
        await populateIngredientsTable();

    } else {
        const userInput = prompt(`Enter an image URL for ${ingredientName}:`);
        const imageURL = userInput; 
        addNewIngredient(ingredientName, unitPrice, imageURL);
        await populateIngredientsTable();

    }
}

async function getIngredientsByName(name) {
    const response = await fetch(`http://localhost:5010/api/Ingredients/ByName/${name}`);
    if (response.ok) {
        return await response.json();
    } else {
        return [];
    }
}