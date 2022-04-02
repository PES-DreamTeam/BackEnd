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
      socket_data: {
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
      socket_data: {
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
      socket_data: {
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

module.exports = {
    inputChargePointsFromApi,
    expectedChargePointsWithoutIdAndGrouping,
    expectedChargePointsWithoutIdAndGroupingByID
}