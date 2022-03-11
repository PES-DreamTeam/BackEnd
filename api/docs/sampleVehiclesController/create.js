module.exports = {
    post: {
        tags: ['Sample Vehicles Controller'],
        description: 'Create a sample vehicle',
        operationId: 'createSampleVehicle',
        parameters: [{
            name: 'new sample vehicle',
            in: 'body',
            description: 'The sample vehicle to create',
            required: true,
            schema: {
                $ref: '#/components/schemas/SampleVehicle',
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