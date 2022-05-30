module.exports = {
    get: {
        tags:["Service Controller"],
        description: "Get the closest charge point given a latitude, longitude and the maximum distance",
        operationId: "getClosestAvailable",
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
                name: "distance",
                in: "query",
                schema: {
                    type: "number",
                },
                required: true,
                description: "Maximum distance to search",
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