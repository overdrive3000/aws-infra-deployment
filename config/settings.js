import path from 'path';

const timestamp = new Date().getTime();

const projectRoot         = path.dirname(__dirname);

// Basic configuration
const templateBucketName  = `template-${timestamp}`;
const templatePath        = path.join(projectRoot, 'templates');
const winfilesBucket      = `winfiles-${timestamp}`;
const winfilesPath        = path.join(projectRoot, 'files');
const stackName           = 'TheStack8'; // Stack Name

// VPC and network configuration
const subnetCIDR01        = '172.17.1.0/24'; // CIDR for Public Subnet 01
const subnetCIDR02        = '172.17.2.0/24'; // CIDR for Public Subnet 02
const vpcCIDR             = '172.17.0.0/16'; // CIDR for the VPC

// EC2 instance configuration
const windowsAMI          = 'ami-4dbcb67d'; // Windows 2008 Base AMI
const keyPairName         = 'windows'; // Key Pair name to use on Windows AMIs
const operatorEmail       = 'linuxven@gmail.com'; // Email to send notification alarms

// IAM users configuration
const password01          = 'therealpasswor'; // AWS console password for User 01
const password02          = 'therealpasswor'; // AWS console password for User 02
const password03          = 'therealpasswor'; // AWS console password for User 03

// RDS database configuration
const dbName              = 'stackdb'; // Database Name
const dbPassword          = 'nonsecure-password'; // Database Password
const dbUser              = 'stackuser'; // Database User


export default {
  templateBucketName: templateBucketName,
  templatePath:       templatePath,
  stackName:          stackName,
  winfilesBucket:     winfilesBucket,
  winfilesPath:       winfilesPath,
  subnetCIDR01:       subnetCIDR01,
  subnetCIDR02:       subnetCIDR02,
  vpcCIDR:            vpcCIDR,
  windowsAMI:         windowsAMI,
  keyPairName:        keyPairName,
  operatorEmail:      operatorEmail,
  password01:         password01,
  password02:         password02,
  password03:         password03,
  dbName:             dbName,
  dbPassword:         dbPassword,
  dbUser:             dbUser
}
