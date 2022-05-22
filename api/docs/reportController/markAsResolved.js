module.exports = {
    put: {
        tags:["Report Controller"],
        description: 
        `
            Mark a report as resolved. 
            If reportType == 'station' then the stationId and reportId must be provided. 
            If reportType == 'app' then the reportId must be provided.
        `,
        operationId: "markReportAsResolved",
        parameters: [
            {
                name: "Authorization",
                in: 'header',
                description: 'The authorization token',
                required: true,
                schema: {
                    $ref: '#/components/schemas/auth',
                }
            },
            {
                name:"stationId",
                in: "query",
                type:"string",
                required: false,
                description: "The id Of the station",
                schema: {
                    type: 'string',
                    description: 'The id Of the station',
                    example: '2054'            
                }
            },{
            name: "reportId",
            in: "query",
            schema: {
                type: 'string',
                description: 'The id Of the report',
                example: 'Search one by yourself donkey'
            },
            description: "The id Of the report",
        },{
            name: "reportType",
            in: "query",
            type:"string",
            required: true,
            description: "The type of the report to be marked as resolved [station/app]",
            schema: {
                type: 'string',
                description: 'The type of the report to be marked as resolved [station/app]',
                example: 'station'
            }
        }],
        responses: {
            200: {
                description: "Successful operation",
            },
            404: {
                description: "Report not found",
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