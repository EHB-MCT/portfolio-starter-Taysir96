// validationHelpers.js

/**
 * Function to validate an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Function to validate a password.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
function validatePassword(password) {
    // Example: Password must be at least 8 characters long
    return typeof password === 'string' && password.length >= 8;
}

/**
 * Function to validate an item name.
 * @param {string} name - The item name to validate.
 * @returns {boolean} - True if the item name is valid, false otherwise.
 */
function validateItemName(name) {
    return typeof name === 'string' && name.length > 0 && name.length <= 50;
}

/**
 * Function to validate an image link (URL).
 * @param {string} link - The image link (URL) to validate.
 * @returns {boolean} - True if the link is a valid URL, false otherwise.
 */
function validateImgLink(link) {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(link);
}

/**
 * Function to validate a date in 'YYYY-MM-DD' format.
 * @param {string} date - The date to validate.
 * @returns {boolean} - True if the date is valid, false otherwise.
 */
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
