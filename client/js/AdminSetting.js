function handleOnLoad(){
    const page = document.getElementById('AdminSettingsPage')
    let html = `<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        
    <a class="navbar-brand ps-3" href="Analytics.html">Shop By Recipe</a>

    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
  
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
            
        </div>
    </form>
   
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#!">Settings</a></li>
                <li><a class="dropdown-item" href="#!">Activity Log</a></li>
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
                    <a class="nav-link" href="settings.html">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                        Account Information
                    </a>
                   
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                **USERNAME**
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">

        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Admin Account Information</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item"><a href="index.html">Amdin Dashboard</a></li>
                    <li class="breadcrumb-item active">Account Information</li>
                </ol>
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
}