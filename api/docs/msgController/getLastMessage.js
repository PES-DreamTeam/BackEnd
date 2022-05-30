module.exports = {
    get: {
        tags: ["Message Controller"],
        descirption: "Get last message",
        operationId: "getLastMessage",
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