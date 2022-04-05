const inputChargePointsFromApi = [
  {
    Station_id: '2054',
    Station_name: 'La Boqueria',
    Station_address: 'C/ Floristes de la rambla S/N',
    Station_lat: 41.381738,
    Station_lng: 2.17007,
    Location_level_id: 0,
    Reservable_station: false,
    Equipment_id: 'MULT_BOQUERIA1',
    Vehicle_type: 1,
    Open_data_slot_space_id: '2010110',
    State: 0,
    Grouping_id: 2,
    Wifi: true,
    Slot_space: '1',
    Slot_level: -2,
    Sockets: [
      {
        Connector_id: 10,
        Connector_types: '1,2',
        Charge_modes: '3',
        State: 0,
        Open_data_slot_space_connector_id: '20101101,20101102',
        MaxChargingTime: 720
      }
    ]
  },
  {
    Station_id: '2054',
    Station_name: 'La Boqueria',
    Station_address: 'C/ Floristes de la rambla S/N',
    Station_lat: 41.381738,
    Station_lng: 2.17007,
    Location_level_id: 0,
    Reservable_station: false,
    Equipment_id: 'MULT_BOQUERIA1',
    Vehicle_type: 1,
    Open_data_slot_space_id: '2010111',
    State: 0,
    Grouping_id: 2,
    Wifi: true,
    Slot_space: '2',
    Slot_level: -2,
    Sockets: [
      {
        Connector_id: 11,
        Connector_types: '1,2',
        Charge_modes: '3',
        State: 0,
        Open_data_slot_space_connector_id: '20101111,20101112',
        MaxChargingTime: 720
      }
    ]
  },
  {
    Station_id: '2054',
    Station_name: 'La Boqueria',
    Station_address: 'C/ Floristes de la rambla S/N',
    Station_lat: 41.381738,
    Station_lng: 2.17007,
    Location_level_id: 0,
    Reservable_station: false,
    Equipment_id: 'MULT_BOQUERIA1',
    Vehicle_type: 0,
    Open_data_slot_space_id: '2010105',
    State: 0,
    Grouping_id: 1,
    Wifi: true,
    Slot_space: '209',
    Slot_level: -2,
    Sockets: [
      {
        Connector_id: 5,
        Connector_types: '1,2',
        Charge_modes: '3',
        State: 0,
        Open_data_slot_space_connector_id: '20101051,20101052',
        MaxChargingTime: 720
      }
    ]
  }
]

const expectedChargePointsWithoutIdAndGrouping = [
  {
    id: '2054',
    name: 'La Boqueria',
    address: 'C/ Floristes de la rambla S/N',
    lat: 41.381738,
    lng: 2.17007,
    objectType: 'vehicleStation',
    data: {
      sockets: {
        socket_id: 10,
        socket_type: '1,2',
        charge_modes: '3',
        socket_state: 0
      },
      vehicle_type: 1,
    }
    
  },
  {
    id: '2054',
    name: 'La Boqueria',
    address: 'C/ Floristes de la rambla S/N',
    lat: 41.381738,
    lng: 2.17007,
    objectType: 'vehicleStation',
    data: {
      sockets: {
        socket_id: 11,
        socket_type: '1,2',
        charge_modes: '3',
        socket_state: 0
      },
      vehicle_type: 1,
    }
  },
  {
    id: '2054',
    name: 'La Boqueria',
    address: 'C/ Floristes de la rambla S/N',
    lat: 41.381738,
    lng: 2.17007,
    objectType: 'vehicleStation',
    data: {
      sockets: {
        socket_id: 5,
        socket_type: '1,2',
        charge_modes: '3',
        socket_state: 0
      },
      vehicle_type: 0,
    }
  }
]

const expectedChargePointsWithoutIdAndGroupingByID = {
  '2054': {
    id: '2054',
    name: 'La Boqueria',
    address: 'C/ Floristes de la rambla S/N',
    lat: 41.381738,
    lng: 2.17007,
    objectType: 'vehicleStation',
    data: {
      sockets: [
      {
          socket_id: 10,
          socket_type: '1,2',
          charge_modes: '3',
          socket_state: 0,
          vehicle_type: 1
        },
        {
          socket_id: 11,
          socket_type: '1,2',
          charge_modes: '3',
          socket_state: 0,
          vehicle_type: 1
        },
        {
          socket_id: 5,
          socket_type: '1,2',
          charge_modes: '3',
          socket_state: 0,
          vehicle_type: 0
        }
      ]
    }
  }
};

const bikeChargePointsFromDB = [

  {
    _id: "62483f0657d5ada2ca0b32d8",
    station_id:  2,
    name: "C/ ROGER DE FLOR, 126",
    lat:  41.3954877,
    lng: 2.1771985,
    address: "C/ ROGER DE FLOR, 126",
    postCode: "8013" ,
  },
  {
    _id: "62483f0657d5ada2ca0b32d8",
    station_id:  1,
    name: "C/ TEST",
    lat:  41.3954877,
    lng: 2.1771985,
    address: "C/ ROGER DE FLOR, 126",
    postCode: "8013" ,
  },
];

const inputBikeChargePointsFromApi = {
  data: {
    stations: [
      {
        station_id: 1,
        num_bikes_available: 2,
        num_bikes_available_types: {
          mechanical: 2,
          ebike: 0
        },
        num_docks_available: 41,
        last_reported: 1648925945,
        is_charging_station: true,
        status: "IN_SERVICE",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        traffic: null
      },
      {
        station_id: 2,
        num_bikes_available: 2,
        num_bikes_available_types: {
          mechanical: 2,
          ebike: 0
        },
        num_docks_available: 41,
        last_reported: 1648925945,
        is_charging_station: true,
        status: "IN_SERVICE",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        traffic: null
      }
    ]
    
  }
}

const expectedBikeStations = [        
      {      
        id: 1,
        name: 'C/ TEST',
        address: 'C/ ROGER DE FLOR, 126',
        lat: 41.3954877,
        lng: 2.1771985,
        objectType: 'bikeStation',
        data: {
          sockets: {
            available_sockets: 41,
            available_electrical: 0,
            available_mechanical: 2,
            socket_state: 0
          }
        }
      },
      {
        id: 2,
        name: 'C/ ROGER DE FLOR, 126',
        address: 'C/ ROGER DE FLOR, 126',
        lat: 41.3954877,
        lng: 2.1771985,
        objectType: 'bikeStation',
        data: {
          sockets: {
            available_sockets: 41,
            available_electrical: 0,
            available_mechanical: 2,
            socket_state: 0
          }
        }
      }
    ]

const expectedBikeStationsGroupingById = 
  {
      '1': {
        id: 1,
        name: 'C/ TEST',
        address: 'C/ ROGER DE FLOR, 126',
        lat: 41.3954877,
        lng: 2.1771985,
        objectType: 'bikeStation',       
        data: {
          sockets: [
            {
              available_sockets: 41,     
              available_electrical: 0,   
              available_mechanical: 2,   
              socket_state: 0,
              vehicle_type: undefined    
            }
          ]
        }
      },
      '2': {
        id: 2,
        name: 'C/ ROGER DE FLOR, 126',   
        address: 'C/ ROGER DE FLOR, 126',
        lat: 41.3954877,
        lng: 2.1771985,
        objectType: 'bikeStation',
        data: {
          sockets: [
            {
              available_sockets: 41,
              available_electrical: 0,
              available_mechanical: 2,
              socket_state: 0,
              vehicle_type: undefined
            }
          ]
        }
      }
    }

const expectedDataVehicleAndBikeGroupingById = 
  {
      '1': {
        id: 1,
        name: 'C/ TEST',
        address: 'C/ ROGER DE FLOR, 126',
        lat: 41.3954877,
        lng: 2.1771985,
        objectType: 'bikeStation',       
        data: {
          sockets: [
            {
              available_sockets: 41,     
              available_electrical: 0,   
              available_mechanical: 2,   
              socket_state: 0,
              vehicle_type: undefined    
            }
          ]
        }
      },
      '2': {
        id: 2,
        name: 'C/ ROGER DE FLOR, 126',   
        address: 'C/ ROGER DE FLOR, 126',
        lat: 41.3954877,
        lng: 2.1771985,
        objectType: 'bikeStation',
        data: {
          sockets: [
            {
              available_sockets: 41,
              available_electrical: 0,
              available_mechanical: 2,
              socket_state: 0,
              vehicle_type: undefined
            }
          ]
        }
      },
       '2054': {
      id: '2054',
      name: 'La Boqueria',
      address: 'C/ Floristes de la rambla S/N',
      lat: 41.381738,
      lng: 2.17007,
      objectType: 'vehicleStation',
      data: {
        sockets: [
        {
            socket_id: 10,
            socket_type: '1,2',
            charge_modes: '3',
            socket_state: 0,
            vehicle_type: 1
          },
          {
            socket_id: 11,
            socket_type: '1,2',
            charge_modes: '3',
            socket_state: 0,
            vehicle_type: 1
          },
          {
            socket_id: 5,
            socket_type: '1,2',
            charge_modes: '3',
            socket_state: 0,
            vehicle_type: 0
          }
        ]
      }
    }
  }

module.exports = {
    inputChargePointsFromApi,
    inputBikeChargePointsFromApi,
    bikeChargePointsFromDB,
    expectedChargePointsWithoutIdAndGrouping,
    expectedChargePointsWithoutIdAndGroupingByID,
    expectedBikeStations,
    expectedBikeStationsGroupingById,
    expectedDataVehicleAndBikeGroupingById
}