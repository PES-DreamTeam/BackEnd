const { 
    inputChargePointsFromApi, 
    expectedChargePointsWithoutIdAndGrouping,
    expectedChargePointsWithoutIdAndGroupingByID 
} = require('./schemas');
const Factory = require('../../../factory/factory');
const axios = require('axios');
const NodeCache = require('node-cache');

describe("Get Charge points", ()=>{
    const factory = Factory();

    it("Get Without id and group by", async () => {
        const chargePointsService = factory.createChargePointService({NodeCache, axios});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});

        const actual = await chargePointsService.get();

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGrouping);
    })

    it("Get Without id but with group by ID", async () => {
        const chargePointsService = factory.createChargePointService({NodeCache, axios});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});

        const actual = await chargePointsService.get(null, 'id');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
    it("Get with id and with group by ID and exists data that match the id", async () => {
        const chargePointsService = factory.createChargePointService({NodeCache, axios});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});

        const actual = await chargePointsService.get("2054", 'id');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
    it("Get with id and with group by ID and not exists data that match the id", async () => {
        const chargePointsService = factory.createChargePointService({NodeCache, axios});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});

        const actual = await chargePointsService.get("205", 'id');

        expect(actual).toEqual({});
    }) 
})

describe("Group by", ()=>{
    const factory = Factory();

    it("Group by id", async () => {        
        const chargePointsService = factory.createChargePointService();
        const groupItems = chargePointsService.groupBy('id');
        const actual = groupItems(expectedChargePointsWithoutIdAndGrouping);

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
})


