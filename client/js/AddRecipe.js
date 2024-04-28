let recipes = [];
let addedRecipeID = 0;

async function handleOnLoad() {
    const storedRecipes = localStorage.getItem('recipes');
    recipes = JSON.parse(storedRecipes) || [];

  const page = document.getElementById("AddRecipePage");
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
                <h1 class="mt-4">Add Recipe</h1>

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
                    <input type="text" id="cuisineType" name="cuisineType" class="form-control" list="cuisineList">
                    <datalist id="cuisineList"></datalist> <!-- Datalist for autocomplete -->
                    </div>
                
                    <div class="mb-3">
                        <label for="instructions">Instructions:</label>
                        <textarea id="instructions" name="instructions" class="form-control"></textarea>
                    </div>
                
                    <div class="mb-3">
                        <label for="numOfServings">Number of Servings:</label>
                        <input type="number" id="numOfServings" name="numOfServings" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="prepTime">Preparation Time (in min):</label>
                        <input type="text" id="prepTime" name="prepTime" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="cookTime">Cooking Time (in min):</label>
                        <input type="text" id="cookTime" name="cookTime" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="totalTime">Total Time:</label>
                        <input type="text" id="totalTime" name="totalTime" class="form-control">
                    </div>
                
                    <div class="mb-3">
                        <label for="strImageSource">Image URL:</label>
                        <input type="text" id="strImageSource" name="strImageSource" class="form-control">
                    </div>
                
                    <!-- Ingredients section -->
                    <div class="ingredients-section mb-3">
                        <h3>Ingredients</h3>
                        <div class="total-ingredients-section">
                            <div class="total-ingredient-entry">
                                <label for="totalIngredientName">Ingredient Name:</label>
                                <input type="text" id="totalIngredientName" name="totalIngredientName" class="form-control">
                            
                                <label for="unitPrice">Price:</label>
                                <input type="number" id="unitPrice" name="unitPrice" min="1" max="9999" class="form-control">
                            </div>
                        </div>
                        <button type="button" onclick="handleAddIngredient()" id="addIngredientButton" class="btn btn-primary">Add Ingredient</button>
                    </div>
                    <div id="ingredientsTable" class="ingredients-table">
                       
                    </div>
                
                    <button type="submit" class="btn btn-primary">Add Recipe</button>
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
</div>`;
  page.innerHTML = html;
  ingredients = []; 
  await populateIngredientsTable();
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

async function handleAddIngredient() {
    
    const ingredientName = document.getElementById('totalIngredientName').value;
    const unitPrice = document.getElementById('unitPrice').value;

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

async function addNewIngredient(name, unitPrice, imageURL) {
    const newIngredient = {
        recipeID: await getNextRecipeId(),
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

async function getNextRecipeId() {
    try {
        const response = await fetch('http://localhost:5010/api/recipes/nextRecipeId');
        const data = await response.json();
        console.log(data)
        return data;

    } catch (error) {
        console.error('Error fetching next recipe ID:', error);
        return null;
    }
}




async function populateIngredientsTable() {
    const table = document.getElementById('ingredientsTable');
    let html = `<table class="table">
        <tr>
            <th>Ingredient</th>
            <th>Price</th>
            <th>Action</th>

        </tr>`;

        try {
            const recipeID = await getNextRecipeId();
            const response = await fetch(`http://localhost:5010/api/Ingredients/${recipeID}`);
            if (response.ok) {
                const ingredients = await response.json();
                const activeIngredients = ingredients.filter(ingredient => !ingredient.deleted);
    
                activeIngredients.forEach(ingredient => {
                    html += `
                    <tr>
                        <td>${ingredient.ingredientName}</td>
                        <td>${ingredient.unitPrice}</td>
                        <td>
                        <button type="button" onclick="deleteIngredient(${ingredient.ingredientID})" class="btn btn-danger">Delete</button>
                    </td>
                    </tr>`;
            });
        }
    } catch (error) {
        console.error('Error fetching and populating ingredients table:', error);
    }

    html += `</table>`;
    table.innerHTML = html;
}


function clearIngredientFields() {
    document.getElementById('totalIngredientName').value = "";
    document.getElementById('totalIngredientAmount').value = "";
    document.getElementById('totalIngredientUnit').selectedIndex = 0;
}

async function handleAddRecipe(event) {
    event.preventDefault();

    const recipeName = document.getElementById('recipeName').value;
    const cuisineType = document.getElementById('cuisineType').value;
    const instructions = document.getElementById('instructions').value;
    const numOfServings = document.getElementById('numOfServings').value;
    const prepTime = document.getElementById('prepTime').value;
    const cookTime = document.getElementById('cookTime').value;
    const totalTime = document.getElementById('totalTime').value;
    const strImageSource = document.getElementById('strImageSource').value;

    const newRecipe = {
        recipename: recipeName,
        cuisineType: cuisineType,
        instructions: instructions,
        numOfServings: numOfServings,
        prepTime: prepTime,
        cookTime: cookTime,
        totalTime: totalTime,
        recipeIMG: strImageSource,
        deleteRecipe: false
    };

    try {
        const response = await fetch('http://localhost:5010/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        });

    } catch{
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