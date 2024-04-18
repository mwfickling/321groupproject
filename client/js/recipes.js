
function handleOnLoad() {
 

    const page = document.getElementById('RecipePage');
    if (!page) {
        console.error('Page element not found.');
        return;
    }
debugger
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    console.log('All Recipes:');
    recipes.forEach(recipe => {
        console.log('Recipe ID:', recipe.RecipeID);
        console.log('Recipe Name:', recipe.recipename);
        console.log('Order ID:', recipe.orderID);
        console.log('Cuisine Type:', recipe.cuisintype);
        console.log('Instructions:', recipe.instructions);
        console.log('Number of Servings:', recipe.numOfServings);
        console.log('Prep Time:', recipe.prepTime);
        console.log('Cook Time:', recipe.cookTime);
        console.log('Total Time:', recipe.totalTime);
        console.log('Ingredients:');
        recipe.ingredients.forEach(ingredient => {
            console.log('  - Name:', ingredient.name);
            console.log('    Measure:', ingredient.measure);
            console.log('    Unit Price:', ingredient.unitPrice);
        });
        console.log('Image Source:', recipe.strImageSource);
        console.log('---'); 
    });

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
        </div>
    </nav>
    <style>
    .navbar-logo {
        height: 48px; 
        width: auto;
        object-fit: contain;
    }
</style>
    <h3>Cuisine</h3>
    <div class="scroll-container">`;

    const cuisines = [
        { name: 'Italian', image: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg' },
        { name: 'Mexican', image: 'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/17/00/23/Mq92FgsOQYuAUcSQ7DNG_MEXICAN_TAMALES_V_f.jpg' },
        { name: 'Chinese', image: 'https://www.hotelmousai.com/blog/wp-content/uploads/2021/11/Chinise-food.jpg' },
        { name: 'Indian', image: 'https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg' },
        { name: 'Thai', image: 'https://speedy.uenicdn.com/1d644ed5-b758-4229-b8ba-736fa89e3df2/c720_a/image/upload/v1684866693/business/015a869d-d333-4348-aa40-fa3fc741e9a8.jpg' }
    ];
    
    cuisines.forEach(cuisine => {
        html += `<div class="scroll-item" data-cuisine="${cuisine.name}" onclick="showRecipesByCuisine('${cuisine.name}')" style="background-image: url('${cuisine.image}'); min-width: 200px; height: 200px; background-size: cover; background-position: center; color: white; text-decoration: none; margin-right: 10px;">${cuisine.name}</div>`;
    });
    
    
    html += `</div>
    <h3>Recipes</h3>
    <div class="scroll-container" style="display: flex; overflow-x: auto;">`;  
    recipes.forEach(recipe => {
        html += `<div class="scroll-item" onclick="selectRecipe('${recipe.RecipeID}')" style="background-image: url('${recipe.strImageSource}'); min-width: 200px; height: 200px; background-size: cover; background-position: center; color: white; text-decoration: none; margin-right: 10px;">${recipe.recipename}</div>`;
    });  

    
    html += `</div>
    <h3>Ingredients</h3>
    <div class="scroll-container">`;

    ingredients.forEach(ingredient => {
        html += `<div class="scroll-item" style="background-image: url('${ingredient.sourceImage}'); min-width: 200px; height: 200px; background-size: cover; background-position: center; color: white; text-decoration: none; margin-right: 10px;">${ingredient.ingredientName}</div>`;
    });
    

    html += `</div>
    <div id="recipeModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="modalTitle"></h2>
            <table id="recipeTable">
                <tr>
                    <th>Recipe Name</th>
                    <th>Prep Time</th>
                    <th>Cook Time</th>
                    <th>Total Time</th>
                </tr>
            </table>
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
    setupModal();
    
}

function selectRecipe(recipeId) {
    console.log('Setting selected recipe ID:', recipeId);
    localStorage.setItem('selectedRecipeId', recipeId);
    window.location.href = 'SingleRecipe.html'; // Redirect to the details page
    console.log(recipeId)
}


function showRecipesByCuisine(cuisine) {
    const modal = document.getElementById('recipeModal');
    const title = document.getElementById('modalTitle');
    const table = document.getElementById('recipeTable');
    
    //Clear previous table rows except the header. Stackoverflow
    while (table.rows.length > 1) table.deleteRow(1);

    //Set title
    title.textContent = `Recipes for ${cuisine}`;

    //Filter and display recipes
    const storedRecipes = localStorage.getItem('recipes');
    let recipes = [];
    if (storedRecipes) {
      recipes = JSON.parse(storedRecipes);
    }    
    recipes.filter(recipe => recipe.cuisintype === cuisine).forEach(recipe => {
        const row = table.insertRow();
        row.insertCell(0).textContent = recipe.recipename;
        row.insertCell(1).textContent = recipe.prepTime;
        row.insertCell(2).textContent = recipe.cookTime;
        row.insertCell(3).textContent = recipe.totalTime;
    });

    modal.style.display = 'block';
}

function setupModal() {
    const modal = document.getElementById('recipeModal');
    const closeBtn = document.querySelector('.modal .close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}
// console.log(recipes)
document.addEventListener('DOMContentLoaded', handleOnLoad);




// const recipes = [
//     {
//         RecipeID: "1",
//         recipename: "Mediterranean Pasta Salad",
//         orderID: "Seafood",
//         cuisintype: "Italian",
//         instructions: "Bring a large saucepan of salted water to the boil. Add the pasta and cook for about 10 minutes or as directed...",
//         numOfServings: 4,
//         prepTime: "15 minutes",
//         cookTime: "10 minutes",
//         totalTime: "25 minutes",
//         ingredients: [
//           { name: "mozzarella balls", measure: "200 g", unitPrice: "$5.00" },
//           { name: "baby plum tomatoes", measure: "250 g", unitPrice: "$3.00" },
//           { name: "fresh basil", measure: "1 bunch", unitPrice: "$1.50" },
//           { name: "farfalle", measure: "350 g", unitPrice: "$2.00" },
//           { name: "extra virgin olive oil", measure: "3 tablespoons", unitPrice: "$0.30" },
//           { name: "Green Olives", measure: "40 g", unitPrice: "$1.00" },
//           { name: "tuna", measure: "200 g", unitPrice: "$4.00" },
//           { name: "salt", measure: "to taste", unitPrice: "$0.05" },
//           { name: "pepper", measure: "to taste", unitPrice: "$0.10" }
//         ],
//         strImageSource: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg"
//       },
//       {
//         RecipeID: "2",
//         recipename: "Seafood Fideuà",
//         orderID: "Seafood",
//         cuisintype: "Spanish",
//         instructions: "Begin by preparing the mussels and prawns as described. Sauté onions in olive oil, add garlic, and then the vermicelli, toasting it till brown. Add the seafood, saffron, paprika, and other ingredients, cooking under cover. Mix occasionally and add the mussels and prawns strategically. Finish with lemon juice and parsley.",
//         numOfServings: "4",
//         prepTime: "10 mins",
//         cookTime: "20 mins",
//         totalTime: "30 mins",
//         ingredients: [
//           { name: "Mussels", measure: "400g" },
//           { name: "Prawns", measure: "8" },
//           { name: "Saffron", measure: "2 pinches" },
//           { name: "Vermicelli", measure: "350g" },
//           { name: "Olive Oil", measure: "5 tblsp" },
//           { name: "Onions", measure: "1 large" },
//           { name: "Garlic", measure: "3 cloves" },
//           { name: "Paprika", measure: "2 tbs" },
//           { name: "Monkfish", measure: "1 tail" },
//           { name: "Baby Squid", measure: "4" },
//           { name: "Fish Stock", measure: "650ml" },
//           { name: "Tomatoes", measure: "2 large" },
//           { name: "Lemon", measure: "Juice of 1" },
//           { name: "Parsley", measure: "Topping" }
//         ],
//         strImageSource: "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg"
//       }
//       ,
//       {
//         RecipeID: "3",
//         recipename: "Broccoli & Stilton Soup",
//         orderID: "Seafood",
//         cuisintype: "Italian",
//         instructions: "Heat the rapeseed oil in a large saucepan and then add the onions. Cook on a medium heat until soft...",
//         numOfServings: "4",
//         prepTime: "10 min",
//         cookTime: "40 min",
//         totalTime: "50 min",
//         ingredients: [
//           { name: "Rapeseed Oil", measure: "2 tblsp" },
//           { name: "Onion", measure: "1 finely chopped" },
//           { name: "Celery", measure: "1" },
//           { name: "Leek", measure: "1 sliced" },
//           { name: "Potatoes", measure: "1 medium" },
//           { name: "Butter", measure: "1 knob" },
//           { name: "Vegetable Stock", measure: "1 litre hot" },
//           { name: "Broccoli", measure: "1 Head chopped" },
//           { name: "Stilton Cheese", measure: "140g" }
//         ],
//         strImageSource: "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg"
//       },
//       {
//         "RecipeID": "52945",
//         "recipename": "Kung Pao Chicken",
//         "orderID": "Seafood",
//         "cuisintype": "Chinese",
//         "instructions": "Combine the sake or rice wine, soy sauce, sesame oil, and cornflour dissolved in water. Marinate the chicken in half of this mixture for 30 minutes. In a pan, sauté the marinated chicken until cooked. In another pan, combine the remaining mixture with chili powder, vinegar, and sugar, then add spring onions, garlic, water chestnuts, and peanuts. Simmer until the sauce thickens and mix with the chicken.",
//         "numOfServings": "4",
//         "prepTime": "10 min",
//         "cookTime": "30 min",
//         "totalTime": "40 min",
//         "strIngredient1": "Sake",
//         "strMeasure1": "2 tbs",
//         "strIngredient2": "Soy Sauce",
//         "strMeasure2": "2 tbs",
//         "strIngredient3": "Sesame Seed Oil",
//         "strMeasure3": "2 tbs",
//         "strIngredient4": "Corn Flour",
//         "strMeasure4": "2 tbs",
//         "strIngredient5": "Water",
//         "strMeasure5": "2 tbs",
//         "strIngredient6": "Chicken",
//         "strMeasure6": "500g",
//         "strIngredient7": "Chilli Powder",
//         "strMeasure7": "1 tbs",
//         "strIngredient8": "Rice Vinegar",
//         "strMeasure8": "1 tsp",
//         "strIngredient9": "Brown Sugar",
//         "strMeasure9": "1 tbs",
//         "strIngredient10": "Spring Onions",
//         "strMeasure10": "4 chopped",
//         "strIngredient11": "Garlic Clove",
//         "strMeasure11": "6 cloves",
//         "strIngredient12": "Water Chestnut",
//         "strMeasure12": "220g",
//         "strIngredient13": "Peanuts",
//         "strMeasure13": "100g",
//         "strImageSource": "https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-scaled-1120x1382.jpg"
//       },
//       {
//         RecipeID: "52945",
//         recipename: "Kung Pao Chicken",
//         orderID: "Seafood",
//         cuisintype: "Chinese",
//         instructions: "Combine the sake or rice wine, soy sauce, sesame oil, and cornflour dissolved in water. Marinate the chicken in half of this mixture for 30 minutes. In a pan, sauté the marinated chicken until cooked. In another pan, combine the remaining mixture with chili powder, vinegar, and sugar, then add spring onions, garlic, water chestnuts, and peanuts. Simmer until the sauce thickens and mix with the chicken.",
//         numOfServings: "4",
//         prepTime: "10 min",
//         cookTime: "30 min",
//         totalTime: "40 min",
//         ingredients: [
//           { name: "Sake", measure: "2 tbs" },
//           { name: "Soy Sauce", measure: "2 tbs" },
//           { name: "Sesame Seed Oil", measure: "2 tbs" },
//           { name: "Corn Flour", measure: "2 tbs" },
//           { name: "Water", measure: "2 tbs" },
//           { name: "Chicken", measure: "500g" },
//           { name: "Chilli Powder", measure: "1 tbs" },
//           { name: "Rice Vinegar", measure: "1 tsp" },
//           { name: "Brown Sugar", measure: "1 tbs" },
//           { name: "Spring Onions", measure: "4 chopped" },
//           { name: "Garlic Clove", measure: "6 cloves" },
//           { name: "Water Chestnut", measure: "220g" },
//           { name: "Peanuts", measure: "100g" }
//         ],
//         strImageSource: "https://www.onceuponachef.com/images/2018/05/Kung-Pao-Chicken-16-scaled-1120x1382.jpg"
//       }
      
      
      
      
//   ];
  const ingredients = [
    {
      ingredientID: "1",
      recipeID: "1",
      ingredientName: "mozzarella balls",
      ingredientDescription: "Fresh mozzarella cheese balls",
      unitPrice: 5.99,
      sourceImage: "https://www.themealdb.com/images/ingredients/mozzarella.png"
    },
    {
      ingredientID: "2",
      recipeID: "1",
      ingredientName: "baby plum tomatoes",
      ingredientDescription: "Ripe plum tomatoes",
      unitPrice: 3.49,
      sourceImage: "https://www.themealdb.com/images/ingredients/tomato.png"
    },
    {
      ingredientID: "3",
      recipeID: "1",
      ingredientName: "fresh basil",
      ingredientDescription: "Fragrant basil leaves",
      unitPrice: "$1.99 per bunch",
      sourceImage: "https://www.themealdb.com/images/ingredients/basil.png"
    },
    {
      ingredientID: "4",
      recipeID: "1",
      ingredientName: "Pasta",
      ingredientDescription: "Bowtie pasta",
      unitPrice: "$1.79 per pound",
      sourceImage: "https://www.themealdb.com/images/ingredients/farfalle.png"
    },
    {
      ingredientID: "5",
      recipeID: "1",
      ingredientName: "extra virgin olive oil",
      ingredientDescription: "High-quality olive oil",
      unitPrice: "$8.99 per bottle",
      sourceImage: "https://www.themealdb.com/images/ingredients/extra%20virgin%20olive%20oil.png"
    },
    {
      ingredientID: "6",
      recipeID: "1",
      ingredientName: "Green Olives",
      ingredientDescription: "Pitted green olives",
      unitPrice: "$2.49 per jar",
      sourceImage: "https://www.themealdb.com/images/ingredients/Green%20Olives.png"
    },
    {
      ingredientID: "7",
      recipeID: "1",
      ingredientName: "tuna",
      ingredientDescription: "Canned tuna in water",
      unitPrice: "$3.99 per can",
      sourceImage: "https://www.themealdb.com/images/ingredients/tuna.png"
    },
    {
      ingredientID: "8",
      recipeID: "1",
      ingredientName: "salt",
      ingredientDescription: "Sea salt",
      unitPrice: "$1.29 per pound",
      sourceImage: "https://www.themealdb.com/images/ingredients/salt.png"
    },
    {
      ingredientID: "9",
      recipeID: "1",
      ingredientName: "pepper",
      ingredientDescription: "Ground black pepper",
      unitPrice: "$2.49 per jar",
      sourceImage: "https://www.themealdb.com/images/ingredients/pepper.png"
    },
    {
        ingredientID: "1",
        recipeID: "3",
        ingredientName: "Rapeseed Oil",
        ingredientDescription: "Used for cooking",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "2",
        recipeID: "3",
        ingredientName: "Onion",
        ingredientDescription: "Finely chopped",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "3",
        recipeID: "3",
        ingredientName: "Celery",
        ingredientDescription: "Fresh celery",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "4",
        recipeID: "3",
        ingredientName: "Leek",
        ingredientDescription: "Sliced leek",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "5",
        recipeID: "3",
        ingredientName: "Potatoes",
        ingredientDescription: "Medium potatoes",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "6",
        recipeID: "3",
        ingredientName: "Broccoli",
        ingredientDescription: "Chopped broccoli head",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "7",
        recipeID: "3",
        ingredientName: "Stilton Cheese",
        ingredientDescription: "Rich and creamy cheese",
        unitPrice: null,
        sourceImage: null
    },

    
    {
        ingredientID: "8",
        recipeID: "52945",
        ingredientName: "Sake",
        ingredientDescription: "Japanese rice wine",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "9",
        recipeID: "52945",
        ingredientName: "Soy Sauce",
        ingredientDescription: "Adds a salty flavor",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "10",
        recipeID: "52945",
        ingredientName: "Sesame Seed Oil",
        ingredientDescription: "Used for flavor and cooking",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "11",
        recipeID: "52945",
        ingredientName: "Chicken",
        ingredientDescription: "Main protein component",
        unitPrice: null,
        sourceImage: null
    },


    {
        ingredientID: "12",
        recipeID: "52830",
        ingredientName: "Chicken Breasts",
        ingredientDescription: "Main ingredient for the tacos",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "13",
        recipeID: "52830",
        ingredientName: "Vinaigrette Dressing",
        ingredientDescription: "Used for marinating the chicken",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "14",
        recipeID: "52830",
        ingredientName: "Cumin",
        ingredientDescription: "Spice that adds a warm flavor",
        unitPrice: null,
        sourceImage: null
    },
    {
        ingredientID: "15",
        recipeID: "52830",
        ingredientName: "Hard Taco Shells",
        ingredientDescription: "Serves as the container for the taco filling",
        unitPrice: null,
        sourceImage: null
    }
  ];
function saveRecipesToLocalStorage() {
    const recipesArray = JSON.stringify(recipes);
    localStorage.setItem('recipes', recipesArray);
    // console.log(recipesArray)
}
saveRecipesToLocalStorage();


