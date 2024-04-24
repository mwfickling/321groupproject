const customerUrl = "http://localhost:5010/api/customers";


async function handleOnLoad(){
    const page = document.getElementById('indexPage')
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
            <a class="dropdown-item" href="adminSettings.html">Admin Settings</a>
        </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="./PayScreen.html">Shopping Cart</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>


  <section class="bg-dark text-light p-5 text-center video-background">
    <div class="container position-relative">
      <h3>Your Best Cooking Friend</h3>
      
      <video autoplay muted loop id="bgVideo">
        <source
          src="../assets/Videos/HomePageBackroundVideo.mp4"
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>
    </div>
  </section>
  <style>
    .video-background {
      position: relative;
      height: 100vh; 
      overflow: hidden;
  }

  #bgVideo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); 
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      object-fit: cover;
      z-index: -1;
  }

  .video-background .container {
      position: relative;
      z-index: 2; 
      display: flex;
      flex-direction: column;
      justify-content: flex-start; 
      padding-top: 10vh; 
  }

  .navbar {
      z-index: 1030; 
  }

  .navbar-logo {
      height: 50px; 
      width: auto;
  }

  .video-background h3 {
      color: white;
      font-size: 3rem; 
      font-weight: bold;
      text-shadow: 2px 2px 4px #000000;}
  </style>


  <section class="bg-primary text-light p-5">
    <div class="container text-center" id="howItWorks">
      <h2>How it works</h2>
      <p class="lead mb-5">Brief explanation of how it works.</p>
      <div class="row g-4 justify-content-center">
        <div class="col-md-4">
          <div class="card bg-light" style="height: 100%">
            <div class="card-body">
              <img
                src="../assets/img/Recipe.jpeg"
                class="rounded-circle mb-3"
                alt=""
                style="width: 200px; height: 200px"
              />
              <h3 style="color: #000000">Choose your recipe</h3>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-light" style="height: 100%">
            <div class="card-body">
              <img
                src="../assets/img/publix.png"
                class="rounded-circle mb-3"
                alt=""
                style="width: 200px; height: 200px"
              />
              <h3 style="color: #000000">Select your provider</h3>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-light" style="height: 100%">
            <div class="card-body">
              <img
                src="../assets/img/family.jpg"
                class="rounded-circle mb-3"
                alt=""
                style="width: 200px; height: 200px"
              />
              <h3 style="color: #000000">Enjoy!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="p-5 bg-light text-center">
    <h2>Explore the menu</h2>
    <div class="container">
  <div class="row my-4">
    <div class="col-lg-3 col-md-6 mb-4">
      <img src="https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg" alt="Menu Item 1" class="img-fluid rounded" style="height: 200px; width: 300px; object-fit: cover;" />
    </div>
    <div class="col-lg-3 col-md-6 mb-4">
      <img src="https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/17/00/23/Mq92FgsOQYuAUcSQ7DNG_MEXICAN_TAMALES_V_f.jpg" alt="Menu Item 2" class="img-fluid rounded" style="height: 200px; width: 300px; object-fit: cover;" />
    </div>
    <div class="col-lg-3 col-md-6 mb-4">
      <img src="https://speedy.uenicdn.com/1d644ed5-b758-4229-b8ba-736fa89e3df2/c720_a/image/upload/v1684866693/business/015a869d-d333-4348-aa40-fa3fc741e9a8.jpg" alt="Menu Item 3" class="img-fluid rounded" style="height: 200px; width: 300px; object-fit: cover;" />
    </div>
    <div class="col-lg-3 col-md-6 mb-4">
      <img src="https://www.blueosa.com/wp-content/uploads/2020/01/the-best-top-10-indian-dishes.jpg" alt="Menu Item 4" class="img-fluid rounded" style="height: 200px; width: 300px; object-fit: cover;" />
    </div>
  </div>
</div>
      <button class="btn btn-primary" onclick="location.href='recipes.html'">View Full Menu</button>
    </div>
  </section>

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
  </footer>`
page.innerHTML = html;
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

  // Show admin menu if user is admin, hide otherwise
  const adminSettingsOption = document.getElementById('adminSettingsOption');
  if (isAdmin) {
    adminSettingsOption.style.display = 'block';
  } else {
    adminSettingsOption.style.display = 'none';
  }

  return isAdmin;
} catch (error) {
  console.error('Error checking admin status:', error);
  return false; // Default to false if error occurs
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


