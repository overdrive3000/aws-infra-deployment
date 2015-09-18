import settings from '../config/settings';
import config from '../config/aws_config';
import { RDS } from 'aws-sdk';
import _ from 'underscore';

let database = () => new Promise((resolve, reject) => {
  const rds = new RDS();

  let params = {
    DBInstanceIdentifier: "newdatabase2"
  }
  
  rds.describeDBInstances(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      reject(err);
    } else {
      resolve(data);
    }
  });
});

export async function getEndpointURL() {
  let endpoint = await database();
  console.log(endpoint.DBInstances[0].Endpoint.Address)
};

export async function getEndpointPort() {
  let endpoint = await database();
  console.log(endpoint.DBInstances[0].Endpoint.Port)
};

export default database;
