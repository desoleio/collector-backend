# Cloudformation template for Desole back-end deployment

This directory contains a Cloudformation template for the Desole collector API and standard publishers. Use this source code to create your own custom bundle for Desole backend.

To deploy using a ready-made template, check out the parent directory [README.md](../README.md)

## Prerequisites

* NPM 3 (the packaging system currently does not work with NPM5)
* An S3 Bucket for Deployment, in the same region where you would like to deploy Desole
* AWS CLI (command line tools), configured to use your account


## Deploying using AWS-CLI and CloudFormation

1. Install the dependencies
  ```bash
  npm install --production --no-optional
  ```
2. Package the template 
  ```bash
  npm run package --@desole/app:bucket_name=<S3 Bucket Name> --@desole/app:region=<AWS REGION>
  ```
3. Deploy the packaged template
  ```bash
  npm run deploy --@desole/app:cloudformation_stack=<STACK NAME> --@desole/app:region=<AWS REGION>
  ```

## Overriding other parameters

You can also override additional CloudFormation template parameters by using `-- --parameter-overrides <NAME>=<VALUE>` after the `deploy` command. Note the two `--` before the other parameters, this splits NPM params from the embedded command parameters. For example, to set the default event storage bucket encryption, use:

```bash
npm run deploy --desole:cloudformation_stack=<STACK NAME> --desole:region=<AWS REGION> -- --parameter-overrides BucketEncryption=AES256
```

For a detailed list of supported parameters, check out [`template.yaml`](template.yaml)


