function handleOnLoad(){
    const page = document.getElementById('AnalyticsPage')
    let html = ` <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">

    <a class="navbar-brand ps-3" href="index.html">Shop By Recipe</a>
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
        </div>
    </form>
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="settings.html">Settings</a></li>
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
                    <a class="nav-link" href="index.html">
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
                    <a class="nav-link" href="AccountInfo.html">
                        <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                        Account Information
                    </a>
                    <a class="nav-link" href="CustomerList.html">
                    <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                    Customer List
                </a>
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">
        <main>
            <div class="container-fluid px-4">
                <h1 class="mt-4">Analytics</h1>
                <ol class="breadcrumb mb-4">
                    <li class="breadcrumb-item active">Admin Analytics</li>
                </ol>
                <div class="row">
                    <div class="col-xl-3 col-md-6">
                    <div class="card bg-warning text-white mb-4">
                    <div class="card-body">Total Customers: 213</div>
                    <div  d-flex align-items-center justify-content-between">   
                            </div>
                        </div>
                    </div>
                <div class="row">
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-area me-1"></i>
                                Weekly Orders
                            </div>
                            <div class="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-bar me-1"></i>
                                New Customers
                            </div>
                            <div class="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                        </div>
                    </div>
                </div>                       
            </div>
        </main>
   
    </div>
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
</div>`
    page.innerHTML = html;
    initializeCharts();
}
function initializeCharts() {
    

    //Bootstrap charts and font
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    //Initialize Area Chart
    var ctxArea = document.getElementById("myAreaChart").getContext('2d');
    var myAreaChart = new Chart(ctxArea, {
        type: 'line',
        data: {
            labels: ["Apr 1", "Apr 2", "Apr 3", "Apr 4", "Apr 5", "Apr 6", "Apr 7", "Apr 8", "Apr 9", "Apr 10", "Apr 11", "Apr 12", "Apr 13"],
            datasets: [{
                label: "Daily Orders",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [50, 55, 57, 34, 58, 59, 68, 56, 78, 79, 84, 75, 79],
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: { unit: 'date' },
                    gridLines: { display: false },
                    ticks: { maxTicksLimit: 7 }
                }],
                yAxes: [{
                    ticks: { min: 0, max: 100, maxTicksLimit: 5 },
                    gridLines: { color: "rgba(0, 0, 0, .125)" }
                }]
            },
            legend: { display: false }
        }
    });

    //Initialize Bar Chart
    var ctxBar = document.getElementById("myBarChart").getContext('2d');
    var myBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ["November", "December", "January", "February", "March", "April"],
            datasets: [{
                label: "New Customers",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: [10, 23, 56, 45, 69, 78],
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: { unit: 'month' },
                    gridLines: { display: false },
                    ticks: { maxTicksLimit: 6 }
                }],
                yAxes: [{
                    ticks: { min: 0, max: 100, maxTicksLimit: 5 },
                    gridLines: { display: true }
                }]
            },
            legend: { display: false }
        }
    });
}