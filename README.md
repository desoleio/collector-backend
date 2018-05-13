# Desole collector back-end

Desole is an error-tracking system you can install in your AWS account, with just a few clicks. It enables organisations to track application exceptions and errors without having to choose between the convenience of software-as-a-service and the security of a self-hosted solution. You fully control the data, so it is easy to enforce compliance, encryption and data security requirements. At the same time, Desole uses highly-scalable AWS resources that can easily handle massive traffic, and auto-size on demand, so you do not have to worry about operating costs or administration. Check out <https://desole.io> for more information.

![](https://desole.io/images/desole-arch-2.png)

This repository contains the back-end components for Desole: the event collector API and the standard publishers, including a Cloudformation template you can use to deploy the Desole back-end into your AWS account. Check out <https://desole.io> for more information on how to set up the client collectors.

## Deploy using the AWS Serverless App Repo

Head over to the [Desole App](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~Desole) on the AWS Serverless App repo, click `Deploy` and follow the wizard to configure the app.

## Deploy the standard app using CloudFormation 

The standard app includes the CloudWatch and S3 publishers.

  Region | Launch
  -------|-------
  US East (N.Virginia) | [![Desole in us-east-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-east-1.s3.amazonaws.com/1.0.0/@desole/app.yaml)
  EU Central (Frankfurt) | [![Desole in eu-central-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-eu-central-1.s3.amazonaws.com/1.0.0/@desole/app.yaml)
  US West (N. California) | [![Desole in us-west-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-west-1.s3.amazonaws.com/1.0.0/@desole/app.yaml)
  Asia Pacific (Sydney) | [![Desole in ap-southeast-2](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-ap-southeast-2.s3.amazonaws.com/1.0.0/@desole/app.yaml)

Check out the [app/README.md](app/README.md) for information on deploying your own custom bundle into other regions.

## Deploy the optional publishers

* Deploy the [ElasticSearch publisher](elasticsearch-publisher/README.md) to enable easy querying and searching
* Deploy the [PinPoint publisher](pinpoint-publisher/README.md) to enable automated engagement campaigns and dashboards to drill down into user demographics 
