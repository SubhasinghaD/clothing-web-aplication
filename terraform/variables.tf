variable "aws_region" {
  type        = string
  description = "AWS region"
  default     = "eu-north-1"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "key_pair_name" {
  type        = string
  description = "Existing EC2 key pair name"
  default     = "jenkins-key"
}

variable "instance_name" {
  type        = string
  description = "Name tag for the EC2 instance"
  default     = "project01-ec2"
}
