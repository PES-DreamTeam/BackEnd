module.exports = {
    components: {
        schemas: {
            id: {
                type: "string",
                description: "The id of the chargePoint",
                example: "625736cd88020ba327c9469c"
            },
            station_id: {
                type: "string",
                description: "The id of the station",
                example: '{"station_id" : "2054"}'
            },
            achievement_id: {
                type: "string",
                description: "The id of the achievement",
                example: '{"achievement_id" : "6"}'
            },
            progress: {
                type: "number",
                description: "The progress of the achievement",
                example: '{"progress" : "6"}'
            },
            auth: {
                type: "string",
                description: "auth token",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MzZjZDg4MDIwYmEzMjdjOTQ2OWMiLCJpYXQiOjE2NDk4ODI4MzAsImV4cCI6MTY1ODUyMjgzMH0.7lu38774PCqU8hboBQqZVcgfQg-tU2hpVNwEorCntuk"
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
            Register: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "The email of the user",
                        example: "dannirodriguez99@gmail.com"
                    },
                    password: {
                        type: "string",
                        description: "The password of the user",
                        example: "12345678a"
                    },
                    name: {
                        type: "string",
                        description: "The name of the user",
                        example: "Daniel Rodriguez"
                    }
                }
            },
            Login: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "The email of the user",
                        example: "dannirodriguez99@gmail.com"
                    },
                    password: {
                        type: "string",
                        description: "The password of the user",
                        example: "12345678a"
                    },
                }
            },
            Report: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        description: "The type of the report",
                        example: "Bug"
                    },
                    platform: {
                        type: "string",
                        description: "The platform of the report",
                        example: "Tablet"
                    },
                    os: {
                        type: "string",
                        description: "The os of the report",
                        example: "Android"
                    },
                    subject: {
                        type: "string",
                        description: "The subject of the report",
                        example: "I just don't like it"
                    },
                    details: {
                        type:"string",
                        description: "The details of the report",
                        example: "I just don't like it"
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