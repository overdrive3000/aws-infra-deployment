import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { ElasticBeanstalk } from 'aws-sdk';
import _ from 'underscore';

export default (bucket) => new Promise((resolve, reject) => {
  console.log("create EB application version")
  const eb = new ElasticBeanstalk();

  let params = {
    ApplicationName: settings.application,
    VersionLabel: settings.appVersion,
    Description: "MyITCRM Application",
    SourceBundle: {
      S3Bucket: bucket,
      S3Key: "app.zip"
    }
  };

  eb.createApplicationVersion(params, function(err, data){
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      console.log("SUCESS: EB application version created");
      resolve(data);
    }
  });

});
