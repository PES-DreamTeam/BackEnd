module.exports = {
    get: {
        tags:["ChargePoints controller"],
        description: "Get info for a charge point given an id",
        operationId: "getInfo",
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