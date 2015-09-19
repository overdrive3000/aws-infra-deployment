import { CloudFormation } from 'aws-sdk';
import config from '../config/aws_config';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  console.log('Describe users stack');

  const cloudformation = new CloudFormation();
  let params = {
    StackName: 'users'
  };

  cloudformation.describeStacks(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        return;
      }
      let stacks = data.Stacks;

      _.forEach(stacks, (stack) => {
        console.log(stack);
      });
  });
});
