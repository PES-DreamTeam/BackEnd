module.exports = {
    get: {
        tags: ["Achievement Controller"],
        description: "Get achievement by id",
        operationId: "getById",
        parameters: [
            {
                name:"Authorization",
                in: "header",
                type:"string",
                required: true,
                description: "The authorization token",
                schema: {
                    $ref: "#/components/schemas/auth",
                }
            },{
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/achievement_id",
                },
                required: true,
                description: "Achievement id",
            },
            {
                name: "tier",
                in: "query",
                schema: {
                    $ref: "#/components/schemas/achievement_tier",
                },
                required: true,
                description: "Achievement tier",
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