const initialData = [
    { username: 'DING WEI JIE', password: 'Ding_2004' },
    { username: 'LEE ZI YONG', password: '2300740' },
    { username: 'WONG WEI LUN', password: '2300193' },
    { username: 'KISHORE', password: '2300375' },
    { username: 'JONATHAN', password: '2300648' },
];

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login');
    const userIcon = document.querySelector('.fa-user');
    const nameSuccess = document.getElementById('name_success');

    const storedUsername = sessionStorage.getItem('username');

    function handleSuccessfulLogin(username) {
        sessionStorage.setItem('username', username);
        updateUI(username, true);
        window.location.href = 'lp_index.html';
    }

    function handleSignOut() {
        sessionStorage.removeItem('username');
        updateUI('', false);
    }

    function updateUI(username, isLoggedIn) {
        if (isLoggedIn) {
            nameSuccess.innerHTML = `Welcome,<br />${username}`;
            userIcon.className = 'fa fa-sign-out';
            userIcon.title = 'Sign Out';
            userIcon.removeEventListener('click', handleSignOut);
            userIcon.addEventListener('click', handleSignOut);
        } else {
            nameSuccess.innerHTML = '';
            userIcon.className = 'fa fa-user';
            userIcon.title = 'User';
            userIcon.removeEventListener('click', handleSignOut);
        }
    }

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        const enteredUsername = document.getElementById('login-username').value;
        const enteredPassword = document.getElementById('login-password').value;
        const isAuthenticated = authenticateUser(enteredUsername, enteredPassword);

        if (isAuthenticated) {
            handleSuccessfulLogin(enteredUsername);
        } else {
            document.getElementById('message').innerHTML = 'Invalid username or password.';
        }
    });

    if (storedUsername) {
        handleSuccessfulLogin(storedUsername);
    }
});

function authenticateUser(username, password) {

    // Check if the provided username and password match any of the initial data
    for (const userData of initialData) {
        if (username === userData.username && password === userData.password) {

            return true; // Authentication successful
        }
    }

    return false; // Authentication failed
}

document.addEventListener('DOMContentLoaded', function () {

    const nameSuccess = document.getElementById('name_success');
    const userIcon = document.getElementById('user-icon');

    const storedUsername = sessionStorage.getItem('username');

    function handleSignOut() {

        sessionStorage.removeItem('username');

        userIcon.className = 'fa fa-user';
        userIcon.title = 'User'; 

        userIcon.removeEventListener('click', handleSignOut);

        nameSuccess.innerHTML = '';
    }

    if (storedUsername) {

        nameSuccess.innerHTML = "Welcome,<br/>" + storedUsername;

        userIcon.className = 'fa fa-sign-out'; 
        userIcon.title = 'Sign Out'; 

        userIcon.addEventListener('click', handleSignOut);
    }
})


document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting by default

    // Get input values
    const username = document.getElementById('signup-username').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('phone').value;
    const birthday = document.getElementById('bday').value;
    const password = document.getElementById('pw').value;
    const confirmPassword = document.getElementById('signup-password').value;

    // Perform basic form validation
    if (username === '' || firstName === '' || lastName === '' || email === '' || phone === '' || birthday === '' || password === '' || confirmPassword === '') {
        alert('Please fill out all required fields.');
    } else if (password !== confirmPassword) {
        alert('Passwords do not match. Please confirm your password.');
    } else {
        // All information is filled out correctly
        alert('Sign up successful!');
        // You can submit the form to the server here if needed
        // this.submit(); // Uncomment this line to submit the form
    }
});