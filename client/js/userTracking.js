const USER_KEY = 'loggedInUser';

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
}

function setLoggedInUser(user) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearLoggedInUser() {
    sessionStorage.removeItem(USER_KEY);
}
