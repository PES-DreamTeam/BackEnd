module.exports = {
    get: {
        tags:["ChargePoints controller"],
        description: "Get all charge points",
        operationId: "getChargePoints",
        parameters: [{
                name:"Authorization",
                in: "header",
                type:"string",
                required: true,
                description: "The authorization token",
                schema: {
                    $ref: "#/components/schemas/auth",
                }
            },{
            name: 'groupBy',
            in: 'query',
            description: "GroupBy the charge points: 'id','name','address','vehicle_type','lat','lng' (The best option is to always group by 'id')",
            required: false,
            schema: {
                type: 'string'
            }
        },
        {
            name: 'objectType[]',
            in: 'query',
            description: "Filter the stations by objectType: 'vehicleStation' or 'bikeStation' (on swagger you cannot add more than one filter but actually, you can set objectType[]=vehicleStation&objectType[]=bikeStation on your http request)",
            required: false,
            schema: {
                type: "array",
                items:{
                    type: 'string'
                }


            }
        },
        {
            name: 'userId',
            in: 'query',
            description: "Filter the stations by favourite based on the userId",
            required: false,
            type: "string"
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