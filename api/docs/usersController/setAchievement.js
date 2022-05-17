module.exports = {
    put: {
        tags: ["User controller"],
        description: "Set user achievements",
        operationId: "setAchievement",
        parameters: [
            {
                name:"Authorization",
                in: "header",
                schema: {
                    $ref: "#/components/schemas/auth",
                },
                required: true
            },{
                name: "achievement",
                in: "body",
                schema: {
                    $ref: "#/components/schemas/achievement_2",
                },
                required: true,
                description: "achievement",
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
            404: {
                description: "Not found",
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}