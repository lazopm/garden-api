export const get = (dynamoDB, event, context, callback) => {
    const params = {
        TableName: process.env.SENSOR_DATA_TABLE,
        KeyConditionExpression: 'garden = :gardenId and ts <= :timestamp',
        FilterExpression: 'sensorType = :sensorType',
        ExpressionAttributeValues: {
            ':gardenId': event.pathParameters.gardenId,
            ':sensorType': event.pathParameters.sensorType,
            ':timestamp': new Date().getTime(),
        },
    };
    // fetch garden from the database
    dynamoDB.query(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            console.log(params);
            callback(new Error('Couldn\'t fetch sensor data.'));
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
