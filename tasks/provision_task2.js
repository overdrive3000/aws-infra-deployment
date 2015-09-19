import createS3 from './create_eb_bucket';
import uploadBundle from './upload_bundle';
import createApp from './create_eb_app' ;
import createVersion from './create_eb_app_ver';
import createEnvironment from './create_eb_env';
import createDatabase from './create_rds';
import describeDatabase from './describe_rds';
import createDBSubnet from './create_db_subnet';
import createDBSG from './create_db_sg';
import settings from '../config/task2_settings';

export default async () => {
  // EB related tasks
  let s3          = await createS3();
  let bucket      = s3.Location.slice(1);
  let bundle      = await uploadBundle(bucket);
  let application = await createApp();
  let version     = await createVersion(bucket);
  let environment = await createEnvironment();
  console.log("\n\n\n");
  console.log("The application job was sent, please wait a while to access the application");

  // RDS related tasks
  let dbsubnet  = await createDBSubnet();
  let dbsg      = await createDBSG();
  let database  = await createDatabase(dbsg.GroupId);
  let endpoint  = await describeDatabase();
  console.log("\n\n\n");
  console.log("Your application is almost ready");
  console.log("Please go to: ");
  console.log(`https://${environment.CNAME}/install2/`);
  console.log("Use the following information to complete the app configuration");
  console.log(`Database: ${settings.dbName}`);
  console.log(`Username: ${settings.dbUser}`);
  console.log(`Database Password: ${settings.dbPasword}`);
  console.log(`Database host: ${endpoint.DBInstances[0].Endpoint.Address}`);
}

