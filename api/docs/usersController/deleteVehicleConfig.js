module.exports = {
    delete: {
        tags: ["User controller"],
        description: "Delete vehicle config",
        operationId: "deleteVehicleConfig",
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
                description: 'Number plate of the vehicle to delete',
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
            500: {
                description: "Internal server error",
            }
        }
    }
}