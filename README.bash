# list of all used commands

## mongodb repicaset setup
# composing replicaset up
# -d -- detached launch
docker-compose -f docker-compose.debug.yml up -d -V mongodb-primary mongodb-secondary mongodb-arbiter rabbitmq

# composing containers
# -V -- remove unnamed volumes
docker-compose -f "./docker-compose.debug.yml" --env-file ".env" up --build -V chatserver gateway

docker-compose -f "./docker-compose.debug.yml" start chatserver gateway
docker-compose -f "./docker-compose.debug.yml" stop chatserver gateway

# entering container
docker container exec -it chatserver sh

# seeding db from container `chatserver`
npx prisma db seed