module.exports = {
    post: {
        tags: ['Auth Controller'],
        description: 'Login into the application',
        operationId: 'login',
        parameters: [{
            name: 'Login the user',
            in: 'body',
            description: 'Login the user',
            required: true,
            schema: {
                $ref: '#/components/schemas/Login',
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