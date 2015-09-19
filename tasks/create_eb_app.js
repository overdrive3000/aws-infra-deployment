import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { ElasticBeanstalk } from 'aws-sdk';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  console.log("Create EB app");
  const eb = new ElasticBeanstalk();

  let params = {
    ApplicationName: settings.application,
    Description: "MyITCRM Application"
  }

  eb.createApplication(params, function(err, data){
    if (err) {
      reject(err);
    } else {
      console.log("SUCESS: EB application created");
      resolve(data);
    }
  });

});
