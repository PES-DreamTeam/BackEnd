module.exports = {
    post: {
        tags: ["User controller"],
        description: "Ban user. Only admin can ban user",
        operationId: "banUser",
        parameters: [
            {
                name:"Authorization",
                in: "header",
                schema: {
                    $ref: "#/components/schemas/auth",
                },
                required: true
            },{
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true,
                description: "User id",
            }
        ],
        responses: {
            200: {
                description: "Successful operation",
            },
            401:{
                description: "You are not authorized to ban user",
            },
            404: {
                description: "User Not found"
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}