const { 
    inputChargePointsFromApi, 
    inputBikeChargePointsFromApi,
    bikeChargePointsFromDB,
    expectedChargePointsWithoutIdAndGrouping,
    expectedChargePointsWithoutIdAndGroupingByID,
    expectedBikeStations
} = require('./schemas');
const { BikeStations } = require('../../../models'); 
const Factory = require('../../../factory/factory');
const axios = require('axios');
const NodeCache = require('node-cache');

describe("Get Charge points", ()=>{
    const factory = Factory();

    process.env.MONGO_URL="mongodb+srv://ecoroads:aYyEX57lGoe8NH0H@pes.croxp.mongodb.net/PES_Backend?retryWrites=true&w=majority";
   
    const axiosSpy = jest.spyOn(axios, 'get');
    axiosSpy.mockImplementation(url => {
            if(url == "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states")
                return {data: inputChargePointsFromApi};
            else if(url == "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status")
                return {data: inputBikeChargePointsFromApi};
    })
    const bikeStationsSpy = jest.spyOn(BikeStations, 'find');
    it("Get Bike stations", async () => {
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);
        const chargePointsService = factory.createChargePointService({NodeCache, axios, BikeStations});

        const actual = await chargePointsService.getBikeStations();

        expect(actual).toEqual(expectedBikeStations);
    })

    it("Get Without id and group by", async () => {
        bikeStationsSpy.mockImplementation(()=>{bikeChargePointsFromDB});
        const chargePointsService = factory.createChargePointService({NodeCache, axios, BikeStations});

        const actual = await chargePointsService.get();

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGrouping);
    })

    it("Get Without id but with group by ID", async () => {

        bikeStationsSpy.mockImplementation(()=>{});
        const chargePointsService = factory.createChargePointService({NodeCache, axios, BikeStations});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});
        axiosSpy.mockImplementation(url => {
            if(url == "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states")
                return {data: inputChargePointsFromApi};
            else if(url == "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status")
                return {data: inputBikeChargePointsFromApi};
        })

        const actual = await chargePointsService.get(null, 'id');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
    it("Get with id and with group by ID and exists data that match the id", async () => {

        bikeStationsSpy.mockImplementation(()=>{});
        const chargePointsService = factory.createChargePointService({NodeCache, axios, BikeStations});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});
        axiosSpy.mockImplementation(url => {
            if(url == "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states")
                return {data: inputChargePointsFromApi};
            else if(url == "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status")
                return {data: inputBikeChargePointsFromApi};
        })
        const actual = await chargePointsService.get("2054", 'id');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
    it("Get with id and with group by ID and not exists data that match the id", async () => {

        bikeStationsSpy.mockImplementation(()=>{});
        const chargePointsService = factory.createChargePointService({NodeCache, axios,BikeStations});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});
        axiosSpy.mockImplementation(url => {
            if(url == "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states")
                return {data: inputChargePointsFromApi};
            else if(url == "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status")
                return {data: inputBikeChargePointsFromApi};
        })
        const actual = await chargePointsService.get("205", 'id');

        expect(actual).toEqual({});
    }) 

    it("Get without id but with groupBy but it's not valid", async () => {

        bikeStationsSpy.mockImplementation(()=>{});
        const chargePointsService = factory.createChargePointService({NodeCache, axios, BikeStations});
        const axiosSpy = jest.spyOn(axios, 'get');
        axiosSpy.mockReturnValue({data: inputChargePointsFromApi});

        axiosSpy.mockImplementation(url => {
            if(url == "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states")
                return {data: inputChargePointsFromApi};
            else if(url == "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status")
                return {data: inputBikeChargePointsFromApi};
        })
        const actual = await chargePointsService.get(null, 'not_valid_group_by');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGrouping);
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
