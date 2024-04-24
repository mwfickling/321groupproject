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
                <li><a class="dropdown-item" href="#" onclick="handleLogout()">Logout</a></li>            </ul>
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
    `;
    page.innerHTML = html;

    try {
        const userId = sessionStorage.getItem('loggedInUserId');
        const userData = await fetchUserData(userId);

        const orderHistoryData = await fetchOrderHistoryByUserId(userId);
        populateOrderHistory(orderHistoryData);
        setLoggedInUsername(userData.firstName, userData.lastName);
    } catch (error) {
        console.error('Error fetching order history:', error);
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
    const orderHistoryContent = document.getElementById('orderHistoryContent');
    orderHistoryContent.innerHTML = ''; // Clear previous content

    if (orderHistoryData.length === 0) {
        orderHistoryContent.innerHTML = '<h3>No orders found.</h3>';
        return;
    }

    const ul = document.createElement('ul');
    for (const order of orderHistoryData) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Order ID: ${order.orderID}, Date: ${formatDate(order.orderDate)}`;
        
        const orderDetails = await fetchOrderDetailsByOrderID(order.orderID);
        const detailsUl = document.createElement('ul');
        for (const detail of orderDetails) {
            const { recipeDetails, ingredients } = await fetchRecipeAndIngredientDetailsByRecipeID(detail.recipeID);

            const detailLi = document.createElement('li');
            detailLi.textContent = `Recipe Name: ${recipeDetails.recipeName}, Quantity: ${detail.qty}, Unit Price: ${detail.unitPrice}`;

            const ingredientsUl = document.createElement('ul');
            for (const ingredient of ingredients) {
                const ingredientLi = document.createElement('li');
                ingredientLi.textContent = `Ingredient: ${ingredient.ingredientName}, Description: ${ingredient.ingredientDescripiton}, Unit Price: ${ingredient.unitPrice}`;
                ingredientsUl.appendChild(ingredientLi);
            }
            detailLi.appendChild(ingredientsUl);

            detailsUl.appendChild(detailLi);
        }
        li.appendChild(detailsUl);

        ul.appendChild(li);
    }

    orderHistoryContent.appendChild(ul);
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