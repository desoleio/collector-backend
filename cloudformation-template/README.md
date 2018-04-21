# Cloudformation template for Desole back-end deployment

This repository contains a Cloudformation template to deploy the Desole back-end (event collector and standard processing applications) into your AWS account.

## Prerequisites

* NPM 3
* An S3 Bucket for Deployment
* Optionally a Pinpoint (AWS Mobile Hub) Application ID
* AWS CLI (command line tools)

## Deploy using CloudFormation 

* Go to <https://console.aws.amazon.com/cloudformation/home>
* Click on `Create Stack`
* Select the `Specify an Amazon S3 template URL` option
* Use `https://desole-packaging.s3.amazonaws.com/releases/desole-0.0.1.yaml` as the template URL

## Deploying using AWS-CLI and CloudFormation

1. Install the dependencies
  ```bash
  npm install --no-optional
  ```
2. Package the template 
  ```bash
  npm run package --desole:bucket_name=<S3 Bucket Name>
  ```
3. Deploy the packaged template
  ```bash
  npm run test-deploy --desole:bucket_name=desole-upload-1 --desole:cloudformation_stack=<STACK NAME> --desole:pinpoint_id=<PINPOINT APP ID>
  ```

