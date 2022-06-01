const Factory = require('../../../factory/factory');
const { Users, VehicleInstances } = require('../../../models');
const { user, expectedUserWithVehicleConfig, expectedUserWithoutVehicleConfig, vehicleConfig } = require('./schemas');
describe("Feed User to web", () => {
    const factory = Factory();
    
    it("Feed user without vehicle config", async () => { 
        const vehicleSpy = jest.spyOn(VehicleInstances, 'find');
        vehicleSpy.mockReturnValue([]);
        const userService = factory.createUserService({Users, VehicleInstances});
        const actual = await userService.feedUserToWeb(user);

        expect(actual).toEqual(expectedUserWithoutVehicleConfig);
    });      

    it("Feed user with vehicle config", async () => {
        const vehicleSpy = jest.spyOn(VehicleInstances, 'find');
        vehicleSpy.mockReturnValue([vehicleConfig]);
        const userService = factory.createUserService({Users, VehicleInstances});

        const actual = await userService.feedUserToWeb(user);

        expect(actual).toEqual(expectedUserWithVehicleConfig);
    })

    it("Feed user with more than one vehicle config", async () => {
        const vehicleSpy = jest.spyOn(VehicleInstances, 'find');
        vehicleSpy.mockReturnValue([vehicleConfig, vehicleConfig]);
        const userService = factory.createUserService({Users, VehicleInstances});
        expectedUserWithVehicleConfig.vehicleConfig.push(JSON.parse(JSON.stringify(expectedUserWithVehicleConfig.vehicleConfig[0]))); 

        const actual = await userService.feedUserToWeb(user);
        expect(actual).toEqual(expectedUserWithVehicleConfig);
    })
});
