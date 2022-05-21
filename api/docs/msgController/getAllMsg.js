module.exports = {
    get: {
        tags: ["Message Controller"],
        descirption: "Get all messages",
        operationId: "getAllMsg",
        parameters: [],
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