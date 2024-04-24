async function handleOnLoad() {
    const page = document.getElementById('SettingsPage');
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
            <div id="settingsContent" class="container">
                <div class="account-info-section">
                    <h2>Account Information</h2>
                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td><input type="text" id="firstName" class="form-control" placeholder="First Name"></td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td><input type="text" id="lastName" class="form-control" placeholder="Last Name"></td>
                            </tr>
                            <tr>
                                <th>Email Address</th>
                                <td><input type="email" id="userEmail" class="form-control" placeholder="Your email"></td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td><input type="password" id="userPassword" class="form-control" placeholder="New password"></td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td><input type="text" id="address" class="form-control" placeholder="Address"></td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td><input type="text" id="city" class="form-control" placeholder="City"></td>
                            </tr>
                            <tr>
                                <th>Region</th>
                                <td><input type="text" id="region" class="form-control" placeholder="Region"></td>
                            </tr>
                            <tr>
                                <th>Postal Code</th>
                                <td><input type="text" id="postalCode" class="form-control" placeholder="Postal Code"></td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td><input type="text" id="country" class="form-control" placeholder="Country"></td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td><input type="tel" id="phone" class="form-control" placeholder="Phone"></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-primary" onclick="saveUserInfo()">Save</button>
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
        populateUserInfo(userData);
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

function populateUserInfo(userData) {
    console.log(JSON.stringify(userData))
    document.getElementById('firstName').value = userData.firstName;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('userEmail').value = userData.userEmail;
    document.getElementById('userPassword').value = userData.userPassword;
    document.getElementById('address').value = userData.address;
    document.getElementById('city').value = userData.city;
    document.getElementById('region').value = userData.region;
    document.getElementById('postalCode').value = userData.postalCode;
    document.getElementById('country').value = userData.country;
    document.getElementById('phone').value = userData.phone;
}

async function saveUserInfo() {
    const userId = sessionStorage.getItem('loggedInUserId');
    const userData = await fetchUserData(userId); // Fetch existing user data
    const updatedUserInfo = {
        userId: userId,
        lastName: document.getElementById('lastName').value,
        firstName: document.getElementById('firstName').value,
        userEmail: document.getElementById('userEmail').value,
        userPassword: document.getElementById('userPassword').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        region: document.getElementById('region').value,
        postalCode: document.getElementById('postalCode').value,
        country: document.getElementById('country').value,
        phone: document.getElementById('phone').value,
        deleteUser: false,
        isAdmin: userData.isAdmin // Preserve the admin status from existing data
    };

    try {
        const response = await fetch(`http://localhost:5010/api/customers/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserInfo)
        });
        if (!response.ok) {
            throw new Error('Failed to update user information');
        }
        alert('User information updated successfully!');
    } catch (error) {
        console.error('Error updating user information:', error);
        alert('Failed to update user information. Please try again later.');
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