#!/bin/bash
docker cp ../docker/schema.sql taskapp_pg:/
docker exec -it taskapp_pg psql -U postgres taskapp_test -f /schema.sql
docker exec -it -e PG_CONNECTION_STRING=postgres://postgres:password@postgres:5432/taskapp_test taskapp_server yarn test
docker exec -it taskapp_pg psql -U postgres taskapp_test -c "DROP TABLE taskapp.tasks;"
docker exec -it taskapp_pg psql -U postgres taskapp_test -c "DROP TABLE taskapp.users;"
