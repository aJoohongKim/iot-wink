console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event, null, 2));
    
    if (event.path === '/statistics' && event.httpMethod === 'GET' && event.queryStringParameters[process.env.API_KEY] === process.env.API_VALUE) {
        const result = (err, res) => {
            console.log("In done", JSON.stringify(res, null, 2), err);
            callback(null, {
                "statusCode": err ? 400 : 200,
                "statusDescription": "HTTP OK",
                "isBase64Encoded": false,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(res, null, 2)
            });
        }
        const {limit, event_at, clientId, scanIndexForward} = event.queryStringParameters;
        const parsedLimit = parseInt(limit, 10);
        const decodedEvent_at = decodeURI(event_at);
        const parsedScanIndexForward = scanIndexForward.toLowerCase() === 'true' ? true : false;
        
        console.log(`parsedLimit=${parsedLimit} decodedEvent_at=${decodedEvent_at}`);
        return dynamo.query(
            {
                TableName: 'winkStatistics', 
                Limit: parsedLimit,
                ScanIndexForward : parsedScanIndexForward,
                KeyConditionExpression: 'clientId = :clientId and event_at > :event_at',
                ExpressionAttributeValues: {
                    ':clientId': clientId,
                    ':event_at': decodedEvent_at
                }
            }, result);
    } else {
        callback(null, {
                "statusCode": 404,
                "statusDescription": "NOT FOUND",
                "isBase64Encoded": false,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": "{}"
            });
    }
};