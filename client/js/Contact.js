function handleOnLoad(){
  const page = document.getElementById('ContactPage');
  let html = `
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid">
      <img src="./assets/img/oopsies.png" class="navbar-logo" />
      <a class="navbar-brand" href="Analytics.html">Shop By Recipe</a>
      <div class="d-flex justify-content-center flex-grow-1">
        <a class="navbar-brand" href="./recipes.html">Recipes</a>
        <a class="navbar-brand" href="./contact.html">Contact</a>
        <a class="navbar-brand" href="#" id="thirdSection">Coming Soon</a>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user fa-fw"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="./settings.html">Settings</a></li>
            <li><a class="dropdown-item" href="./login.html">Login / Sign-up</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="./PayScreen.html">Checkout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container text-center my-5">
    <h2>Questions? Contact Us!</h2>
    <div class="row mt-4">
      <div class="col-md-6">
        <img src="./assets/img/lauren.png" class="rounded-circle" style="width: 140px; height: 140px; object-fit: cover;" />
        <h3>Lauren Wright</h3>
        <p>lauren@example.com<br>555-1234</p>
      </div>
      <div class="col-md-6">
        <img src="" class="rounded-circle" style="width: 140px; height: 140px; object-fit: cover;" />
        <h3>Sully Smith</h3>
        <p>sully@example.com<br>555-5678</p>
      </div>
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
}
//https://media.licdn.com/dms/image/D5603AQH95YeHNrm7YA/profile-displayphoto-shrink_200_200/0/1698695268490?e=2147483647&v=beta&t=S_DsDkFfh-9RwzE8G5dGWH2GhDmKEbcdqUNCjDQcuBQ
