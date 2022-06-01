module.exports = {
    get: {
        tags:["Report Controller"],
        description: "Get Reports",
        operationId: "getReports",
        parameters: [{
                name:"Authorization",
                in: "header",
                type:"string",
                required: true,
                description: "The authorization token",
                schema: {
                    $ref: "#/components/schemas/auth",
                }
            },{
            name: 'reportType',
            in: 'query',
            description: "Get Reports by type. 'station' or 'app'",
            required: true,
            schema: {
                type: 'string'
            }
        },
    ],
        responses: {
            200: {
                description: "Successful operation",
                content: {
                    "application/json": {
                        type: 'string',
                        example: {
                            resolvedReports: [{
                                type: 'station',
                                platform: 'android',
                                os: 'android',
                                subject: 'station',
                                details: 'station',
                                userName: 'user',
                                userId: 'userId',
                                date: 'date',
                                isResolved: false,
                                createdAt: 'createdAt',
                                reportId: 'reportId',
                            }], 
                    }}
                }
            },
            409: {
                description: "Wrong data provided",
            },
            500: {
                description: "Internal server error",
            }
        }
    }
}