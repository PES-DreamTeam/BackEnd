module.exports = {
    get: {
        tags:["ChargePoints controller"],
        description: "Get all charge points",
        operationId: "getChargePoints",
        parameters: [],
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