/**
 * Checks the validity of a user email.
 *
 * @param {string} email - The email to be checked for validity.
 * @returns {boolean} - `true` if the email is valid; otherwise, `false`.
 */
function checkUserEmail(email) {
    // Validate email against specified criteria
    if (
        email == null ||
        email.length <= 1 ||
        typeof email !== "string" ||
        email.length >= 20
    ) {
        return false;
    }
    return true;
}

module.exports = {
    checkUserEmail,
};
