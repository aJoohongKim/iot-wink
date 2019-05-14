api auth
API_KEY: string
API_VALUE: string

Add a pair of auth in queryString.
ex) 

"queryStringParameters": {
        "clientId": "client-id-1",
        "event_at": "2019-05-16%2018:11:00.000",
        process.env.API_KEY: process.env.API_VALUE,
        "limit": "10"
    },