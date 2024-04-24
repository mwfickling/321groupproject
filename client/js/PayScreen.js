const customerUrl = "http://localhost:5010/api/customers";
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart items from local storage

        async function handleOnLoad() {

            // Combine items with the same recipeID and sum their quantities
            const combinedCart = {};
            cart.forEach(item => {
                if (combinedCart[item.recipeID]) {
                    combinedCart[item.recipeID].qty += item.qty;
                } else {
                    combinedCart[item.recipeID] = item;
                }
            });

            cart = Object.values(combinedCart);
            console.log(cart)

            if (cart.length === 0) {
                console.error('Cart is empty.');
                return;
            }

            let total = 0;
            let html = `
            <div class="container">
                <div class="py-5 text-center">
                    <img class="d-block mx-auto mb-4" src="../assets/img/oopsies.png" alt="" width="72" height="72">
                    <h2>Checkout form</h2>
                    <button class="btn btn-primary" onclick="autofillCheckoutFields()">Autofill Checkout Fields</button>
                </div>

                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Your cart</span>
                        </h4>
                        <ul class="list-group mb-3">`;

            for (const item of cart) {
                const recipe = await getRecipeById(item.recipeID);

                if (!recipe) {
                    console.error('Recipe not found for recipe ID:', item.recipeID);
                    continue;
                }

                html += `
                <li class="list-group-item">
                    <h5>${recipe.recipeName} <small class="text-muted">(x${item.qty})</small></h5>
                    <ul class="list-unstyled">`;

                const ingredients = await getIngredientsByRecipeId(item.recipeID);

                if (!ingredients || ingredients.length === 0) {
                    console.error('No ingredients found for recipe ID:', item.recipeID);
                    continue;
                }

                ingredients.forEach(ingredient => {
                    const totalPriceForIngredient = ingredient.unitPrice * item.qty;
                    total += totalPriceForIngredient;
                    html += `
                    <li>
                        <h7>${ingredient.ingredientName}</h6>
                        <small class="text-muted">${totalPriceForIngredient.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</small>
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
          <label for="state">State</label>
          <select class="custom-select d-block w-100" id="state" required>
            <option value="">Choose...</option>
            <option>Alabama</option>
            <option>Alaska</option>
            <option>Arizona</option>
            <option>Arkansas</option>
            <option>California</option>
            <option>Colorado</option>
            <option>Connecticut</option>
            <option>Delaware</option>
            <option>Florida</option>
            <option>Georgia</option>
            <option>Hawaii</option>
            <option>Idaho</option>
            <option>Illinois</option>
            <option>Indiana</option>
            <option>Iowa</option>
            <option>Kansas</option>
            <option>Kentucky</option>
            <option>Louisiana</option>
            <option>Maine</option>
            <option>Maryland</option>
            <option>Massachusetts</option>
            <option>Michigan</option>
            <option>Minnesota</option>
            <option>Mississippi</option>
            <option>Missouri</option>
            <option>Montana</option>
            <option>Nebraska</option>
            <option>Nevada</option>
            <option>New Hampshire</option>
            <option>New Jersey</option>
            <option>New Mexico</option>
            <option>New York</option>
            <option>North Carolina</option>
            <option>North Dakota</option>
            <option>Ohio</option>
            <option>Oklahoma</option>
            <option>Oregon</option>
            <option>Pennsylvania</option>
            <option>Rhode Island</option>
            <option>South Carolina</option>
            <option>South Dakota</option>
            <option>Tennessee</option>
            <option>Texas</option>
            <option>Utah</option>
            <option>Vermont</option>
            <option>Virginia</option>
            <option>Washington</option>
            <option>West Virginia</option>
            <option>Wisconsin</option>
            <option>Wyoming</option>            
            <!-- Add options for all 50 states here -->
          </select>
          <div class="invalid-feedback">
            Please provide a valid state.
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <label for="city">City</label>
          <input type="text" class="form-control" id="city" placeholder="" required>
          <div class="invalid-feedback">
            City is required.
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
      <div class="col-md-8 order-md-1">
      <h4 class="mb-3">Retailer Selection</h4>
      <form class="needs-validation" novalidate id="checkoutForm">
          <div class="mb-3">
          <label for="retailer">Where do you want to get your order from?</label>
          <select class="custom-select d-block w-100" id="retailer" onchange="updateButton(this.value)" required>
              <option value="">Choose...</option>
              <option value="Publix">Publix</option>
              <option value="Target">Target</option>
              <option value="Whole Foods">Whole Foods</option>
          </select>
              <div class="invalid-feedback">
                  Please select a retailer.
              </div>
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
        <button class="btn btn-primary btn-lg btn-block" type="button" id="sendOrderBtn" onclick="handleCheckout(cart)" disabled>Select Retailer</button>
        </form>
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
  </div>
</footer>`;

  const page = document.getElementById('PayPage');
  page.innerHTML = html;
}

async function autofillCheckoutFields() {
  const userId = sessionStorage.getItem('loggedInUserId'); // Assuming you store the logged-in user ID in sessionStorage

  const userInfo = await getUserInfo(userId);

  if (userInfo) {
    document.getElementById('firstName').value = userInfo.firstName;
    document.getElementById('lastName').value = userInfo.lastName;
    document.getElementById('email').value = userInfo.userEmail;
    document.getElementById('address').value = userInfo.address;
    document.getElementById('state').value = userInfo.region;
    document.getElementById('city').value = userInfo.city;
    document.getElementById('zip').value = userInfo.postalCode;
  }
}

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

function updateButton(selectedRetailer) {
  const sendOrderBtn = document.getElementById('sendOrderBtn');
  
  if (selectedRetailer !== '') {
      sendOrderBtn.disabled = false;
      sendOrderBtn.textContent = `Send to ${selectedRetailer}`;
  } else {
      sendOrderBtn.disabled = true;
      sendOrderBtn.textContent = 'Select Retailer';
  }
}

async function handleCheckout(updatedCart) {
  console.log("CART");
  console.log(updatedCart);
  try {
      const userId = sessionStorage.getItem('loggedInUserId');
      const orderDate = new Date().toISOString();

      const orderResponse = await fetch('http://localhost:5010/api/order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userID: userId,
              orderDate: orderDate,
              shippedDate: orderDate // Assuming shipped date is the same as order date
          })
      });

      if (!orderResponse.ok) {
          throw new Error('Failed to create order.');
      }

      //const orderData = await orderResponse.json();
      //const orderId = orderData.orderID;

      // Check if orderData is empty
      // if (!orderId) {
      //     throw new Error('Empty response received when creating order.');
      // }

      // Prepare order details
      const orderDetails = [];
      const highestOrderResponse = await fetch('http://localhost:5010/api/Order/highestOrderID');
      const highestOrderID = await highestOrderResponse.json();
      for (const item of updatedCart) {
          const recipe = await getRecipeById(item.recipeID);

          if (!recipe) {
              console.error('Recipe not found for recipe ID:', item.recipeID);
              continue;
          }

          const ingredients = await getIngredientsByRecipeId(item.recipeID);

          if (!ingredients || ingredients.length === 0) {
              console.error('No ingredients found for recipe ID:', item.recipeID);
              continue;
          }

          // Calculate total unit price for the recipe based on ingredient prices
          const totalUnitPrice = ingredients.reduce((total, ingredient) => total + (ingredient.unitPrice), 0);

          const orderItem = {
              orderID: highestOrderID,
              recipeID: item.recipeID,
              qty: item.qty,
              unitPrice: totalUnitPrice
          };

          const saveOrderDetailsResponse = await fetch(`http://localhost:5010/api/orderdetail`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderItem)
      });
      }

      // Save order details
      console.log(orderDetails)
      // const saveOrderDetailsResponse = await fetch(`http://localhost:5010/api/orderdetail`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(orderDetails)
      // });

      // if (!saveOrderDetailsResponse.ok) {
      //     throw new Error('Failed to save order details.');
      // }

      alert('Your order has been successfully placed!');
      localStorage.removeItem('cart'); // Clear the cart from localStorage
  } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to complete checkout. Please try again later.');
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


