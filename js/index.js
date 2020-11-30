// ***************************
// Script file for 'index.php'
// ***************************

// FUNCTION: Validates the login form
function validateLoginForm() {

    // Get the values from the "loginForm" form
    const email = document.forms['loginForm']['email'].value;
    const password = document.forms['loginForm']['password'].value;

    // If either of the fields are empty, alert the user and return false.
    // Otherwise, we can return "true" so that the flow continues.
    if (email === '' || password === '') {
        alert('Please fill in all fields!');
        return false;
    } else {
        return true;
    }
}