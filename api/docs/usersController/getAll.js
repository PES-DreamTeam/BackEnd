module.exports = {
    get: {
        tags: ["User controller"],
        descirption: "Get all users",
        operationId: "getUsers",
        parameters: [],
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