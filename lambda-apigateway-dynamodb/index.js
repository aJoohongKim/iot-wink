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
    console.error('Received event:', JSON.stringify(event, null, 2));

    const result = (err, res) => {
        console.log("In done", JSON.stringify(res, null, 2), err);
        callback(null, {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(res),
            isBase64Encoded: false
        });
    };
    
    const {limit, event_at, clientId, scanIndexForward} = event.queryStringParameters;
    const parsedLimit = parseInt(limit, 10);
    let parsedScanIndexForward = scanIndexForward.toLowerCase() === 'true' ? true : false;
    // const decodedEvent_at = decodeURI(event_at);
    const keyConditionExpression = event_at ?  'clientId = :clientId and event_at > :event_at' : 'clientId = :clientId';
    const expressionAttributeValues = {
        ':clientId': clientId
    };
    
    // if event_at is empty, get latest records
    if (event_at) {
        expressionAttributeValues[':event_at'] = decodeURI(event_at);
    } else {
        parsedScanIndexForward = false;
    }
    
    return dynamo.query(
        {
            TableName: 'winkStatistics', 
            Limit: parsedLimit,
            ScanIndexForward : parsedScanIndexForward,
            // KeyConditionExpression: 'clientId = :clientId and event_at > :event_at',
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues:expressionAttributeValues
            // ExpressionAttributeValues: {
            //     ':clientId': clientId
            //     // ':clientId': clientId,
            //     // ':event_at': decodedEvent_at
            // }
        }, result);
    //working response api gateway very kin to format
    // callback(null, {
    //     statusCode: 200,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({}),
    //     isBase64Encoded: false
    // });
};
