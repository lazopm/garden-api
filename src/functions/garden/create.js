import uuid from 'uuid/v1';

export const create = (dynamoDB, event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    const Item = {
        ...data,
        id: uuid(),
        created: timestamp,
        updated: timestamp,
    };
    const params = {
        TableName: process.env.GARDEN_TABLE,
        Item,
    };
    dynamoDB.put(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t create the garden.'));
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
