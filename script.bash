helm upgrade --install aws-efs-csi-driver --namespace kube-system aws-efs-csi-driver/aws-efs-csi-driver

helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

helm install external-secrets \
  external-secrets/external-secrets \
    --namespace external-secrets \
    --create-namespace \
    --set installCRDs=true

eksctl utils associate-iam-oidc-provider --cluster=my-eks --approve
read SECRET_ARN

IAM_POLICY_ARN=$(aws iam create-policy --policy-name eks-external-secrets-reader --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:DescribeSecret",
        "secretsmanager:GetSecretValue"
      ],
      "Resource": ["'${SECRET_ARN}'"]
    }
  ]
}' | jq -r .Policy.Arn)

eksctl create iamserviceaccount \
    --name external-secrets-irsa \
    --namespace default \
    --cluster my-eks \
    --role-name "external-secrets-irsa-role" \
    --attach-policy-arn $IAM_POLICY_ARN \
    --approve \
    --override-existing-serviceaccounts