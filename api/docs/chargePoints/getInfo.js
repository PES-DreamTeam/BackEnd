module.exports = {
    get: {
        tags:["ChargePoints controller"],
        description: "Get info for a charge point given an id",
        operationId: "getInfo",
        parameters: [{
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true, 
                description: "Charge point id",
        }],
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