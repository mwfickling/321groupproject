function handleOnLoad() {
    const page = document.getElementById('RegisterPage');
    let html = `<div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
        <main>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-7">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
                            <div class="card-body">
                                <form id="createAccountForm">
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                                <label for="inputFirstName">First name</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                                <label for="inputLastName">Last name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputPassword" type="password" placeholder="Create a password" />
                                                <label for="inputPassword">Password</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                <label for="inputPasswordConfirm">Confirm Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Additional fields -->
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputAddress" type="text" placeholder="Enter your address" />
                                        <label for="inputAddress">Address</label>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputCity" type="text" placeholder="Enter your city" />
                                                <label for="inputCity">City</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputRegion" type="text" placeholder="Enter your region" />
                                                <label for="inputRegion">Region</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputPostalCode" type="text" placeholder="Enter your postal code" />
                                                <label for="inputPostalCode">Postal Code</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating mb-3 mb-md-0">
                                                <input class="form-control" id="inputCountry" type="text" placeholder="Enter your country" />
                                                <label for="inputCountry">Country</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number (10 digits)" />
                                        <label for="inputPhone">Phone</label>
                                    </div>
                                    <div class="mt-4 mb-0">
                                        <div class="d-grid"><button class="btn btn-primary btn-block">Create Account</button></div>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer text-center py-3">
                                <div class="small"><a href="login.html">Have an account? Go to login</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
   
        <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid text-center">
              <div class="d-flex justify-content-between small">
                <div class="text-muted">Copyright &copy; CrimsonTech 2024</div>
                <div>
                  <a href="#">About Us</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
   
</div>`;
    page.innerHTML = html;

    const createAccountForm = document.getElementById('createAccountForm');
    createAccountForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        saveAccount(); // Call the saveAccount function
    });
}



async function saveAccount() {
    const lastName = document.getElementById('inputLastName').value;
    const firstName = document.getElementById('inputFirstName').value;
    const userEmail = document.getElementById('inputEmail').value;
    const userPassword = document.getElementById('inputPassword').value;
    const confirmPassword = document.getElementById('inputPasswordConfirm').value;
    const address = document.getElementById('inputAddress').value;
    const city = document.getElementById('inputCity').value;
    const region = document.getElementById('inputRegion').value;
    const postalCode = document.getElementById('inputPostalCode').value;
    const country = document.getElementById('inputCountry').value;
    const phone = document.getElementById('inputPhone').value;
    const deleteUser = false; // Assuming the user is not deleted upon creation
    const isAdmin = false; // Assuming the user is not an admin upon creation

    // Check if password fields match
    if (userPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // Validate email and phone fields
    if (!emailRegex.test(userEmail)) {
        alert('Invalid email address');
        return;
    }
    if (!phoneRegex.test(phone)) {
        alert('Invalid phone number');
        return;
    }

    const existingCustomer = await fetchExistingCustomer(userEmail);
    if (existingCustomer) {
        alert('Email already exists. Please use a different email.');
        location.reload();
        return;
    }

    const customer = {
        lastName: lastName,
        firstName: firstName,
        userEmail: userEmail,
        userPassword: userPassword,
        address: address,
        city: city,
        region: region,
        postalCode: postalCode,
        country: country,
        phone: phone,
        deleteUser: deleteUser,
        isAdmin: isAdmin
    };
    console.log(customer)

    try {
        const response = await fetch('http://localhost:5010/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        alert('Customer account created successfully!');
        // Redirect to settings.html
        window.location.href = 'login.html';
    } catch (error) {
        alert('Failed to create customer account. Please try again later.');
    }
}

async function fetchExistingCustomer(email) {
    try {
        const response = await fetch(`http://localhost:5010/api/customers/getCustomerByEmail?email=${encodeURIComponent(email)}`);
        if (response != null){
            const existingCustomer = await response.json();
            console.log(existingCustomer)
            return true;
        }
        else{
            return false;
        }
        } catch {
        return false;
    }
}