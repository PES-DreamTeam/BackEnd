module.exports = {
    put: {
        tags:["ChargePoints controller"],
        description: "Report a charge point given an id",
        operationId: "reportStation",
        parameters: [
            {
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
            },{
                name: "reason",
                in: "body",
                schema: {
                    $ref: "#/components/schemas/Reason",
                },
                required: false,
                description: "Report reason",
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