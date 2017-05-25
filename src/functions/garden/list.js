export const getList = (dynamoDB, event, context, callback) => {
    const params = {
        TableName: process.env.GARDEN_TABLE,
    };
    // fetch all gardens from the database
    dynamoDB.scan(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t fetch the gardens.'));
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};
