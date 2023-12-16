variable "vpc_id" {
  type = string
}

variable "cidr" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}
