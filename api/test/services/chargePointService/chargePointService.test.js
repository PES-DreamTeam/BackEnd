
const util = require('util');
const { 
    inputChargePointsFromApi, 
    inputBikeChargePointsFromApi,
    bikeChargePointsFromDB,
    expectedChargePointsWithoutIdAndGrouping,
    expectedChargePointsWithoutIdAndGroupingByID,
    expectedBikeStations,
    expectedBikeStationsGroupingById,
    expectedDataVehicleAndBikeGroupingById,
    expectedVehicleAndBikeStations,
    favourites,
    expectedVehicleBikeFavourites
} = require('./schemas');
const { BikeStations, DefaultStations, Highlights, ReportStations } = require('../../../models'); 
const Factory = require('../../../factory/factory');
const axios = require('axios');
const NodeCache = require('node-cache');
let factory = Factory();
let axiosSpy;
let bikeStationsSpy;
let chargePointsService;
let DefaultStationsSpy;
let ReportStationsSpy;
let HighlightsSpy;

beforeAll(()=>{

    process.env.MONGO_URL="mongodb+srv://ecoroads:aYyEX57lGoe8NH0H@pes.croxp.mongodb.net/PES_Backend?retryWrites=true&w=majority";

    axiosSpy = jest.spyOn(axios, 'get');
    axiosSpy.mockImplementation(url => {
            // api vehicles
            if(url == "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states")
                return {data: inputChargePointsFromApi};
            // api bikes
            else if(url == "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status")
                return {data: inputBikeChargePointsFromApi};
    })
})

beforeEach(()=>{
    chargePointsService = factory.createChargePointService({
        NodeCache, axios, BikeStations, DefaultStations, ReportStations, Highlights 
    });
    bikeStationsSpy = jest.spyOn(BikeStations, 'find');
    bikeStationsSpy.mockImplementation(()=>[]);
    DefaultStationsSpy = jest.spyOn(DefaultStations, 'find');
    DefaultStationsSpy.mockImplementation(()=>[]);
    ReportStationsSpy = jest.spyOn(ReportStations, 'find');
    ReportStationsSpy.mockImplementation(()=>[]);
    HighlightsSpy = jest.spyOn(Highlights, 'find');
    HighlightsSpy.mockImplementation(()=>[]);
})

describe("Get Charge points", ()=>{

    it("Get chargePoints objectType = [vehicleStation, bikeStation] group by id", async ()=> {
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);

        const actual = await chargePointsService.get(null, "id", ["bikeStation", "vehicleStation"]);

        expect(actual).toEqual(expectedVehicleAndBikeStations);       

    })
    
    it("Get charge points objectType = vehicleStation and group by id", async ()=>{
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);

        const actual = await chargePointsService.get(null, "id", ["vehicleStation"]);

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    })

    it("Get charge points objectType = bikeStation and without grouping", async ()=>{
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);

        const actual = await chargePointsService.get(null, null, ["bikeStation"]);

        expect(actual).toEqual(expectedBikeStations);
    })
    
    it("Get charge points objectType = bikeStation and grouping by id", async ()=>{
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);

        const actual = await chargePointsService.get(null, "id", ["bikeStation"]);

        expect(actual).toEqual(expectedBikeStationsGroupingById);
    })

    it("Get charge points without objectType, grouping by id returns vehicle and bikes", async ()=>{
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);

        const actual = await chargePointsService.get(null, "id", null);

        expect(actual).toEqual(expectedDataVehicleAndBikeGroupingById);
    })

    it("Get Without id and group by", async () => {
        const actual = await chargePointsService.get();

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGrouping);
    })

    it("Get Without id but with group by ID", async () => {
        const actual = await chargePointsService.get(null, 'id');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
    it("Get with id and with group by ID and exists data that match the id", async () => {
        const actual = await chargePointsService.get("2054", 'id');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
    it("Get with id and with group by ID and not exists data that match the id", async () => {
        const actual = await chargePointsService.get("205", 'id');

        expect(actual).toEqual({});
    }) 

    it("Get without id but with groupBy but it's not valid", async () => {
        const actual = await chargePointsService.get(null, 'not_valid_group_by');

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGrouping);
    })
})

describe("Group by", ()=>{
    it("Group by id", async () => {        
        const groupItems = chargePointsService.groupBy('id');
        const actual = groupItems(expectedChargePointsWithoutIdAndGrouping);

        expect(actual).toEqual(expectedChargePointsWithoutIdAndGroupingByID);
    }) 
})

describe("Get Bike Stations", () =>{
    it("Get Bike stations api returns data", async () => {
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);

        const actual = await chargePointsService.getBikeStations();

        expect(actual).toEqual(expectedBikeStations);
    })
    it("BCN API returns empty object getBikeStations returns []", async () => {
        bikeStationsSpy.mockImplementation(() => bikeChargePointsFromDB);
        axiosSpy.mockImplementation(url => {
            // api vehicles
            if(url == "https://api.bsmsa.eu/ext/api/bsm/chargepoints/states")
                return {data: inputChargePointsFromApi};
            // api bikes
            else if(url == "https://api.bsmsa.eu/ext/api/bsm/gbfs/v2/en/station_status")
                return {data: {}};
        })

        const actual = await chargePointsService.getBikeStations();

        expect(actual).toEqual([]);
    })
    it("DB BikeStations returns empty object getBikeStations returns []", async () => {
        const actual = await chargePointsService.getBikeStations();

        expect(actual).toEqual([]);
    })
})
