const { checkUserEmail } = require("../../helpers/endpointHelpers.js");

test("check email", () => {

    expect(checkUserEmail("")).toBe(false); // empty string
    expect(checkUserEmail(null)).toBe(false);
    expect(checkUserEmail("i")).toBe(false);
    expect(checkUserEmail(1)).toBe(false);
    expect(checkUserEmail(undefined)).toBe(false);
    expect(checkUserEmail("abcdefghigklmnoprswxyzjnfenfenjfnejfjejfnjefnjenfjnîopfopakf")).toBe(false);
});