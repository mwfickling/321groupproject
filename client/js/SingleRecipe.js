document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  if (recipeId) {
      fetchRecipeDetails(recipeId);
  } else {
      console.error('Recipe ID not provided.');
  }
});

async function fetchRecipeDetails(recipeId) {
  try {
      const recipeResponse = await fetch(`http://localhost:5010/api/recipes/${recipeId}`);
      if (!recipeResponse.ok) {
          throw new Error('Failed to fetch recipe details.');
      }
      const recipe = await recipeResponse.json();

      document.getElementById('recipeImg').src = recipe.recipeIMG;
      document.getElementById('recipe-name').textContent = recipe.recipeName;
      document.getElementById('RecipeInstructions').textContent = recipe.instructions;
      document.getElementById('prepTime').textContent = recipe.prepTime;
      document.getElementById('cookTime').textContent = recipe.cookTime;
      document.getElementById('totalTime').textContent = recipe.totalTime;

      const ingredients = await getIngredientsByRecipeId(recipeId);

      const recipeIngredients = document.getElementById('recipeIngredients');
      recipeIngredients.innerHTML = ''; // Clear previous ingredients

      ingredients.forEach(ingredient => {
          const li = document.createElement('li');
          li.classList.add('ingredient');

          const img = document.createElement('img');
          img.src = ingredient.ingredientIMG;
          img.style.width = '35px';
          img.style.height = 'auto';
          img.style.marginRight = '5px';
          li.appendChild(img);

          const textNode = document.createTextNode(`${ingredient.ingredientName} - $${parseFloat(ingredient.unitPrice).toFixed(2)}`);
          li.appendChild(textNode);
          recipeIngredients.appendChild(li);
      });

      const totalPrice = ingredients.reduce((total, ingredient) => {
          const price = parseFloat(ingredient.unitPrice);
          return total + price;
      }, 0);
      const pricePerServing = totalPrice / recipe.numofServings;

      document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
      document.getElementById('pricePerServing').textContent = `$${pricePerServing.toFixed(2)}`;

      document.getElementById('viewIngredientsBtn').addEventListener('click', () => {
          document.getElementById('ingredientsList').scrollIntoView({ behavior: "smooth" });
      });

      document.getElementById('checkoutBtn').addEventListener('click', () => {
          window.location.href = "./PayScreen.html";
      });

  } catch (error) {
      console.error('Error fetching recipe details:', error.message);
  }
}

async function getIngredientsByRecipeId(recipeId) {
  try {
      const response = await fetch(`http://localhost:5010/api/ingredients/${recipeId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch ingredients.');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching ingredients:', error.message);
      throw error;
  }
}

function decrementQuantity() {
  let quantity = parseInt(document.getElementById('quantityInput').value);
  if (quantity > 1) {
      quantity--;
      document.getElementById('quantityInput').value = quantity;
  }
}

function incrementQuantity() {
  let quantity = parseInt(document.getElementById('quantityInput').value);
  quantity++;
  document.getElementById('quantityInput').value = quantity;
}

function getRecipeIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function addToCart(recipeID, qty, unitPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get the existing cart items or initialize an empty array

  // Create a new item object representing the recipe added to the cart
  let cartItem = {
      recipeID: parseInt(recipeID),
      qty: parseInt(qty),
      unitPrice: parseFloat(unitPrice)
  };

  // Add the item to the cart array
  cart.push(cartItem);

  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart)

}

document.getElementById('addToCartBtn').addEventListener('click', () => {
  const recipeId = getRecipeIdFromURL();
  const qty = parseInt(document.getElementById('quantityInput').value);
  const unitPrice = parseFloat(document.getElementById('totalPrice').textContent.replace('$', ''));
  addToCart(recipeId, qty, unitPrice);
});
