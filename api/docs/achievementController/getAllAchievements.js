module.exports = {
    get: {
        tags: ["Achievement Controller"],
        descirption: "Get all achievements",
        operationId: "getAll",
        parameters: [{
                name:"Authorization",
                in: "header",
                type:"string",
                required: true,
                description: "The authorization token",
                schema: {
                    $ref: "#/components/schemas/auth",
                }
            },],
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