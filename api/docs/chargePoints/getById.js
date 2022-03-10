module.exports = {
    get: {
        tags: ["ChargePoints controller"],
        description: "Get chargePoint by id",
        operationId: "getChargePoint",
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
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/ChargePoint',            
                        }
                    }
                }
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}