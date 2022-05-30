module.exports = {
    get: {
        tags:["ChargePoints controller"],
        description: "Get the nearest charge points given an id",
        operationId: "getNearest",
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
            name: "id",
            in: "path",
            schema: {
                $ref: "#/components/schemas/id",
            },
            description: "Charge point id",
        },{
            name: "howMany",
            in: "query",
            schema: {
                type: 'string',
            },
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