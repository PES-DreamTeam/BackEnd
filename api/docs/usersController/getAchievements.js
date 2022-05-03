module.exports = {
    get: {
        tags: ["User controller"],
        description: "Get all user achievements",
        operationId: "getAchievements",
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
            500: {
                description: "Internal server error",
            }
        }
    }
}