#!/bin/sh

sleep 30

mongo --host $1 <<EOF
rs.initiate({_id: "rs0", version: 1, members:[{_id:0,host:"$1:27017"},{_id:1,host:"$2:27017"},{_id:2,host:"$3:27017" }]})
db.createCollection("users")
db.users.insert({"name":"admin","role":"admin","email":"admin@avesair.com","phone":"9876543210","password" : "$2b$12$LoePoESVOisFl4KVokPQCOb0Jvnq59MXeq43IpJd821ZxbhHQVX6O"})
EOF

echo "Done"