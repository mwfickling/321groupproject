async function handleOnLoad(){
  const page = document.getElementById('ContactPage');
  let html = `<nav class="navbar navbar-expand navbar-dark bg-dark">
  <div class="container-fluid">
    <img src="../assets/img/oopsies.png" class="navbar-logo" />
    <a class="navbar-brand" href="index.html">Shop By Recipe</a>
    <div class="d-flex justify-content-center flex-grow-1">
      <a class="navbar-brand" href="./recipes.html">Recipes</a>
      <a class="navbar-brand" href="./contact.html">Contact</a>
      <a class="navbar-brand" href="#howItWorks" id="thirdSection">Services</a>
    </div>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fas fa-user fa-fw"></i>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <a class="dropdown-item" id="loginSignUpItem" href="./login.html">Login / Sign-up</a>
          </li>
          <li id="adminSettingsOption" style="display: none;">
          <a class="dropdown-item" href="analytics.html">Admin Dashboard</a>
      </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="./PayScreen.html" id="shoppingCartBtn">Shopping Cart</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>




<div class="row mt-4">
<div class="col-md-4">
  <img src="../assets/img/luke.jpg" class="contact-img rounded-circle" alt="Luke Turner" />
  <h3>Luke Turner</h3>
  <p>luke@gmail.com<br>555-1010</p>
</div>
<div class="col-md-4">
  <img src="../assets/img/wishka.jpg" class="contact-img rounded-circle" alt="Wishka Masooma" />
  <h3>Wishka Masooma</h3>
  <p>wishka@gmail.com<br>555-2020</p>
</div>
<div class="col-md-4">
  <img src="../assets/img/Bre.jpg" class="contact-img rounded-circle" alt="Bre Layton" />
  <h3>Bre Layton</h3>
  <p>bre@gmail.com<br>555-3030</p>
</div>
<div class="col-md-4">
  <img src="../assets/img/matthew.jpg" class="contact-img rounded-circle" alt="Matthew Fickling" />
  <h3>Matthew Fickling</h3>
  <p>matthew@gmail.com<br>555-4040</p>
</div>
<div class="col-md-4">
  <img src="../assets/img/kate.jpg" class="contact-img rounded-circle" alt="Kate Dickman" />
  <h3>Kate Dickman</h3>
  <p>kate@gmail.com<br>555-5050</p>
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
  </footer>

  <style>
    .navbar-logo {
      height: 50px;
      width: auto;
    }
    .rounded-circle {
      border-radius: 50%;
    }
  </style>`;

  page.innerHTML = html;
  updateCartItemCount();

  // Log the logged-in user
  const loggedInUserId = sessionStorage.getItem('loggedInUserId');
  if (loggedInUserId) {
    const user = await getUserInfo(loggedInUserId);
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`;
      updateLoginSignUpLink(fullName);
    }
  }

  try {
    const response = await fetch(`http://localhost:5010/api/customers/getAdminStatusById?userId=${loggedInUserId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch admin status');
    }
    const isAdmin = await response.json();

    const adminSettingsOption = document.getElementById('adminSettingsOption');
    if (isAdmin) {
      adminSettingsOption.style.display = 'block';
    } else {
      adminSettingsOption.style.display = 'none';
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
  }
}

function updateCartItemCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartButton = document.getElementById('shoppingCartBtn');
  if (cartItemCount > 0) {
    cartButton.textContent = `Checkout (${cartItemCount})`;
  } else {
    cartButton.textContent = 'Checkout';
  }
}