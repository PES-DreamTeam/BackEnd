module.exports = {
    get: {
        tags: ["User controller"],
        descirption: "Get all users",
        operationId: "getUsers",
        parameters: [{
                name:"Authorization",
                in: "header",
                type:"string",
                required: true,
                description: "The authorization token",
                schema: {
                    $ref: "#/components/schemas/auth",
                }
            },],
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