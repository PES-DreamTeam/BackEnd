module.exports = {
    delete: {
        tags: ["Sample Vehicles Controller"],
        description: "Delete a sample vehicle",
        operationId: "deleteSampleVehicle",
        parameters: [{
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