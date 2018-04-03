'use strict';
const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const TOPIC_ARN = process.env.TOPIC_ARN;

exports.handler = (event, context, callback) => {
    console.log(event.body);
    let subject = 'Desole';

    let params = {
        Message: JSON.stringify(event.body),
        TopicArn: TOPIC_ARN,
        Subject: subject
      };
    sns.publish(params).promise()
      .then(response => {
        console.log(response);
        reply(200, event, callback);
      }).catch(err => {
        console.log(err);
        reply(400, event, callback);
      });
};

function reply(statusCode, event, callback){
    callback(null, { 
        statusCode: statusCode, 
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' } 
    });
}