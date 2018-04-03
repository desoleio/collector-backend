'use strict';
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const BUCKET_ARN = process.env.BUCKET_ARN,
    BUCKET_KEY = 'Desole';

exports.handler = (event, context, callback) => {

    let receivedDesole = event.Records[0].Sns;

    let params = {
        Bucket: BUCKET_ARN,
        Key: BUCKET_KEY,
        ContentType: 'application/json',
        Body: JSON.stringify(receivedDesole)
    }

    s3.putObject(params).promise()
        .then(response => {
            console.log(response);
            callback(null, response);
        }).catch(err => {
            callback(err);
        });
};