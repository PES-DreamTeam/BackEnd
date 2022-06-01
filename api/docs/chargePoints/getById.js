module.exports = {
    get: {
        tags: ["ChargePoints controller"],
        description: "Get chargePoint by id",
        operationId: "getChargePoint",
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