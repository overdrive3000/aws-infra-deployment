import { CloudFormation } from 'aws-sdk';
import config from '../config/aws_config';
import settings from '../config/settings';
import _ from 'underscore';

export default (templateURL) => new Promise((resolve, reject) => {
  const cloudformation = new CloudFormation();
  
  let params = {
    StackName: settings.stackName,
    Capabilities: [
      'CAPABILITY_IAM'
    ],
    Parameters: [
      {
        ParameterKey: 'SubnetCIDR01',
        ParameterValue: settings.subnetCIDR01
      },
      {
        ParameterKey: 'SubnetCIDR02',
        ParameterValue: settings.subnetCIDR02
      },
      {
        ParameterKey: 'VPCCIDR',
        ParameterValue: settings.vpcCIDR
      },
      {
        ParameterKey: 'WindowsAMIId',
        ParameterValue: settings.windowsAMI
      },
      {
        ParameterKey: 'KeyPairName',
        ParameterValue: settings.keyPairName
      },
      {
        ParameterKey: 'WinfilesBucket',
        ParameterValue: settings.winfilesBucket
      },
      {
        ParameterKey: 'OperatorEMail',
        ParameterValue: settings.operatorEmail
      },
      {
        ParameterKey: 'Password01',
        ParameterValue: settings.password01
      },
      {
        ParameterKey: 'Password02',
        ParameterValue: settings.password02
      },
      {
        ParameterKey: 'Password03',
        ParameterValue: settings.password03
      },
      {
        ParameterKey: 'DBName',
        ParameterValue: settings.dbName
      },
      {
        ParameterKey: 'DBPassword',
        ParameterValue: settings.dbPassword
      },
      {
        ParameterKey: 'DBUser',
        ParameterValue: settings.dbUser
      },
      {
        ParameterKey: 'VPCCFTemplateURL',
        ParameterValue: `${templateURL}vpc.json`
      },
      {
        ParameterKey: 'EC2CFTemplateURL',
        ParameterValue: `${templateURL}ec2.json`
      },
      {
        ParameterKey: 'UsersCFTemplateURL',
        ParameterValue: `${templateURL}iam_users_groups.json`
      },
      {
        ParameterKey: 'DBCFTemplateURL',
        ParameterValue: `${templateURL}rds_mysql.json`
      }
    ],
    TemplateURL: `${templateURL}master.json`
  };

  cloudformation.createStack(params, function(err, data){
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      console.log(data);
      resolve(data);
    }
  });
});
