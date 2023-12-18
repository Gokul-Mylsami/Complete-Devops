provider "aws" {
  region = var.location
}

resource "aws_vpc" "vpc" {
  cidr_block = var.vpc-cidr
}

resource "aws_subnet" "subnet-1" {
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = var.subnet1-cidr
  availability_zone       = var.az-1
  map_public_ip_on_launch = true

  tags = {
    Name = "subnet-1"
  }
}

resource "aws_subnet" "subnet-2" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.subnet2-cidr
  availability_zone = var.az-2

  tags = {
    Name = "subnet-2"
  }

  map_public_ip_on_launch = true

}

resource "aws_internet_gateway" "my-igw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "my-igw"
  }
}

resource "aws_route_table" "my-rt" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my-igw.id
  }

  tags = {
    Name = "my-rt"
  }
}

resource "aws_route_table_association" "my-rt-assoc-1" {
  subnet_id      = aws_subnet.subnet-1.id
  route_table_id = aws_route_table.my-rt.id
}

resource "aws_route_table_association" "my-rt-assoc-2" {
  subnet_id      = aws_subnet.subnet-2.id
  route_table_id = aws_route_table.my-rt.id
}


module "efs" {
  source     = "./efs"
  vpc_id     = aws_vpc.vpc.id
  cidr       = var.vpc-cidr
  subnet_ids = [aws_subnet.subnet-1.id, aws_subnet.subnet-2.id]
}

module "eks" {
  source         = "./eks"
  vpc_id         = aws_vpc.vpc.id
  subnet_ids     = [aws_subnet.subnet-1.id, aws_subnet.subnet-2.id]
  sg_ids         = module.security-groups.security_group_public
  instance_types = var.instance_type
}

module "secret_manager" {
  source = "./secret-manager"
}

