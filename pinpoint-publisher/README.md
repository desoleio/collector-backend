# Desole Pinpoint publisher


![](https://desole.io/images/pinpoint.png)

This publisher submits Desole events to AWS Pinpoint, where you can use Pinpoint analytics dashboards (formerly AWS Mobile Analytics) to drill down into various dimensions of the events, and create automated customer engagement campaigns based on Desole events -- for example, send everyone who received a particular error an e-mail.

To use this publisher, you'll need a Pinpoint (AWS Mobile Hub) Application ID. Create an app using the [AWS Pinpoint Console](https://console.aws.amazon.com/pinpoint/) or using `aws pinpoint create-app` from your command line. For example,

```bash
aws pinpoint create-app --create-application-request '{"Name":"desole"}' --query ApplicationResponse.Id --output text
```

To link existing Pinpoint users to Desole events, just make sure to supply the corresponding device ID in the collector client.

## Deploy the Pinpoint Publisher using CloudFormation 

  Region | Launch
  -------|-------
  US East (N.Virginia) | [![Pinpoint publisher in us-east-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-east-1.s3.amazonaws.com/1.0.0/@desole/pinpoint-publisher.yaml)
  EU Central (Frankfurt) | [![Pinpoint publisher in eu-central-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-eu-central-1.s3.amazonaws.com/1.0.0/@desole/pinpoint-publisher.yaml)
  US West (N. California) | [![Pinpoint publisher in us-west-1](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-us-west-1.s3.amazonaws.com/1.0.0/@desole/pinpoint-publisher.yaml)
  Asia Pacific (Sydney) | [![Pinpoint publisher in ap-southeast-2](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/create/review?stackName=desole&templateURL=https://desole-packaging-ap-southeast-2.s3.amazonaws.com/1.0.0/@desole/pinpoint-publisher.yaml)

## Deploy a custom bundle 

### Prerequisites

* NPM
* An S3 Bucket for Deployment, in the same region where you would like to deploy Desole
* AWS CLI (command line tools), configured to use your account

### Deployment process

1. Install the dependencies
  ```bash
  npm install
  ```
2. Prepare and pack your code
  ```bash
  npm run prepackage
  ```
3. Package the template 
  ```bash
  aws cloudformation package --template-file template.yaml --output-template-file output.yaml
  ```
4. Deploy the packaged template
  ```bash
  aws cloudformation deploy --template-file output.yaml --capabilities CAPABILITY_IAM --stack-name <STACK NAME> --parameter-overrides PinpointApplicationId=<APP ID> CollectorSNSTopic=<SNS TOPIC ARN>
  ```

For a detailed list of supported parameters, check out [`template.yaml`](template.yaml)

