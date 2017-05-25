export const get = (dynamoDB, event, context, callback) => {
     const params = {
        TableName: process.env.GARDEN_TABLE,
        Key: {
            garden: event.pathParameters.gardenId,
        },
    };
    // fetch garden from the database
    dynamoDB.get(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t fetch the garden.'));
            return;
        }

        // create a response
        console.error('result', result);
        const response = result.Item ? {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify(result.Item),
        } : {
            statusCode: 404
        };
        callback(null, response);
    });
};
