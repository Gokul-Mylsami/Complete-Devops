variable "sg_ids" {
  type = string
}

variable "subnet_ids" {
  type = list(any)
}

variable "vpc_id" {
  type = string
}

variable "instance_types" {
  type = string
}
