module.exports = {
    get: {
        tags: ["Sample Vehicles Controller"],
        description: "Get all sample vehicles",
        operationId: "getAllSampleVehicles",
        parameters: [],
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