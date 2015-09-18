import { CloudFormation } from 'aws-sdk';
import config from './aws_config';
import settings from '../config/settings';
import _ from 'underscore';
import sleep from 'sleep';
import async from 'async';


export default (stackID) => new Promise((resolve, reject) => {
  console.log("CHECK STATUS")
  let status = "";
  const cloudformation = new CloudFormation();

  let params = {
    StackName: stackID 
  }

  async.doUntil( 
    function() {cloudformation.describeStacks(params, function(err, data){
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        status = data.Stacks[0].StackStatus;
        console.log(status);
      }
    })},
    function() {return (status !== "CREATE_COMPLETE"); },
    function(err){
      if (err) {
        console.log(err, err.stack)
        reject(err);
      } else {
        console.log("BLAAA");
        resolve();
      }
    }
  )
});
