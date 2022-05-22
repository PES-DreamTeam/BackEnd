module.exports = {
    get: {
        tags: ["Message Controller"],
        description: "Get all messages from chat by id",
        operationId: "getChatMsgs",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true,
                description: "User and chat id",
            }
        ],
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