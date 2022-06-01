module.exports = {
    put: {
        tags:["ChargePoints controller"],
        description: "Like or dislike a charge point given an id",
        operationId: "voteStation",
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
            description: "Charge point id",
        }],
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