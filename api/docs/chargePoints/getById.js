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
        },
        {
            name: 'groupBy',
            in: 'query',
            description: "GroupBy the charge points: 'id','name','address','vehicle_type','lat','lng'",
            required: false,
            schema: {
                type: 'string'
            }
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