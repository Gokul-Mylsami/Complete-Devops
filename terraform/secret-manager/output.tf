output "secret_arn" {
  value = aws_secretsmanager_secret.my-eks-secret.arn
}
