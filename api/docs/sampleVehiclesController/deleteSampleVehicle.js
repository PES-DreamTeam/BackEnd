module.exports = {
    delete: {
        tags: ["Sample Vehicles Controller"],
        description: "Delete a sample vehicle",
        operationId: "deleteSampleVehicle",
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
            description: "The id of the sample vehicle",
            required: true,
            schema: {
                type: "string"
            }
        }],
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