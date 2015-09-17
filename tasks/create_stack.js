import { CloudFormation } from 'aws-sdk';
import config from './aws_config';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  console.log('create ec2 stack');
  
  const cloudformation = new CloudFormation();
  var subnet = "";
  let params = {
    StackName: 'TestVPC'
  };

  cloudformation.describeStacks(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return;
    }
    let stacks = data.Stacks;
    _.forEach(stacks, (stack) => {
      _.forEach(stack.Outputs, (outputs) => {
        if (outputs.OutputKey === "Subnet01") subnet = outputs.OutputValue;
      });
    });
    console.log(subnet);
    return(subnet);
  });

  console.log(subnet);

  /*
  let createParams = {
    StackName: 'TestVPC',
    Parameters: [
      {
        ParameterKey: "SubnetID",
        ParameterValue: subnet
      }
    ],
    TemplateURL: "https://s3-us-west-2.amazonaws.com/cf-templates-r95ig3763f07-us-west-2/ec2.json"
  };

  cloudformation.createStack(createParams, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return;
    }

    let stacks = data.stack;
    console.log(stacks);
  });*/
});
