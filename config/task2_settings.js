import path from 'path';

const timestamp = new Date().getTime();

const projectRoot         = path.dirname(__dirname);

// Elastic Beanstalk Configuration
const ebBucketName      = `myitcrm-${timestamp}`; // Bucket name where application will be stored
const gitRepo           = 'https://github.com/MyITCRM/myitcrm1.git'; // MyITCRM github repo

export default {
  ebBucketName: ebBucketName,
  gitRepo:      gitRepo
}
