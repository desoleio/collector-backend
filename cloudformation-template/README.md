# Cloudformation template for Desole back-end deployment

This directory contains a Cloudformation template for the Desole back-end (event collector and standard processing applications). Use this source code to create your own custom bundle for Desole backend.

To deploy using a ready-made template, check out the parent directory [README.md](../README.md)

## Prerequisites

* NPM 3
* An S3 Bucket for Deployment
* Optionally a Pinpoint (AWS Mobile Hub) Application ID
* AWS CLI (command line tools)

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

