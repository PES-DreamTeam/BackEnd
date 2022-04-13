module.exports = {
    post: {
        tags: ["User controller"],
        description: "Set profile picture",
        operationId: "setProfilePicture",
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
                name: 'new profile picture for user',
                in: 'body',
                description: 'The base64 of the image to add',
                required: true,
                schema: {
                    $ref: '#/components/schemas/Image',
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