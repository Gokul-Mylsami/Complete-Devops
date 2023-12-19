provider "helm" {
  kubernetes {
    host                   = var.aws_eks_cluster_eks_endpoint
    cluster_ca_certificate = base64decode(var.aws_eks_cluster_eks_certificate_authority[0].data)
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      args        = ["eks", "get-token", "--cluster-name", var.aws_eks_cluster_id]
      command     = "aws"
    }
  }
}

resource "helm_release" "argocd" {
  name = "argocd"

  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  create_namespace = true
  version          = "5.51.6"

}








# // install efs csi driver
# resource "helm_release" "efs_csi" {
#   name       = "efs-csi-driver"
#   repository = "https://kubernetes-sigs.github.io/aws-efs-csi-driver/"
#   chart      = "aws-efs-csi-driver"
#   namespace  = "kube-system"

# }

# resource "helm_release" "nginx_ingress" {
#   name             = "nginx-ingress"
#   repository       = "https://kubernetes.github.io/ingress-nginx"
#   chart            = "ingress-nginx"
#   namespace        = "ingress-nginx"
#   create_namespace = true
# }

# resource "helm_release" "external-secrets" {
#   name             = "external-secrets"
#   repository       = "https://charts.external-secrets.io"
#   chart            = "external-secrets"
#   namespace        = "external-secrets"
#   create_namespace = true
#   set {
#     name  = "installCRDs"
#     value = "true"
#   }
# }
