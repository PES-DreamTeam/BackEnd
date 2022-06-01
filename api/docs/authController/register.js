module.exports = {
    post: {
        tags: ['Auth Controller'],
        description: 'Register into the application',
        operationId: 'register',
        parameters: [{
            name: 'Register the new user',
            in: 'body',
            description: 'Register the new user',
            required: true,
            schema: {
                $ref: '#/components/schemas/Register',
            }
        }],
        responses: {
            201: {
                description: 'Successful operation',
            },
            500: {
                description: 'Internal server error',
            }
        }
    }
}