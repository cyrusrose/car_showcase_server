# list of all used commands

# composing containers
# -V -- remove unnamed volumes
docker-compose -f "./docker-compose.debug.yml" --env-file ".\docker.env"  up --build -V -d

## mongodb repicaset setup
# composing replicaset up
docker-compose -f docker-compose.mongo.yml --env-file "docker.env" up -d
# configuring replicaset
./initialize.ps1

# entering container
docker container exec -it chatserver sh

# seeding db from container `chatserver`
npx prisma db seed

