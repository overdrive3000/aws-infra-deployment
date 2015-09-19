import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { S3 } from 'aws-sdk';
import _ from 'underscore';

export default () => new Promise((resolve, reject) => {
  console.log("Create EB Bucket");
  const s3 = new S3();
  
  let params = {
    Bucket: settings.ebBucketName
  };

  // Create Bucket
  s3.createBucket(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      console.log("SUCESS: Bucket created");
      resolve(data);
    }
  });
});
