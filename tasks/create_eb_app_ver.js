import settings from '../config/settings';
import config from '../config/aws_config';
import { ElasticBeanstalk } from 'aws-sdk';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  const eb = new ElasticBeanstalk();

  let params = {
    ApplicationName: "myitcrm2015",
    VersionLabel: "NewVersion",
    Description: "Fixed Application",
    SourceBundle: {
      S3Bucket: "overshared",
      S3Key: "thekey/newversion.zip"
    }
  };

  eb.createApplicationVersion(params, function(err, data){
    if (err) {
      reject(err);
    } else {
      console.log(data);
      resolve(data);
    }
  });

});
