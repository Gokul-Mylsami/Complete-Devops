resource "aws_security_group" "my-eks-efs-sg" {
  name        = "my-eks-efs-sg"
  description = "Allow inbound traffic from EKS cluster"
  vpc_id      = var.vpc_id
  ingress {
    description = "Allow inbound NFS traffic from EKS cluster"
    from_port   = 2049
    to_port     = 2049
    protocol    = "tcp"
    cidr_blocks = [var.cidr]
  }
}

resource "aws_efs_file_system" "efs-1" {
  creation_token = "eks-efs-1"
  encrypted      = true

  tags = {
    Name = "eks-efs-1"
  }
}

resource "aws_efs_mount_target" "efs-1-mount" {
  count           = 2
  subnet_id       = element(var.subnet_ids, count.index)
  security_groups = [aws_security_group.my-eks-efs-sg.id]
  file_system_id  = aws_efs_file_system.efs-1.id
}

resource "aws_efs_file_system" "efs-2" {
  creation_token = "eks-efs-2"
  encrypted      = true
  tags = {
    Name = "eks-efs-2"
  }
}

resource "aws_efs_mount_target" "efs-2-mount" {
  count           = 2
  subnet_id       = element(var.subnet_ids, count.index)
  security_groups = [aws_security_group.my-eks-efs-sg.id]
  file_system_id  = aws_efs_file_system.efs-2.id
}


resource "aws_efs_file_system" "efs-3" {
  creation_token = "eks-efs-3"
  encrypted      = true
  tags = {
    Name = "eks-efs-3"
  }
}

resource "aws_efs_mount_target" "efs-3-mount" {
  count           = 2
  subnet_id       = element(var.subnet_ids, count.index)
  security_groups = [aws_security_group.my-eks-efs-sg.id]
  file_system_id  = aws_efs_file_system.efs-3.id
}
