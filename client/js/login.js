const customerUrl = "http://localhost:5010/api/customers";

function handleOnLoad() {
        const loggedInUserId = sessionStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            window.location.href = 'settings.html';
            return; 
        }
    const page = document.getElementById('loginPage');
    let html = `<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                            <div class="card-body">
                                <form id="loginForm">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputPassword" type="password" placeholder="Password" />
                                        <label for="inputPassword">Password</label>
                                    </div>

                                    <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <button type="submit" class="btn btn-primary">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer text-center py-3">
                                <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <div id="layoutAuthentication_footer">
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
        </footer>
    </div>
</div>`;

    page.innerHTML = html;

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
}

async function handleLogin(event) {
    event.preventDefault(); 

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    const isAuthenticated = await authenticateUser(email, password);

    if (isAuthenticated) {
        const redirectUrl = sessionStorage.getItem('redirectUrl') || 'recipes.html';
        window.location.href = redirectUrl;
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

async function authenticateUser(email, password) {
    try {
        const response = await fetch(`${customerUrl}/getCustomerByEmail?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch customer: ${response.status} ${response.statusText}`);
        }

        const customer = await response.json();

        if (customer && customer.userPassword === password) {
            sessionStorage.setItem('loggedInUserId', customer.userID);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return false; 
    }
}

