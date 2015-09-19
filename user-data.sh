#!/bin/bash -v
yum update -y
su - ec2-user -c "ssh-keyscan -H github.com >> /home/ec2-user/.ssh/known_hosts"
yum -y install curl
yum -y install git
yum -y groupinstall "Development Tools"
su - ec2-user -c "curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash"
su - ec2-user -c "nvm install stable"
su - ec2-user -c "echo 'nvm use v4.0.0' >> /home/ec2-user/.bashrc"
su - ec2-user -c "git clone https://github.com/overdrive3000/aws-infra-deployment.git /home/ec2-user/stack_deploy"
su - ec2-user -c "cd /home/ec2-user/stack_deploy; npm install; cd"
