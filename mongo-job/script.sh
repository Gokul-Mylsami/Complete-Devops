#!/bin/sh

sleep 30

mongo --host $1 <<EOF
rs.initiate({_id: "rs0", version: 1, members:[{_id:0,host:"$1:27017"},{_id:1,host:"$2:27017"},{_id:2,host:"$3:27017" }]})
EOF

echo "Done"