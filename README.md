cription

This is a nodejs script that performs tasks againts AWS in order to deploy two stacks. Both stacks have different approaches in the way how they are deployed, the main goal is to demostrate different ways to use the nodejs AWS SDK to interate with AWS resources.

## Instalation

To install the application you need to create a new EC2 instance in AWS following the below steps:

* Create an IAM role. As we perform a lot of operations let's select AdministratorAccess Policy for this role.
* Dowload the user-data.sh script from https://raw.githubusercontent.com/overdrive3000/aws-infra-deployment/master/user-data.sh
* Create a Linux Amazon AMI, t2.micro, by preference in a public subnet with public IP to make the access easier.
* Select the role created previously
* In the "configuration details" section. Go to advanced details select the option "As file" and upload the user-data.sh script.
* Select the appropiate security group to allow SSH access from Internet.
* Select a key pair to access the machine.

At this moment the AWS instance will be launching and self deploying with the nodejs application. Wait a couple of minutes to access the machine.

Access the machine and you have to see a folder named stack_deploy in your home folder. Furthermore nodejs must be installed as well, to test it run "node -v".

That's it the application is intalled, let's do some enviroment pre configurations before start using it.

## AWS preconfiguracion

Before to start using the provisioner script you must perform a couple of tasks in AWS.

1. Create a Key Pair and download the .pem file in your local machine, you'll use this .pem to access the Windows machine to be provisioned.
2. Please search the Windows 2008 Base AMI id for the AWS regions to user.

## App Configuration

The applications has three configuration files under the folder /config:

* aws_configi.js, contains configuration paramters for AWS, probably you won't touch this file.
* settings.js, Specific configuration parameters for the first stack, it will deploy 3 Windows machines, 3 IAM Users, Policies for each user. Each user will be able just Start or Stop their own machine.
* settings_task2.js, Specific configuration parameter for the second stack based on Elastic Beanstalk.

Those files are pretty self-described with comments and default values that will help the user to know what kind of information he has to put there.

## Running the application

To run the provision scripts you have to access to /home/ec2-user/stack_deploy, the script provides several mini task that you could excecute individualy, but indeed is designed to perform two main tasks.

### Task 1

To excecute the first Stack you have to run: 

```bash
npm run provision
```
It will deploy the following stack:

Brand new custom VPC to place all the resources from the stack, the VPC will contain two subnets in different AZ, two Security Groups, an Internet Gateway and Route Tables.

It will create an S3 bucket to store the CPUSTRES.zip application.

Three Windows 2008 AMI, all of them will get the CPUSTRES.zip application automatically from the S3 bucket.

An SNS topic with a custimizable email address to send alarm notifications.

A cloudwath alarm that will get fired if the CPU workload of the Windows machine reach 85% load or more.

Three IAM users with policies attached to them, they will be able to access the Amazon webconsole as well use the AWS API, but they are just allowed to Describe EC2 instances and Stop/Start just their assigned Windows machine.

An MySQL RDS instance, the task to create a database to enter the information about, users, instances and cpu workload is not complete.

### Task 2

To excecute the first Stack you have to run: 

```bash
npm run provision-task2
```

The second stack is a little bit simpler, the application will get MyITCRM from github to the local machine then it will deploy the application to AWS Elastic Beanstalk and lastly it will create an RDS instance ready to accept connections from the MyITCRM application.


