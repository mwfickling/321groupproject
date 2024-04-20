// Define key constants for session storage
const USER_KEY = 'loggedInUser';

// Function to get the logged-in user from session storage
function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
}

// Function to set the logged-in user in session storage
function setLoggedInUser(user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Function to clear the logged-in user from session storage
function clearLoggedInUser() {
    sessionStorage.removeItem(USER_KEY);
}
