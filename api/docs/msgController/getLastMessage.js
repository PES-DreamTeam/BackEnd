module.exports = {
    get: {
        tags: ["Message Controller"],
        descirption: "Get last message",
        operationId: "getLastMessage",
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