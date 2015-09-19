# Description

This is a nodejs script that performs tasks againts AWS in order to deploy two stacks. Both stacks have different approaches in the way how they are deployed, the main goal is to demostrate different ways to use the nodejs AWS SDK to interate with AWS resources.

## Instalation

To install the application you need to create a new EC2 instance in AWS following the below steps:

* Create an IAM role. As we perform a lot of operations let's select AdministratorAccess Policy for this role.
* Create a Linux Amazon AMI, t2.micro, by preference in a public subnet with public IP to make the access easier.
* Select the appropiate security group to allow SSH access from Internet.
* Dowload the user-data.sh script from

