module.exports = {
    post: {
        tags: ["User controller"],
        description: "Set vehicle config",
        operationId: "setVehicleConfig",
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
                name: 'new vehicle config for user',
                in: 'body',
                description: 'The vehicle to add',
                required: true,
                schema: {
                    $ref: '#/components/schemas/VehicleConfig',
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