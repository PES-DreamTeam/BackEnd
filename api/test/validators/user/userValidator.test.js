const validator = require("../../../models/validators/userValidators");
describe("User validator", () => {
    it("Email valid", () => {
        try {
           validator.validateEmail("dannirodriguez99@gmail.com"); 
        } catch (error) {
            expect(true).toBe(false);    
        }
    })
    it("Email invalid", () => {
        try {
            validator.validateEmail("dannirodriguez99gmail.com");
        } catch (error) {
           expect(error.message).toBe("Email is invalid");
        }
    })
})