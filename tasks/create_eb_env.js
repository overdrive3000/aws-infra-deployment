import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { ElasticBeanstalk } from 'aws-sdk';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  console.log("Create EB environment");
  const eb = new ElasticBeanstalk();

  let params = {
    ApplicationName: settings.application,
    EnvironmentName: settings.environment,
    CNAMEPrefix: "myitcrm-prod",
    Description: "Production Environment",
    VersionLabel: settings.appVersion,
    SolutionStackName: "64bit Amazon Linux 2015.03 v2.0.0 running PHP 5.6"
  };

  eb.createEnvironment(params, function(err, data){
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      console.log("SUCESS: EB environment created");
      resolve(data);
    }
  });

});
