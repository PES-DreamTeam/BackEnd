module.exports = {
    get: {
        tags: ["Sample Vehicles Controller"],
        description: "Get all sample vehicles",
        operationId: "getAllSampleVehicles",
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
            name: "groupBy",
            in: "query",
            description: "GroupBy the sample vehicles: 'brand, model, chargerType'",
            required: false,
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