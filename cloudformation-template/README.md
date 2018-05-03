# Cloudformation template for Desole back-end deployment

This directory contains a Cloudformation template for the Desole back-end (event collector and standard processing applications). Use this source code to create your own custom bundle for Desole backend.

To deploy using a ready-made template, check out the parent directory [README.md](../README.md)

## Prerequisites

* NPM 3
* An S3 Bucket for Deployment, in the same region where you would like to deploy Desole
* AWS CLI (command line tools), configured to use your account
* Optionally a Pinpoint (AWS Mobile Hub) Application ID, if you would like to log events to Pinpoint as well for easy dashboards. Create an app using the [AWS Pinpoint Console](https://console.aws.amazon.com/pinpoint/) or using `aws pinpoint create-app` from your command line.

## Deploying using AWS-CLI and CloudFormation

1. Install the dependencies
  ```bash
  npm install --no-optional
  ```
2. Package the template 
  ```bash
  npm run package --desole:bucket_name=<S3 Bucket Name> --desole:region=<AWS REGION>
  ```
3. Deploy the packaged template
  ```bash
  npm run deploy --desole:cloudformation_stack=<STACK NAME> --desole:pinpoint_id=<PINPOINT APP ID>  --desole:region=<AWS REGION>
  ```
  You can supply overrides for cloudformation parameters using `-- --parameter-overrides` (note the initial `--`), for example:
  ```bash
  npm run deploy -- --parameter-overrides BucketEncryptionAlgorithm=AES256
  ```

