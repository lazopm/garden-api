export const post = (dynamoDB, event, context, callback) => {
    const data = JSON.parse(event.body);

    const Item = {
        ...data,
        garden: event.pathParameters.gardenId,
        ts: new Date().getTime(),
    };
    const params = {
        TableName: process.env.SENSOR_DATA_TABLE,
        Item,
    };
    dynamoDB.put(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t post sensor data.'));
            return;
        }
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify(Item),
        };
        callback(null, response);
    });
};
