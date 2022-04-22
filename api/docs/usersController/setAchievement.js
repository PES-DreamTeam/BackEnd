module.exports = {
    put: {
        tags: ["User controller"],
        description: "Set user achievements",
        operationId: "setAchievements",
        parameters: [
            {
                name:"Authorization",
                in: "header",
                schema: {
                    $ref: "#/components/schemas/auth",
                },
                required: true
            },{
                name: "achievement_id",
                in: "body",
                schema: {
                    $ref: "#/components/schemas/achievement_id",
                },
                required: true,
                description: "achievement id",
            },{
                name: "progress",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/progress",
                },
                required: true,
                description: "Progress",
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