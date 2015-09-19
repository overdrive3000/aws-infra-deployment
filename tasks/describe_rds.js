import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { RDS } from 'aws-sdk';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  const rds = new RDS();

  let params = {
    DBInstanceIdentifier: settings.rdsID
  }
  
  rds.describeDBInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      resolve(data);
    }
  });
});
