module.exports = {
    get: {
        tags:["Service Controller"],
        description: "Get the closest charge points given a latitude, longitude and how many you want",
        operationId: "getClosest",
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
                name: "lat",
                in: "query",
                schema: {
                    type: "number",
                },
                required: true,
                description: "Initial latitude",
            },
            {
                name: "lng",
                in: "query",
                schema: {
                    type: "number",
                },
                required: true,
                description: "Initial longitude",
            },
            {
                name: "howMany",
                in: "query",
                schema: {
                    type: "integer",
                },
                required: true,
                description: "How many stations to return",
            },
        ],
        responses: {
            200: {
                description: "Successful operation",
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}