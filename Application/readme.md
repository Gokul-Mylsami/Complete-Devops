rs.initiate({\_id: "rs0",
version: 1,
members:[
{_id:0,host:"mongodb-0.mongodb-service.default.svc.cluster.local:27017"},
{_id:1,host:"mongodb-1.mongodb-service.default.svc.cluster.local:27017"},
{_id:2,host:"mongodb-2.mongodb-service.default.svc.cluster.local:27017"}
]})

connection url => mongodb://mongodb-0.mongodb-service.default.svc.cluster.local:27017,mongodb-1.mongodb-service.default.svc.cluster.local:27017,mongodb-2.mongodb-service.default.svc.cluster.local:27017/?replicaSet=rs0

helm repo add aws-efs-csi-driver https://kubernetes-sigs.github.io/aws-efs-csi-driver/
helm upgrade --install aws-efs-csi-driver --namespace kube-system aws-efs-csi-driver/aws-efs-csi-driver

helm install prometheus-operator prometheus-community/kube-prometheus-stack -n prometheus -f values.yaml

ingress:

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/aws/deploy.yaml
