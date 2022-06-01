module.exports = {
    post: {
        tags: ['Sample Vehicles Controller'],
        description: 'Create a sample vehicle',
        operationId: 'createSampleVehicle',
        parameters: [{
                name:"Authorization",
                in: "header",
                type:"string",
                required: true,
                description: "The authorization token",
                schema: {
                    $ref: "#/components/schemas/auth",
                }
            },{
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