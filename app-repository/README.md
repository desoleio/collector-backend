#collector-backend

## deploy:

```
npm i --no-optional
aws cloudformation package --template-file template.yaml --output-template-file output.yaml --s3-bucket desole-upload-1
aws cloudformation deploy --template-file output.yaml --stack-name desole-3 --capabilities CAPABILITY_IAM --parameter-overrides CloudWatchNameSpace=DesoleEvents
```

## todo:

* repackage so linting doesn't confuse cloudformation
* add output to template.yaml so we have the endpoint
* CORS handling
* memory/timeout for lambda
* s3 options
  * encryption for storage
  * expiry

