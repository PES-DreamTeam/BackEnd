module.exports = {
    post: {
        tags: ['Message Controller'],
        description: 'Create a message',
        operationId: 'createMessage',
        parameters: [{
            name: 'new message',
            in: 'body',
            description: 'The message to create',
            required: true,
            schema: {
                $ref: '#/components/schemas/message',
            }
        }],
        responses: {
            200: {
                description: 'Successful operation',
            },
            500: {
                description: 'Internal server error',
            }
        }
    }
}