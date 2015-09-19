import settings from '../config/settings';
import config from '../config/aws_config';
import { ElasticBeanstalk } from 'aws-sdk';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  const eb = new ElasticBeanstalk();

  let params = {
    ApplicationName: "myitcrm2015",
    EnvironmentName: "production",
    CNAMEPrefix: "myitcrm-prod",
    Description: "Production Environment",
    VersionLabel: "FirstVersion",
    SolutionStackName: "64bit Amazon Linux 2015.03 v2.0.0 running PHP 5.6"
  };

  eb.createEnvironment(params, function(err, data){
    if (err) {
      reject(err);
    } else {
      console.log(data);
      resolve(data);
    }
  });

});
