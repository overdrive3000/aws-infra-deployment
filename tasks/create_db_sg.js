import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { EC2 } from 'aws-sdk';


export default () => new Promise((resolve, reject) => {
  const ec2 = new EC2();

  let params = {
    Description: "Allow MySQL access",
    GroupName: "MySQLSG",
    VpcId: settings.vpcID
  };

  ec2.createSecurityGroup(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      resolve(data)
    }
  });
});
