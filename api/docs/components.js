module.exports = {
    components: {
        schemas: {
            id: {
                type: "string",
                description: "The id of the chargePoint",
                example: "2596"
            },
            Reason: {
                type: "string",
                description: "The reason for the report",
                example: `{"reason" : "I just don't like it"}`
            },
            Image: {
                type: "string",
                description: "The base64 of the image",
                example: "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mNcLVNbzwAEjDAGACcSA4kB6ARiAAAAAElFTkSuQmCC"
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
            VehicleConfig: {
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
                    },
                    color: {
                        type: "string",
                        description: "The color of the vehicle",
                        example: "#FFFFFF"
                    },
                    nickname: {
                        type: "string",
                        description: "The nickname of the vehicle",
                        example: "Sara"
                    },
                    numberPlate: {
                        type: "string",
                        description: "The number plate of the vehicle",
                        example: "1234ABC"
                    },
                    vehicleType: {
                        type: "string",
                        description: "The type of the vehicle",
                        example: "1"
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
                    sockets: {
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