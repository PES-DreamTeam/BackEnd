module.exports = {
    get: {
        tags: ["Sample Vehicles Controller"],
        description: "Get models by brand",
        operationId: "getModels",
        parameters: [
            {
                name: "brand",
                in: "query",
                description: "Brand name",
                required: true,
            }
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