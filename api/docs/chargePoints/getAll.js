module.exports = {
    get: {
        tags:["ChargePoints controller"],
        description: "Get all charge points",
        operationId: "getChargePoints",
        parameters: [{
            name: 'groupBy',
            in: 'query',
            description: "GroupBy the charge points: 'id','name','address','vehicle_type','lat','lng'",
            required: false,
            schema: {
                type: 'string'
            }
        },
        {
            name: 'objectType',
            in: 'query',
            description: "Filter the stations by objectType: 'vehicleStation' or 'bikeStation'",
            required: false,
            schema: {
                type: 'string'
            }
        }
    ],
        responses: {
            200: {
                description: "Successful operation",
                content: {
                    "application/json": {}
                }
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}