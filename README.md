# Desole collector back-end

![Desole Logo](https://www.desole.io/images/desole-logo.png)

This repository contains the back-end components for Desole: the event collector and standard processing applications, including a Cloudformation template you can use to deploy the Desole back-end into your AWS account.

## Prerequisites

* Optionally a Pinpoint (AWS Mobile Hub) Application ID, if you would like to log events to Pinpoint as well for easy dashboards. Create an app using the [AWS Pinpoint Console](https://console.aws.amazon.com/pinpoint/) or using `aws pinpoint create-app` from your command line.

## Deploy using CloudFormation LaunchStack Buttons

  Region | Launch
  -------|-------
  US East (N.Virginia) | [![Desole in us-east-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-east-1.s3.amazonaws.com/1.0.0/desole.yaml)
  EU Central (Frankfurt) | [![Desole in eu-central-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-eu-central-1.s3.amazonaws.com/1.0.0/desole.yaml)
  US West (N. California) | [![Desole in us-west-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-west-1.s3.amazonaws.com/1.0.0/desole.yaml)
  Asia Pacific (Sydney) | [![Desole in ap-southeast-2](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-ap-southeast-2.s3.amazonaws.com/1.0.0/desole.yaml)


## Deploy using CloudFormation 

* Go to <https://console.aws.amazon.com/cloudformation/home>
* Click on `Create Stack`
* Select the `Specify an Amazon S3 template URL` option
* Use one of the following URLS depending on your region as the template URL:
  * `us-east-1`: <https://desole-packaging-us-east-1.s3.amazonaws.com/1.0.0/desole.yaml>
  * `eu-central-1`: <https://desole-packaging-eu-central-1.s3.amazonaws.com/1.0.0/desole.yaml>
  * `us-west-1`: <https://desole-packaging-us-west-1.s3.amazonaws.com/1.0.0/desole.yaml>
  * `ap-southeast-2`: <https://desole-packaging-ap-southeast-2.s3.amazonaws.com/1.0.0/desole.yaml>

For other regions, check out the custom bundle deployment below.

## Deploying a custom bundle

Check out the [cloudformation-template/README.md](cloudformation-template/README.md) for information on deploying your own custom bundle.
