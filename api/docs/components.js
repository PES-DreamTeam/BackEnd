module.exports = {
    components: {
        schemas: {
            id: {
                type: "string",
                description: "The id of the chargePoint",
                example: "2596"
            },
            SampleVehicle: {
                type: "object",
                properties: {
                    brand: {
                        type: "string",
                        description: "The brand of the sample vehicle",
                        example: "Tesla"
                    },
                    model: {
                        type: "string",
                        description: "The model of the sample vehicle",
                        example: "Model S"
                    },
                    chargerType: {
                        type: "string",
                        description: "The type of the charger",
                        example: "AC"
                    }
                }
            },
            ChargePoint: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "The id of the chargePoint",
                        example: "2596"
                    },
                    name: {
                        type: "string",
                        description: "The name of the chargePoint",
                        example: "ChargePoint 1"
                    },
                    address: {
                        type: "string",
                        description: "The address of the chargePoint",
                        example: "Address 1"
                    },
                    vehicle_type: {
                        type: "number",
                        description: "The vehicle type of the chargePoint", 
                        example: 0
                    },
                    lat: {
                        type: "number",
                        description: "The latitude of the chargePoint",
                        example: 40 
                    },
                    lng: {
                        type: "number",
                        description: "The longitude of the chargePoint",
                        example: 4
                    },
                    socket_data: {
                        type: "object",
                        properties: {
                            socket_id: {
                                type: "number",
                                description: "The id of the socket",
                                example: 1                                
                            },
                            socket_type: {
                                type: "string",
                                description: "The type of the socket",
                                example: "Type 1"
                            },
                            charge_modes: {
                                type: "string",
                                description: "The charge modes of the socket",
                                example: "Mode 1"
                            },
                            socket_state: {
                                type: "number",
                                description: "The state of the socket",
                                example: 0
                            }
                        }
                    }

                }
            }
        }
    }
}