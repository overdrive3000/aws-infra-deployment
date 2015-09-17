import { config, Credentials } from 'aws-sdk';

config.region = 'us-west-2';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

config.credentials = new Credentials(AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY);

export default config;
