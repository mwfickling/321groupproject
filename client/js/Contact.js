function handleOnLoad(){
  const page = document.getElementById('ContactPage');
  let html = `
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid">
      <img src="../assets/img/oopsies.png" class="navbar-logo" />
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
      <div class="col-md-4">
        <img src="../assets/img/luke.jpg" class="contact-img" alt="Luke Turner" />
        <h3>Luke Turner</h3>
        <p>luke@gmail.com<br>555-1010</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/img/wishka.jpg" class="contact-img" alt="Wishka Masooma" />
        <h3>Wishka Masooma</h3>
        <p>wishka@gamil.com<br>555-2020</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/img/bre.png" class="contact-img" alt="Bre Layton" />
        <h3>Bre Layton</h3>
        <p>bre@gmail.com<br>555-3030</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/img/matthew.jpg" class="contact-img" alt="Matthew Fickling" />
        <h3>Matthew Fickling</h3>
        <p>matthew@gmail.com<br>555-4040</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/img/kate.jpg" class="contact-img" alt="Kate Dickman" />
        <h3>Kate Dickman</h3>
        <p>kate@gmail.com<br>555-5050</p>
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
