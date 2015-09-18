import settings from '../config/settings';
import config from './aws_config';
import { S3 } from 'aws-sdk';
import _ from 'underscore';
import fs from 'fs';
import path from 'path';

export default () => new Promise((resolve, reject) => {
  const s3 = new S3();
  
  let params = {
    Bucket: settings.winfilesBucket
  };

  // Create Bucket
  s3.createBucket(params, function(err, data) {
    if (err) {
      reject(err);
    } else {
      console.log("S3 Bucket created!!!");
      console.log("Uploading winfiles...");

      fs.readdirSync(settings.winfilesPath).forEach( (file) => {
        fs.readFile( path.join(settings.winfilesPath, file), function(err, data){
          if (err) { reject(err); }
          var base64data = new Buffer(data, 'binary');
          let params = {
            Bucket: settings.winfilesBucket,
            Key: file,
            Body: base64data
          };
          s3.putObject(params, function(err, data){
            if (err) { reject(err); }
          });
        });
      });
      console.log(data);
      resolve(data);
    }
  });
});
