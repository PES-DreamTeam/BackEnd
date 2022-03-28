const Factory = require('../../../factory/factory');
const auth = require('../../../middlewares/auth');
const { validToken } = require('./schemas');
describe("Auth middleware test", () => {
    const factory = Factory();
    process.env.SECRET_WORD = 'secret word to encode jwt';
    class MockResponse {
            constructor() {
            this.res = {};
            }
            status = jest
            .fn()
            .mockReturnThis()
            .mockImplementationOnce((code) => {
            this.res.code = code;
            return this;
            });
            send = jest
            .fn()
            .mockReturnThis()
            .mockImplementationOnce((message) => {
            this.res.message = message;
            return this;
            });
    }

    it("valid token and user exists", async () => {
        const callbackFunction = jest.fn();
        const userService = factory.createUserService();
        const userSpy = jest.spyOn(userService, 'getById');
        userSpy.mockReturnValue({});
        const myAuth = auth(userService);
        await myAuth({headers:{authorization: `Bearer ${validToken}`}}, {}, callbackFunction);

        expect(callbackFunction).toHaveBeenCalled();
    });

    it("Invalid token", async () => {
        let res = new MockResponse();
        const callbackFunction = jest.fn();
        const userService = factory.createUserService();
        const myAuth = auth(userService);
        await myAuth({headers:{authorization: "aoeu"}}, res, callbackFunction);

        expect(res.status).toBeCalledWith(401);
        expect(res.send).toBeCalledWith({msg: 'Invalid token'});
        expect(callbackFunction).not.toHaveBeenCalled();
    });
    it("Valid token but user doesnt exists", async () => {
        let res = new MockResponse();
        const callbackFunction = jest.fn();
        const userService = factory.createUserService();
        const userSpy = jest.spyOn(userService, 'getById');
        userSpy.mockReturnValue(null);
        const myAuth = auth(userService);
        await myAuth({headers:{authorization: `Bearer ${validToken}`}}, res, callbackFunction);

        expect(res.status).toBeCalledWith(401);
        expect(res.send).toBeCalledWith({msg: 'You are not authorized'});
        expect(callbackFunction).not.toHaveBeenCalled();
    });





})