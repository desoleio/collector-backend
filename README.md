# Desole collector back-end

![](https://desole.io/images/desole-arch-2.png)

This repository contains the back-end components for Desole: the event collector API and the standard publishers, including a Cloudformation template you can use to deploy the Desole back-end into your AWS account.

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
