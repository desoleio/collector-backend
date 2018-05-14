# Cloudformation template for Desole back-end deployment

This directory contains a Cloudformation template for the Desole collector API and standard publishers. Use this source code to create your own custom bundle for Desole backend.

To deploy using a ready-made template, check out the parent directory [README.md](../README.md)

## Prerequisites

* NPM 3 (the packaging system currently does not work with NPM5)
* An S3 Bucket for Deployment, in the same region where you would like to deploy Desole
* AWS CLI (command line tools), configured to use your account

## Deploying using AWS-CLI and CloudFormation

For a detailed list of supported parameters, check out [`template.yaml`](template.yaml)

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
  aws cloudformation deploy --template-file output.yaml --capabilities CAPABILITY_IAM --stack-name <STACK NAME> 
  ```

You can also override CloudFormation template parameters by using `--parameter-overrides <NAME>=<VALUE>` after the `deploy` command. For a detailed list of supported parameters, check out [`template.yaml`](template.yaml)
