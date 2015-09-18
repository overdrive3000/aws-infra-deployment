import settings from '../config/settings';
import config from '../config/aws_config';
import { RDS } from 'aws-sdk';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  const rds = new RDS();

  let params = {
    DBInstanceClass: "db.t2.micro",
    DBInstanceIdentifier: "newdatabase2",
    Engine: "MySQL",
    DBName: "elasticbean",
    MasterUserPassword: "thepassword",
    MasterUsername: "theuser",
    DBSubnetGroupName: "default-vpc-caa2aaa8",
    AllocatedStorage: 5,
    MultiAZ: false
  };

  rds.createDBInstance(params, function(err, data){
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      console.log(data);
      let params = {
        "DBInstanceIdentifier": "newdatabase2"
      };

      rds.waitFor('dBInstanceAvailable', params, function(err, data){
         if (err) { 
          console.log(err, err.stack);
          reject(err);
         } else {
          console.log(data);
          resolve(data);
         }
      });
    }
  });
});
