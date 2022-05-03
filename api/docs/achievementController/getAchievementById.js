module.exports = {
    get: {
        tags: ["Achievement Controller"],
        description: "Get achievement by id",
        operationId: "getById",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/achievement_id",
                },
                required: true,
                description: "Achievement id",
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