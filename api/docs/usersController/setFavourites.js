module.exports = {
    put: {
        tags: ["User controller"],
        description: "Set user favourites",
        operationId: "setFavourites",
        parameters: [
            {
                name:"Authorization",
                in: "header",
                schema: {
                    $ref: "#/components/schemas/auth",
                },
                required: true
            },{
                name: "station_id",
                in: "body",
                schema: {
                    $ref: "#/components/schemas/station_id",
                },
                required: true,
                description: "Station id",
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