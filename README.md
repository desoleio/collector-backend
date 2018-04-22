# Desole collector back-end

This repository contains the back-end components for Desole (event collector and standard processing applications), including a Cloudformation template you can use to deploy the Desole back-end into your AWS account.

## Prerequisites

* Optionally a Pinpoint (AWS Mobile Hub) Application ID

## Deploy using CloudFormation LaunchStack Buttons

Deployment is per region.

  Region | Launch
  -------|-------
  US East (N.Virginia) | [![Desole in us-east-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging.s3.amazonaws.com/releases/desole-0.0.1.yaml)
  EU Central (N.Virginia) | [![Desole in us-east-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-eu-central-1.s3.amazonaws.com/releases/desole-0.0.1.yaml)
  US West (N. California) | [![Desole in us-west-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-west-1.s3.amazonaws.com/releases/desole-0.0.1.yaml)
  Asia Pacific (Sydney) | [![Desole in ap-southeast-2](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-ap-southeast-2.s3.amazonaws.com/releases/desole-0.0.1.yaml)


## Deploy using CloudFormation 

* Go to <https://console.aws.amazon.com/cloudformation/home>
* Click on `Create Stack`
* Select the `Specify an Amazon S3 template URL` option
* Use `https://desole-packaging.s3.amazonaws.com/releases/desole-0.0.1.yaml` as the template URL

## Deploying a custom bundle

Check out the [cloudformation-template/README.md](cloudformation-template/README.md) for information on deploying your own custom bundle.
