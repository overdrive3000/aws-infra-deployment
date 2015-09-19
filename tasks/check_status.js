import { CloudFormation } from 'aws-sdk';
import config from '../config/aws_config';
import settings from '../config/settings';
import _ from 'underscore';


export default (stackID) => new Promise((resolve, reject) => {
  console.log("CHECK STATUS")
  let status = "";
  const cloudformation = new CloudFormation();

  let params = {
    StackName: stackID 
  }

  let interval = setInterval(
    () => {
        cloudformation.describeStacks(params, function(err, data){
          if (err) {
            console.log(err, err.stack);
            reject(err);
          } else {
            status = data.Stacks[0].StackStatus;
            console.log(status);
            if (status === "CREATE_COMPLETE") {
              console.log("Check complete!");
              resolve();
              clearInterval(interval);
            }
          }
        });
    }, 60000);
});
