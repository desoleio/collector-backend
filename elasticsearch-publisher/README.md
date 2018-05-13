# Desole ElasticSearch publisher


![](https://desole.io/images/elasticsearch.png)

This publisher submits Desole events to AWS ElasticSearch, where you can query and search them easily. The repository contains an example of a CloudFormation template which you can deploy with a single click, or modify to fit your needs.

## Deploy the ElasticSearch Publisher using CloudFormation 

The default template deploys a new AWS ElasticSearch domain on a t2.micro instance with a 10GB EBS volume capacity. This is good for small sites and for demonstration purposes, but it may be inadequate for high-traffic event collection. Check out the `Deploying Custom Bundle` section below to see how to deploy a modified template.


  Region | Launch
  -------|-------
  US East (N.Virginia) | [![Pinpoint publisher in us-east-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-east-1.s3.amazonaws.com/1.0.0/@desole/es-publisher.yaml)
  EU Central (Frankfurt) | [![Pinpoint publisher in eu-central-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-eu-central-1.s3.amazonaws.com/1.0.0/@desole/es-publisher.yaml)
  US West (N. California) | [![Pinpoint publisher in us-west-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-west-1.s3.amazonaws.com/1.0.0/@desole/es-publisher.yaml)
  Asia Pacific (Sydney) | [![Pinpoint publisher in ap-southeast-2](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-ap-southeast-2.s3.amazonaws.com/1.0.0/@desole/es-publisher.yaml)

## Deploy a custom bundle 

## Prerequisites

* NPM 3 (the packaging system currently does not work with NPM5)
* An S3 Bucket for Deployment, in the same region where you would like to deploy Desole
* AWS CLI (command line tools), configured to use your account

## Deployment process

Change the `template.yaml` to modify the ElasticSearch instance size, volume and other parameters. For more information, check out the [ElasticSearch Domain CloudFormation Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticsearch-domain.html).

1. Install the dependencies
  ```bash
  npm install --production --no-optional
  ```
2. Package the template 
  ```bash
  aws cloudformation package --template-file template.yaml --output-template-file output.yaml
  ```
3. Deploy the packaged template
  ```bash
  aws cloudformation deploy --template-file output.yaml --capabilities CAPABILITY_IAM --stack-name <STACK NAME> --parameter-overrides CollectorSNSTopic=<SNS TOPIC ARN>
  ```

For a detailed list of supported parameters, check out [`template.yaml`](template.yaml)



