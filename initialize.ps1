# Run docker exec -it mongo1 mongosh
docker exec -it mongo1 mongosh --eval "rs.initiate({ `
    _id: 'devReplicaSet',
    members: [ `
      {_id: 0, host: 'mongo1:27017'}, `
      {_id: 1, host: 'mongo2:27017'} `
    ] `
})"