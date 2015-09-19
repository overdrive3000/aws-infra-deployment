import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { RDS } from 'aws-sdk';
import { EC2 } from 'aws-sdk';
import _ from 'underscore';

export default (securitygroup) => new Promise((resolve, reject) => {
  const rds = new RDS();

  let params = {
    DBInstanceClass: "db.t2.micro",
    DBInstanceIdentifier: settings.rdsID,
    Engine: "MySQL",
    DBName: settings.dbName,
    MasterUserPassword: settings.dbPasword,
    MasterUsername: settings.dbUser,
    AllocatedStorage: settings.dbSize,
    DBSubnetGroupName: "dbdefault",
    VpcSecurityGroupIds: [ securitygroup ],
    MultiAZ: false
  };

  rds.createDBInstance(params, function(err, data){
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      console.log("NOTICE: Please by patient, RDS Instance takes about 10 minutes to be created");
      const ec2 = new EC2();
      let params2 = {
        CidrIp: "0.0.0.0/0",
        FromPort: "3389",
        GroupId: securitygroup,
        ToPort: "3389",
        IpProtocol: "tcp"
      };
      ec2.authorizeSecurityGroupIngress(params2, function(err, data){
        if (err) {
          console.log(err, err.stack);
          reject(err);
        }
      });

      let params = {
        DBInstanceIdentifier: settings.rdsID
      };

      rds.waitFor('dBInstanceAvailable', params, function(err, data){
         if (err) { 
          console.log(err, err.stack);
          reject(err);
         } else {
          console.log("SUCESS: RDS database is now ready to use");
          resolve(data);
         }
      });
    }
  });
});
