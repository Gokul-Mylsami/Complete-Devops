resource "aws_secretsmanager_secret" "my-eks-secret" {
  name = "my-eks-secret"
}

resource "aws_secretsmanager_secret_version" "my-eks-secret-version" {
  secret_id = aws_secretsmanager_secret.my-eks-secret.id
  secret_string = jsonencode({
    EMAIL_USERNAME = "avesairbooking@gmail.com"
    EMAIL_PASSWORD = "hyxljjrhdndlhkkg",
    JWT_SECRET     = "avesair123432",
    SLACK_URL      = "https://hooks.slack.com/services/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",
    MONGO_URL      = "mongodb://mongodb-0.mongodb-service.default.svc.cluster.local:27017,mongodb-1.mongodb-service.default.svc.cluster.local:27017,mongodb-2.mongodb-service.default.svc.cluster.local:27017/?replicaSet=rs0"
  })
}
