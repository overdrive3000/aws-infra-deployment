import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { S3 } from 'aws-sdk';
import _ from 'underscore';
import fs from 'fs';
import { Repository } from 'git-cli';

export default () => new Promise((resolve, reject) => {
  
  const appPath = "/tmp/myitcrm";

  // Download source code from repo
  Repository.clone(settings.gitRepo, appPath, function(err, repo){
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      // Create conf.php file
      fs.createReadStream(`${appPath}/conf-default.php`).pipe(fs.createWriteStream(`${appPath}/conf.php`));
    }
  });

});
