module.exports = {
    post: {
        tags: ["User controller"],
        description: "Set Last Message",
        operationId: "setLastMessage",
        parameters: [
            {
                name:"Authorization",
                in: "header",
                type:"string",
                required: true
            },{
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true,
                description: "User id",
            },
            {
                name: 'new last message for user',
                in: 'body',
                description: 'The last message',
                required: true,
                schema: {
                    $ref: '#/components/schemas/lastMessage',
                }
            },
        ],
        responses: {
            200: {
                description: "Successful operation",
            },
            401: {
                description: "Unauthorized operation",
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}