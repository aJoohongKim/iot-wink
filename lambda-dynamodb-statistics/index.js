'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "winkStatistics";

exports.handler = async (event) => {
    // TODO implement
    console.log(event.Records);
    const requestItems = buildRequestItems(event.Records);
    console.log(JSON.stringify(requestItems, null, 2));
    const requests = buildRequests(requestItems);

    return Promise.all(requests)
        .then(() => {
            const response = {
                statusCode: 200,
                body: `Delivered ${event.Records.length} records`,
            };
            return response;
        })
        .catch((e) => {
            const response = {
                statusCode: 500,
                body: e,
            };
            return response;
        });
};

function buildRequestItems(records) {
  return records.map((record) => {
    const json = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
    console.log(json);
    const item = JSON.parse(json);

    return {
      PutRequest: {
        Item: item,
      },
    };
  });
}

function buildRequests(requestItems) {
  const requests = [];

  while (requestItems.length > 0) {
    const request = batchWrite(requestItems.splice(0, 25));

    requests.push(request);
  }

  return requests;
}

function batchWrite(requestItems, attempt = 0) {
  const params = {
    RequestItems: {
      [tableName]: requestItems,
    },
  };

  let delay = 0;

  if (attempt > 0) {
    delay = 50 * Math.pow(2, attempt);
  }

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      dynamoDB.batchWrite(params).promise()
        .then(function(data) {
          if (data.UnprocessedItems.hasOwnProperty(tableName)) {
            return batchWrite(data.UnprocessedItems[tableName], attempt + 1);
          }
        })
        .then(resolve)
        .catch(reject);
    }, delay);
  });
}