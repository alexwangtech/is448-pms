// FUNCTION: Checks to see whether an email is valid
// https://www.w3resource.com/javascript/form/email-validation.php
function validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (true);
    }
    return (false);
}
