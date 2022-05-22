module.exports = {
    get: {
        tags: ["Message Controller"],
        descirption: "Get last message from all users",
        operationId: "getLastMsgAllUsers",
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