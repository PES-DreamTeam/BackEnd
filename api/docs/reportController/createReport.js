module.exports = {
    post: {
        tags: ['Report Controller'],
        description: 'Create a new Report for the application',
        operationId: 'createReport',
        parameters: [{
            name: 'New report created by the user',
            in: 'body',
            description: 'The report to create',
            required: true,
            schema: {
                $ref: '#/components/schemas/Report',
            }
        },{
            name: 'Authorization',
            in: 'header',
            description: 'The authorization token',
            required: true,
            schema: {
                $ref: '#/componnents/schemas/auth',
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