output "endpoint" {
  value = aws_eks_cluster.eks.endpoint
}

output "id" {
  value = aws_eks_cluster.eks.id
}

output "certificate_authority" {
  value = aws_eks_cluster.eks.certificate_authority
}

output "node_group_name" {
  value = aws_eks_node_group.backend.arn
}
