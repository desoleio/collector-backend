#collector-backend

## deploy:

```
npm i --no-optional
find ./node_modules/ -exec touch '{}' \; 
aws cloudformation package --template-file template.yaml --output-template-file output.yaml --s3-bucket desole-upload-1
aws cloudformation deploy --template-file output.yaml --stack-name desole-3 --capabilities CAPABILITY_IAM --parameter-overrides CloudWatchNameSpace=DesoleEvents PinpointApplicationId=16ff1586be31415a927d1ee3e9ee0608
```


