module.exports = {
    get: {
        tags: ["Achievement Controller"],
        descirption: "Get all achievements",
        operationId: "getAll",
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