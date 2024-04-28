const customerUrl = "http://localhost:5010/api/customers";

async function getUserInfo(userId) {
  try {
    const response = await fetch(`${customerUrl}/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null; //only touched if error found
  }
}

async function handleOnLoad() {
    const page = document.getElementById('CustomerListPage');
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
                    <a class="nav-link" href="analytics.html">
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
                                <nav class="sb-sidenav-menu-nested nav">
                                </nav>
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
                        <h1 class="mt-4">Customer List</h1>

                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="customerData"></tbody>
                            </table>
                        </div>
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; CrimsonTech 2024</div>
                        <div>
                            <a href="#">About Us</a>
                            &middot;
                            <a href="#">Terms & Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </div>`;

    page.innerHTML = html;
    loadAllCustomers();
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

document.addEventListener('DOMContentLoaded', handleOnLoad);




async function toggleAdmin(userId) {
    const userInfo = await getUserInfo(userId);
    if (!userInfo) {
        console.error('User not found');
        return;
    }
    userInfo.isAdmin = !userInfo.isAdmin;
    try {
        const response = await fetch(`${customerUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
        if (!response.ok) {
            throw new Error(`Failed to toggle admin status: ${response.status} ${response.statusText}`);
        }
        // Reload customer data after toggling admin status
        handleOnLoad();
    } catch (error) {
        console.error('Error toggling admin status:', error);
        alert('Failed to toggle admin status. Please try again later.');
    }
}

async function toggleDelete(userId) {
    const userInfo = await getUserInfo(userId);
    if (!userInfo) {
        console.error('User not found');
        return;
    }
    userInfo.deleteUser = !userInfo.deleteUser;
    try {
        const response = await fetch(`${customerUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
        if (!response.ok) {
            throw new Error(`Failed to toggle delete status: ${response.status} ${response.statusText}`);
        }
        // Reload customer data after toggling delete status
        handleOnLoad();
    } catch (error) {
        console.error('Error toggling delete status:', error);
        alert('Failed to toggle delete status. Please try again later.');
    }
}

async function loadAllCustomers() {
    try {
        const response = await fetch(customerUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch customers');
        }
        const customers = await response.json();
        console.log(customers)
        // Sort customers array based on userID
        customers.sort((a, b) => a.userID - b.userID);

        let customerElements = '';

        // Iterate over sorted customers array
        for (const customer of customers) {
            customerElements += `
                <tr>
                    <td>${customer.userID}</td>
                    <td>${customer.firstName} ${customer.lastName}</td>
                    <td>${customer.userEmail}</td>
                    <td>${customer.address}, ${customer.city}, ${customer.region}, ${customer.postalCode}</td>
                    <td>${customer.phone}</td>
                    <td>
                    <button class="admin-button" onclick="toggleAdmin(${customer.userID})"><i class="fas fa-user-shield"></i> ${customer.isAdmin ? 'Remove Admin' : 'Make Admin'}</button>
                    <button class="delete-button" onclick="toggleDelete(${customer.userID})"><i class="fas fa-trash-alt"></i> ${customer.deleteUser ? 'Restore User' : 'Delete User'}</button>
                    <button class="reset-button" onclick="openResetPasswordDialog(${customer.userID})"><i class="fas fa-key"></i> Reset Password</button>
                </td>
                </tr>
            `;
        };

        document.getElementById('customerData').innerHTML = customerElements;
    } catch (error) {
        console.error('Error loading customers:', error);
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

function openResetPasswordDialog(userId) {
    const newPassword = prompt('Enter the new password:');
    if (newPassword !== null) {
        // User clicked OK in the prompt, handle the new password
        handleResetPassword(userId, newPassword);
    }
}

async function handleResetPassword(userId, newPassword) {
    const userInfo = await getUserInfo(userId);
    if (!userInfo) {
        console.error('User not found');
        return;
    }
    userInfo.userPassword = newPassword;
    try {
        const response = await fetch(`${customerUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
        // Reload customer data after toggling delete status
        handleOnLoad();
    } catch (error) {
        alert('Could not change password. Please try again later.');
    }
}
