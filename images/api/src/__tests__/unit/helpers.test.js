const { checkUserEmail } = require("../../helpers/endpointHelpers.js");

/**
 * Test suite for the checkUserEmail function.
 */

test("check email", () => {
    // Test cases for invalid email inputs
    expect(checkUserEmail("")).toBe(false); // empty string
    expect(checkUserEmail(null)).toBe(false);
    expect(checkUserEmail("i")).toBe(false);
    expect(checkUserEmail(1)).toBe(false);
    expect(checkUserEmail(undefined)).toBe(false);
    expect(checkUserEmail("abcdefghigklmnoprswxyzjnfenfenjfnejfjejfnjefnjenfjnîopfopakf")).toBe(false);
});