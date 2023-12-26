# list of all used commands

## mongodb repicaset setup
# composing replicaset up
docker-compose -f docker-compose.debug.yml up -d -V mongo1 mongo2

# composing containers
# -V -- remove unnamed volumes
docker-compose -f "./docker-compose.debug.yml" --env-file ".dev.env"  up --build -V -d mongo-express chatserver

# entering container
docker container exec -it mongo1 sh
mongosh

# mongosh commands
rs.initiate({ 
    _id: 'devReplicaSet',
    members: [ 
        {_id: 0, host: 'mongo1:27017'}, 
        {_id: 1, host: 'mongo2:27017'} 
    ]
})

use admin

db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
);
db.grantRolesToUser("admin", [ { role: "root", db: "admin" } ])

db.adminCommand( { listDatabases: 1 } )

db.system.users.find()

exit()

# sh commands

openssl rand -base64 756 > /data/configdb/key
chmod 400 /data/configdb/key

mongosh -u "admin" -p "admin" --authenticationDatabase "admin" --eval 'rs.status()'
docker container exec -it mongo1 mongosh --eval "db.system.users.find()"

# mongosh commands

use admin

db.createUser(
  {
    user: "reader",
    pwd: "reader",
    roles: [ { role: "readWrite", db: "cars" } ]
  }
);

# sh commands

mongosh -u "reader" -p "reader" --authenticationDatabase "admin"
mongosh -u "admin" -p "admin" --authenticationDatabase "admin"

# entering container
docker container exec -it chatserver sh

# seeding db from container `chatserver`
npx prisma db seed
