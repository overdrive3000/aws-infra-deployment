import path from 'path';

const timestamp = new Date().getTime();

const projectRoot         = path.dirname(__dirname);

// Elastic Beanstalk Configuration
const ebBucketName      = `myitcrm-${timestamp}`; // Bucket name where application will be stored
const gitRepo           = 'https://github.com/MyITCRM/myitcrm1.git'; // MyITCRM github repo
const application       = 'myitcrmV1'; // Name of the beanstalk application
const environment       = 'testing'; // Name of the beanstalk environment
const appVersion        = 'firstVersion'; // Name of the application version in beanstalk

// Database configuration
const rdsID             = 'myitcrm'; // RDS Identifier
const dbName            = 'myitcrmdb'; // Database Name
const dbUser            = 'myitcrm'; // Database User
const dbPasword         = 'verylongpassword'; // Database Password
const dbSize            = 5; // Database allocated size
const subnetID          = ['subnet-816402bb', 'subnet-50d36827'] // List with subnets id for the aws VPC
const vpcID             = "vpc-2f6bf44a"; // VPC ID

export default {
  ebBucketName: ebBucketName,
  gitRepo:      gitRepo,
  application:  application,
  environment:  environment,
  appVersion:   appVersion,
  rdsID:        rdsID,
  dbName:       dbName,
  dbUser:       dbUser,
  dbPasword:    dbPasword,
  dbSize:       dbSize,
  subnetID:     subnetID,
  vpcID:        vpcID
}
