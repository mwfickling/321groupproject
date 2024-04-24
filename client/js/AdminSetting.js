const customerUrl = "http://localhost:5010/api/customers";


async function handleOnLoad(){
    const page = document.getElementById('AdminSettingsPage')
    let html = `<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        
    <a class="navbar-brand ps-3" href="Analytics.html">Shop By Recipe</a>
  
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">

    </form>
   
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li>
              <a class="dropdown-item" id="loginSignUpItem" href="settings.html">Login / Sign-up</a>
            </li>                 <li><a class="dropdown-item" href="adminsettings.html">Admin Settings</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#!">Logout</a></li>
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
                <h1 class="mt-4">Admin Account Information</h1>

                <h2>Account Information</h2>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td><input type="text" id="userName" class="form-control" placeholder="Your name"></td>
                        </tr>
                        <tr>
                            <th>Email Address</th>
                            <td><input type="email" id="userEmail" class="form-control" placeholder="Your email"></td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td><input type="password" id="userPassword" class="form-control" placeholder="New password"></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-primary">Save</button>
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
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    const userData = await fetchUserData(loggedInUserId);
    setLoggedInUsername(userData.firstName, userData.lastName);

if (loggedInUserId) {
  const user = await getUserInfo(loggedInUserId);
  if (user) {
    const fullName = `${user.firstName} ${user.lastName}`;
    updateLoginSignUpLink(fullName);
  }
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
function updateLoginSignUpLink(userName) {
    const loginSignUpItem = document.getElementById('loginSignUpItem');
    if (loginSignUpItem) {
      loginSignUpItem.innerHTML = `<a class="dropdown-item" href="settings.html">${userName}</a>`;
    }
  }

  function setLoggedInUsername(firstName, lastName) {
    const loggedInUsernameElement = document.getElementById('loggedInUsername');
    loggedInUsernameElement.textContent = `${firstName} ${lastName}`;
}
async function fetchUserData(userId) {
    const response = await fetch(`http://localhost:5010/api/customers/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return await response.json();
}