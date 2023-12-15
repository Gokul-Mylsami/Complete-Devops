variable "location" {
  default = "us-east-1"
}

variable "ami" {
  default = "ami-0c7217cdde317cfec"
}

variable "instance_type" {
  default = "m5.large"
}

variable "vpc-cidr" {
  default = "10.0.0.0/16"
}

variable "subnet1-cidr" {
  default = "10.0.1.0/24"
}

variable "subnet2-cidr" {
  default = "10.0.3.0/24"
}

variable "az-1" {
  default = "us-east-1a"
}

variable "az-2" {
  default = "us-east-1b"
}
