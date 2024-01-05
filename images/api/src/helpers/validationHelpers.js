// validationHelpers.js

// Functie om e-mail te valideren
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Functie om wachtwoord te valideren
function validatePassword(password) {
    // Voorbeeld: Wachtwoord moet minstens 8 tekens lang zijn
    return typeof password === 'string' && password.length >= 8;
}
function validateItemName(name) {
    return typeof name === 'string' && name.length > 0 && name.length <= 50;
}

// Functie om img_link te valideren
function validateImgLink(link) {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(link);
}

// Functie om datums te valideren
function validateDate(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
}
module.exports = {
    validateEmail,
    validatePassword,
    validateItemName,
    validateImgLink,
    validateDate
};
