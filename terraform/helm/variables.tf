variable "aws_eks_cluster_eks_endpoint" {
  type = string
}

variable "aws_eks_cluster_eks_certificate_authority" {
  type = list(any)
}

variable "aws_eks_cluster_id" {
  type = string
}
