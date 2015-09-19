import settings from '../config/task2_settings';
import config from '../config/aws_config';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import { Repository } from 'git-cli';
import archiver from 'archiver';

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
      const output = fs.createWriteStream("/tmp/app.zip");
      const zip = archiver.create("zip");

      output.on('finish', function() {
        console.log(zip.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        const s3 = new S3();
        fs.readFile(("/tmp/app.zip"), function(err, data) {
          console.log("Reading file app.zip...");
          if (err) { 
            console.log(err, err.stack);
            reject(err); 
          }
          var base64data = new Buffer(data, 'binary');
          let params = {
            Bucket: "myitcrm-1442639250876",
            Key: "app.zip",
            Body: base64data
          };
          s3.putObject(params, function(err, data){
            if (err) {
              console.log(err, err.stack);
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      });
      zip.on('error', function(err) {
        reject(err);
      });
      zip.pipe(output);
      zip.bulk([
        { expand: true, cwd: appPath, src: ['**/*'] }
      ]);
      zip.finalize();
    }
  });

});
