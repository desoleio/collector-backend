# Desole collector back-end

This repository contains the back-end components for Desole (event collector and standard processing applications), including a Cloudformation template you can use to deploy the Desole back-end into your AWS account.

## Prerequisites

* Optionally a Pinpoint (AWS Mobile Hub) Application ID

## Deploy using CloudFormation 

* Go to <https://console.aws.amazon.com/cloudformation/home>
* Click on `Create Stack`
* Select the `Specify an Amazon S3 template URL` option
* Use `https://desole-packaging.s3.amazonaws.com/releases/desole-0.0.1.yaml` as the template URL

## Deploying a custom bundle

Check out the [cloudformation-template/README.md](cloudformation-template/README.md) for information on deploying your own custom bundle.
