async function handleOnLoad() {
    const page = document.getElementById('OrderHistoryPage');
    let html = `
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand ps-3" href="recipes.html">Shop By Recipe</a>
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div class="input-group">
            </div>
        </form>
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="settings.html">Account Settings</a></li>
                    <li><a class="dropdown-item" href="OrderHistory.html">Order History</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#" onclick="handleLogout()">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav sb-sidenav-dark" id="sidenav">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Settings</div>
                        <a class="nav-link" href="settings.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Account Information
                        </a>
                        <a class="nav-link" href="./OrderHistory.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Order History
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
                <div class="container px-4 py-4">
                    <h1 id="greeting">Hello, <span id="userName">Loading...</span></h1>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="card">
                                <div class="card-header">
                                    Number of Orders
                                </div>
                                <div class="card-body" id="numOrdersContent">
                                    <h3>Loading...</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="card" style="background-image: url('path_to_image.jpg'); background-size: cover;">
                                <div class="card-header">
                                    Most Popular Recipe
                                </div>
                                <div class="card-body" id="mostPopularRecipeContent">
                                    <h3>Loading...</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Order History
                        </div>
                        <div class="card-body" id="orderHistoryContent">
                            <h3>Loading...</h3>
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
    </div>
    `;
    page.innerHTML = html;

    try {
        const userId = sessionStorage.getItem('loggedInUserId');
        const userData = await fetchUserData(userId);

        let orderHistoryData = await fetchOrderHistoryByUserId(userId);
        
        // Sort the order history by orderDate in descending order
        orderHistoryData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

        const numOrders = await fetchNumOrdersByUserId(userId); // Fetch number of orders
        
        // Log the number of orders
        console.log('Number of orders:', numOrders);
        document.getElementById('numOrdersContent').innerHTML = `<h3>${numOrders}</h3>`;

        const mostPopularRecipeData = await fetchMostPopularRecipe(userId); // Fetch most popular recipe
        const { recipe, count } = mostPopularRecipeData; // Destructure the returned object

        // Log the most popular recipe
        console.log('Most popular recipe:', recipe);
        console.log('Number of times ordered:', count);
        document.getElementById('mostPopularRecipeContent').innerHTML = `<p>Recipe: ${recipe.recipeName}</p><p>Times Ordered: ${count}</p>`;

        populateOrderHistory(orderHistoryData);
        setLoggedInUsername(userData.firstName, userData.lastName);
        document.getElementById('userName').textContent = `${userData.firstName}`;
    } catch (error) {
        console.error('Error fetching order history:', error);
    }
}


async function fetchMostPopularRecipe(userId) {
    try {
        const response = await fetch(`http://localhost:5010/api/order/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch order history');
        }
        const orderHistory = await response.json();

        // Create a map to count the occurrences of each recipe
        const recipeCountMap = new Map();
        for (const order of orderHistory) {
            const orderDetails = await fetchOrderDetailsByOrderID(order.orderID);
            for (const detail of orderDetails) {
                const recipeId = detail.recipeID;
                if (recipeCountMap.has(recipeId)) {
                    recipeCountMap.set(recipeId, recipeCountMap.get(recipeId) + detail.qty);
                } else {
                    recipeCountMap.set(recipeId, detail.qty);
                }
            }
        }

        // Find the recipe with the highest count
        let maxCount = 0;
        let mostPopularRecipeId = null;
        for (const [recipeId, count] of recipeCountMap.entries()) {
            if (count > maxCount) {
                maxCount = count;
                mostPopularRecipeId = recipeId;
            }
        }

        // Fetch recipe details for the most popular recipe
        const responseRecipe = await fetch(`http://localhost:5010/api/recipes/${mostPopularRecipeId}`);
        if (!responseRecipe.ok) {
            throw new Error('Failed to fetch recipe details');
        }
        const mostPopularRecipe = await responseRecipe.json();

        return {
            recipe: mostPopularRecipe,
            count: maxCount
        };
    } catch (error) {
        console.error('Error fetching most popular recipe:', error);
        throw error;
    }
}


async function fetchUserData(userId) {
    const response = await fetch(`http://localhost:5010/api/customers/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return await response.json();
}

async function fetchOrderHistoryByUserId(userId) {
    const response = await fetch(`http://localhost:5010/api/order/user/${userId}`);
    return await response.json();
}

async function fetchNumOrdersByUserId(userId) {
    const response = await fetch(`http://localhost:5010/api/order/user/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch order history');
    }
    const orderHistory = await response.json();
    const numOrders = orderHistory.length; // Calculate the number of orders
    return numOrders; // Return the number of orders
}

async function fetchOrderDetailsByOrderID(orderId) {
    const response = await fetch(`http://localhost:5010/api/orderdetail/${orderId}`);
    return await response.json();
}

async function fetchRecipeAndIngredientDetailsByRecipeID(recipeId) {
    try {
        const [recipeResponse, ingredientsResponse] = await Promise.all([
            fetch(`http://localhost:5010/api/recipes/${recipeId}`),
            fetch(`http://localhost:5010/api/ingredients/${recipeId}`)
        ]);

        if (!recipeResponse.ok || !ingredientsResponse.ok) {
            throw new Error('Failed to fetch recipe or ingredients');
        }

        const recipeDetails = await recipeResponse.json();
        const ingredients = await ingredientsResponse.json();

        return { recipeDetails, ingredients };
    } catch (error) {
        console.error('Error fetching recipe and ingredient details:', error);
        throw error;
    }
}
async function populateOrderHistory(orderHistoryData) {
    // Sort orderHistoryData by orderDate in descending order
    orderHistoryData.sort((a, b) => b.orderDate - a.orderDate);

    const orderHistoryContent = document.getElementById('orderHistoryContent');
    orderHistoryContent.innerHTML = ''; // Clear previous content

    if (orderHistoryData.length === 0) {
        orderHistoryContent.innerHTML = '<h3>No orders found.</h3>';
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('order-list');

    for (const order of orderHistoryData) {
        const li = document.createElement('li');
        li.classList.add('order-item');
        li.innerHTML = `<strong onclick="toggleOrderDetails(this)">${formatDate(order.orderDate)}</strong>`;
        
        const orderDetails = await fetchOrderDetailsByOrderID(order.orderID);
        const totalCost = calculateOrderTotal(orderDetails); // Calculate total cost for the order
        
        const detailsUl = document.createElement('ul');
        detailsUl.classList.add('order-details');
        detailsUl.style.display = 'none'; // Hide details by default

        for (const detail of orderDetails) {
            const { recipeDetails, ingredients } = await fetchRecipeAndIngredientDetailsByRecipeID(detail.recipeID);

            const detailLi = document.createElement('li');
            detailLi.classList.add('detail-item');
            const recipeHeader = document.createElement('recipe');
            const recipeCost = detail.qty * detail.unitPrice;
            recipeHeader.textContent = `(${detail.qty}) ${recipeDetails.recipeName}: $${recipeCost}`;
            recipeHeader.addEventListener('click', () => toggleIngredientList(recipeHeader));
            detailLi.appendChild(recipeHeader);

            const ingredientsUl = document.createElement('ul');
            ingredientsUl.classList.add('ingredient-list');
            ingredientsUl.style.display = 'none'; // Hide ingredients by default
            for (const ingredient of ingredients) {
                const ingredientLi = document.createElement('li');
                ingredientLi.classList.add('ingredient-item');
                ingredientLi.textContent = `Ingredient: ${ingredient.ingredientName}, Description: ${ingredient.ingredientDescripiton}, Unit Price: ${ingredient.unitPrice}`;
                ingredientsUl.appendChild(ingredientLi);
            }
            detailLi.appendChild(ingredientsUl);

            detailsUl.appendChild(detailLi);
        }

        li.appendChild(detailsUl);

        // Display total cost for the order
        const totalCostElement = document.createElement('p');
        totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        li.appendChild(totalCostElement);

        ul.appendChild(li);
    }

    orderHistoryContent.appendChild(ul);
}

function calculateOrderTotal(orderDetails) {
    let totalCost = 0;
    for (const detail of orderDetails) {
        totalCost += detail.qty * detail.unitPrice;
    }
    return totalCost;
}

function toggleOrderDetails(element) {
    const details = element.nextElementSibling;
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
}
function toggleIngredientList(element) {
    const ingredients = element.nextElementSibling;
    ingredients.style.display = ingredients.style.display === 'none' ? 'block' : 'none';
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2); // Assuming amount is in dollars
}



function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setLoggedInUsername(firstName, lastName) {
    const loggedInUsernameElement = document.getElementById('loggedInUsername');
    loggedInUsernameElement.textContent = `${firstName} ${lastName}`;
}

async function handleLogout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}