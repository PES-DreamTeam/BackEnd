module.exports = {
    get: {
        tags: ["User controller"],
        description: "Get vehicle config",
        operationId: "getVehicleConfig",
        parameters: [
            {
                name:"Authorization",
                in: "header",
                type:"string",
                required: true
            },{
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true,
                description: "User id",
            },
            {
                name: 'Number plate',
                in: 'body',
                description: 'Number plate of the vehicle to get',
                required: true,
                schema: {
                    type: "string"
                }
            },
        ],
        responses: {
            200: {
                description: "Successful operation",
            },
            401: {
                description: "Unauthorized operation",
            },
            409: {
                description: "The number plate already exists",
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}