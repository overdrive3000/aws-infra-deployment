import { CloudFormation } from 'aws-sdk';
import config from './aws_config';

export default () => new Promise((resolve, reject) => {
  console.log('Listing all the stacks');

  const cloudformation = new CloudFormation();
  let params = {
    StackStatusFilter: [ 'CREATE_COMPLETE' ]
  };

  cloudformation.listStacks(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);
  });
});
