module.exports = {
    get: {
        tags: ["Sample Vehicles Controller"],
        description: "Get models by brand",
        operationId: "getModels",
        parameters: [{
                name:"Authorization",
                in: "header",
                type:"string",
                required: true,
                description: "The authorization token",
                schema: {
                    $ref: "#/components/schemas/auth",
                }
            },
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