const { validateEmail, validatePassword, validateItemName, validateImgLink, validateDate } = require('../../helpers/validationHelpers');

// Tests voor e-mailvalidatie
describe('E-mail Validatie', () => {
    test('Valide e-mails', () => {
        expect(validateEmail('email@example.com')).toBe(true);
        expect(validateEmail('name.lastname@example.co')).toBe(true);
    });

    test('Ongeldige e-mails', () => {
        expect(validateEmail('')).toBe(false);
        expect(validateEmail('invalid-email')).toBe(false);
        expect(validateEmail('name@example')).toBe(false);
        expect(validateEmail('name@example.')).toBe(false);
    });
});

// Tests voor wachtwoordvalidatie
describe('Wachtwoord Validatie', () => {
    test('Valide wachtwoorden', () => {
        expect(validatePassword('StrongPass123')).toBe(true);
        expect(validatePassword('Another$Pass88')).toBe(true);
    });

    test('Ongeldige wachtwoorden', () => {
        expect(validatePassword('short')).toBe(false);
        expect(validatePassword(12345678)).toBe(false); // Niet een string
        expect(validatePassword('')).toBe(false);
    });
});


// Tests voor itemnaam validatie
describe('Itemnaam Validatie', () => {
    test('Valide itemnamen', () => {
        expect(validateItemName('Item 1')).toBe(true);
        expect(validateItemName('Een zeer specifiek item')).toBe(true);
    });

    test('Ongeldige itemnamen', () => {
        expect(validateItemName('')).toBe(false);
        expect(validateItemName(123)).toBe(false); // Geen string
    });
});

// Tests voor img_link validatie
describe('Img_Link Validatie', () => {
    test('Valide img_links', () => {
        expect(validateImgLink('https://example.com/image.jpg')).toBe(true);
        expect(validateImgLink('http://example.com/resource.png')).toBe(true);
    });

    test('Ongeldige img_links', () => {
        expect(validateImgLink('invalid-url')).toBe(false);
        expect(validateImgLink('ftp://example.com/resource')).toBe(false);
    });
});

// Tests voor datum validatie
describe('Datum Validatie', () => {
    test('Valide datums', () => {
        expect(validateDate('2021-01-01')).toBe(true);
        expect(validateDate('2022-12-31')).toBe(true);
    });

    test('Ongeldige datums', () => {
        expect(validateDate('01-01-2021')).toBe(false);
        expect(validateDate('2021/01/01')).toBe(false);
        expect(validateDate('Invalid')).toBe(false);
    });
});

// Voeg soortgelijke tests toe voor start_date en end_date validatie
