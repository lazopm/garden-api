export const hello = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'ring ring ring banana phone',
            input: event,
        }),
    };

    callback(null, response);
};
