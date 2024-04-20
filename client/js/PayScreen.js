async function handleOnLoad() {
  const orderId = 1; // Replace with the actual order ID
  const orderDetails = await getOrderDetails(orderId);

  if (!orderDetails || orderDetails.length === 0) {
    console.error('No order details found for order ID:', orderId);
    return;
  }

  let total = 0;
  let html = `
  <div class="container">
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="../assets/img/oopsies.png" alt="" width="72" height="72">
      <h2>Checkout form</h2>
    </div>

    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
        </h4>
        <ul class="list-group mb-3">`;

  // Loop through each order detail and fetch recipe details
  for (const orderDetail of orderDetails) {
    const recipeId = orderDetail.recipeID;
    const multiplier = orderDetail.qty;
    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      console.error('Recipe not found for recipe ID:', recipeId);
      continue;
    }

    html += `
      <li class="list-group-item">
      <h5>${recipe.recipeName} <small class="text-muted">(x${multiplier})</small></h5>
      <ul class="list-unstyled">`;

    // Fetch ingredients for the recipe
    const ingredients = await getIngredientsByRecipeId(recipeId);

    if (!ingredients || ingredients.length === 0) {
      console.error('No ingredients found for recipe ID:', recipeId);
      continue;
    }

    ingredients.forEach(ingredient => {
      total += ingredient.unitPrice*multiplier;
      html += `
        <li>
          <h7>${ingredient.ingredientName}</h6>
          <small class="text-muted">${((ingredient.unitPrice)*multiplier).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</small>
        </li>`;
    });

    html += `
        </ul>
      </li>`;
  }

  html += `
    </ul>
    <div>Total: $${total.toFixed(2)}</div>
  </div>

        <div class="col-md-8 order-md-1">
      <div class="col-md-8 order-md-1">
      <h4 class="mb-3">Billing address</h4>
      <form class="needs-validation" novalidate id="checkoutForm">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">First name</label>
            <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Last name</label>
            <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="username">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input type="text" class="form-control" id="username" placeholder="Username" required>
            <div class="invalid-feedback" style="width: 100%;">
              Your username is required.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="email">Email <span class="text-muted">(Optional)</span></label>
          <input type="email" class="form-control" id="email" placeholder="you@example.com">
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div class="mb-3">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
          <div class="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div class="mb-3">
          <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
          <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
        </div>

        <div class="row">
          <div class="col-md-5 mb-3">
            <label for="country">Country</label>
            <select class="custom-select d-block w-100" id="country" required>
              <option value="">Choose...</option>
              <option>United States</option>
            </select>
            <div class="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="state">State</label>
            <select class="custom-select d-block w-100" id="state" required>
              <option value="">Choose...</option>
              <option>Alabama</option>
            </select>
            <div class="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="zip">Zip</label>
            <input type="text" class="form-control" id="zip" placeholder="" required>
            <div class="invalid-feedback">
              Zip code required.
            </div>
          </div>
        </div>
        <hr class="mb-4">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="same-address">
          <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
        </div>

        <hr class="mb-4">
        <h4 class="mb-3">Payment</h4>
        <div class="d-block my-3">
          <div class="custom-control custom-radio">
            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
            <label class="custom-control-label" for="credit">Credit card</label>
          </div>
          <div class="custom-control custom-radio">
            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
            <label class="custom-control-label" for="debit">Debit card</label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cc-name">Name on card</label>
            <input type="text" class="form-control" id="cc-name" placeholder="" required>
            <small class="text-muted">Full name as displayed on card</small>
            <div class="invalid-feedback">
              Name on card is required
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-number">Credit card number</label>
            <input type="text" class="form-control" id="cc-number" placeholder="" required>
            <div class="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <label for="cc-expiration">Expiration</label>
            <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
            <div class="invalid-feedback">
              Expiration date required
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="cc-cvv">CVV</label>
            <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
            <div class="invalid-feedback">
              Security code required
            </div>
          </div>
        </div>
        <hr class="mb-4">
        <button class="btn btn-primary btn-lg btn-block" type="submit">Send to Publix</button>
      </form>
    </div>
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

  const page = document.getElementById('PayPage');
  page.innerHTML = html;
}

// Function to fetch order details by order ID
async function getOrderDetails(orderId) {
  try {
    const response = await fetch(`http://localhost:5010/api/orderdetail/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order details.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching order details:', error.message);
    return null;
  }
}

// Function to fetch recipe details by recipe ID
async function getRecipeById(recipeId) {
  try {
    const response = await fetch(`http://localhost:5010/api/recipes/${recipeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe details.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    return null;
  }
}

// Function to fetch ingredients by recipe ID
async function getIngredientsByRecipeId(recipeId) {
  try {
    const response = await fetch(`http://localhost:5010/api/ingredients/${recipeId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch ingredients.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ingredients:', error.message);
    return null;
  }
}

handleOnLoad();








// function handleOnLoad(){
//   const selectedRecipeId = localStorage.getItem('selectedRecipeId'); //Assuming the recipe ID is stored
//   const storedRecipes = localStorage.getItem('recipes');
//   const recipes = JSON.parse(storedRecipes) || [];
//   const selectedRecipe = recipes.find(r => r.RecipeID === selectedRecipeId);

//   const page = document.getElementById('PayPage');
//   if (!selectedRecipe) {
//     console.error('No selected recipe found');
//     return;
//   }
  
//   let total = 0;

//   let html = `
//   <div class="container">
//     <div class="py-5 text-center">
//       <img class="d-block mx-auto mb-4" src="../assets/img/oopsies.png" alt="" width="72" height="72">
//       <h2>Checkout form</h2>
//     </div>

//     <div class="row">
//       <div class="col-md-4 order-md-2 mb-4">
//         <h4 class="d-flex justify-content-between align-items-center mb-3">
//           <span class="text-muted">Your cart</span>
//         </h4>
//         <ul class="list-group mb-3">`;

//   if (selectedRecipe && selectedRecipe.ingredients) {
//     selectedRecipe.ingredients.forEach(ingredient => {
//       const price = parseFloat(ingredient.unitPrice.replace('$', '')) || 0;
//       total += price; //Sum up the total cost of ingredients
//       html += `<li class="list-group-item d-flex justify-content-between lh-condensed">
//                 <div>
//                   <h6 class="my-0">${ingredient.name}</h6>
//                   <small class="text-muted">${ingredient.measure} ${ingredient.unitPrice}</small>
//                 </div>
//               </li>`;
//     });
//   }

//   html += `
//           <li class="list-group-item d-flex justify-content-between">
//             <span>Total (USD)</span>
//             <strong>$${total.toFixed(2)}</strong> <!-- Total calculated dynamically -->
//           </li>
//         </ul>
//       </div>
//       <div class="col-md-8 order-md-1">
//       <div class="col-md-8 order-md-1">
//       <h4 class="mb-3">Billing address</h4>
//       <form class="needs-validation" novalidate id="checkoutForm">
//         <div class="row">
//           <div class="col-md-6 mb-3">
//             <label for="firstName">First name</label>
//             <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
//             <div class="invalid-feedback">
//               Valid first name is required.
//             </div>
//           </div>
//           <div class="col-md-6 mb-3">
//             <label for="lastName">Last name</label>
//             <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
//             <div class="invalid-feedback">
//               Valid last name is required.
//             </div>
//           </div>
//         </div>

//         <div class="mb-3">
//           <label for="username">Username</label>
//           <div class="input-group">
//             <div class="input-group-prepend">
//               <span class="input-group-text">@</span>
//             </div>
//             <input type="text" class="form-control" id="username" placeholder="Username" required>
//             <div class="invalid-feedback" style="width: 100%;">
//               Your username is required.
//             </div>
//           </div>
//         </div>

//         <div class="mb-3">
//           <label for="email">Email <span class="text-muted">(Optional)</span></label>
//           <input type="email" class="form-control" id="email" placeholder="you@example.com">
//           <div class="invalid-feedback">
//             Please enter a valid email address for shipping updates.
//           </div>
//         </div>

//         <div class="mb-3">
//           <label for="address">Address</label>
//           <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
//           <div class="invalid-feedback">
//             Please enter your shipping address.
//           </div>
//         </div>

//         <div class="mb-3">
//           <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
//           <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
//         </div>

//         <div class="row">
//           <div class="col-md-5 mb-3">
//             <label for="country">Country</label>
//             <select class="custom-select d-block w-100" id="country" required>
//               <option value="">Choose...</option>
//               <option>United States</option>
//             </select>
//             <div class="invalid-feedback">
//               Please select a valid country.
//             </div>
//           </div>
//           <div class="col-md-4 mb-3">
//             <label for="state">State</label>
//             <select class="custom-select d-block w-100" id="state" required>
//               <option value="">Choose...</option>
//               <option>Alabama</option>
//             </select>
//             <div class="invalid-feedback">
//               Please provide a valid state.
//             </div>
//           </div>
//           <div class="col-md-3 mb-3">
//             <label for="zip">Zip</label>
//             <input type="text" class="form-control" id="zip" placeholder="" required>
//             <div class="invalid-feedback">
//               Zip code required.
//             </div>
//           </div>
//         </div>
//         <hr class="mb-4">
//         <div class="custom-control custom-checkbox">
//           <input type="checkbox" class="custom-control-input" id="same-address">
//           <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
//         </div>

//         <hr class="mb-4">
//         <h4 class="mb-3">Payment</h4>
//         <div class="d-block my-3">
//           <div class="custom-control custom-radio">
//             <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
//             <label class="custom-control-label" for="credit">Credit card</label>
//           </div>
//           <div class="custom-control custom-radio">
//             <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
//             <label class="custom-control-label" for="debit">Debit card</label>
//           </div>
//         </div>
//         <div class="row">
//           <div class="col-md-6 mb-3">
//             <label for="cc-name">Name on card</label>
//             <input type="text" class="form-control" id="cc-name" placeholder="" required>
//             <small class="text-muted">Full name as displayed on card</small>
//             <div class="invalid-feedback">
//               Name on card is required
//             </div>
//           </div>
//           <div class="col-md-6 mb-3">
//             <label for="cc-number">Credit card number</label>
//             <input type="text" class="form-control" id="cc-number" placeholder="" required>
//             <div class="invalid-feedback">
//               Credit card number is required
//             </div>
//           </div>
//         </div>
//         <div class="row">
//           <div class="col-md-3 mb-3">
//             <label for="cc-expiration">Expiration</label>
//             <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
//             <div class="invalid-feedback">
//               Expiration date required
//             </div>
//           </div>
//           <div class="col-md-3 mb-3">
//             <label for="cc-cvv">CVV</label>
//             <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
//             <div class="invalid-feedback">
//               Security code required
//             </div>
//           </div>
//         </div>
//         <hr class="mb-4">
//         <button class="btn btn-primary btn-lg btn-block" type="submit">Send to Publix</button>
//       </form>
//     </div>
//   </div>
// </div>

// <footer class="py-4 bg-light mt-auto">
//   <div class="container-fluid text-center">
//     <div class="d-flex justify-content-between small">
//       <div class="text-muted">Copyright &copy; CrimsonTech 2023</div>
//       <div>
//         <a href="#">About Us</a>
//         &middot;
//         <a href="#">Terms &amp; Conditions</a>
//       </div>
//     </div>
//   </div>
// </footer>`;

//   page.innerHTML = html;
// }

// window.onload = handleOnLoad();

// function saveToLocalStorage() {
//   //All Billing address details, God Speed Luke
//   const billingDetails = {
//     firstName: document.getElementById('firstName').value,
//     lastName: document.getElementById('lastName').value,
//     username: document.getElementById('username').value,
//     email: document.getElementById('email').value,
//     address: document.getElementById('address').value,
//     address2: document.getElementById('address2').value,
//     country: document.getElementById('country').value,
//     state: document.getElementById('state').value,
//     zip: document.getElementById('zip').value
//   };

//   //All Payment details
//   const paymentDetails = {
//     cardName: document.getElementById('cc-name').value,
//     cardNumber: document.getElementById('cc-number').value,
//     expiration: document.getElementById('cc-expiration').value,
//     cvv: document.getElementById('cc-cvv').value,
//     paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').id
//   };
  
//   localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
//   localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
//   localStorage.setItem('ingredientDetails', JSON.stringify(ingredientDetails));
// }

// document.getElementById('checkoutForm').addEventListener('submit', function(event) {
//   //Forms naturally want to be submitted, event.preventDefault
//   //This stops the form from being submitted to the server which would cause the page to reload or navigate away
//   event.preventDefault();
//   saveToLocalStorage();
//   console.log(billingDetails)
//   console.log(paymentDetails)
//   console.log(ingredientDetails)
//   alert('Order completed!');
  
// });


