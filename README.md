# Task Application

This repo contains the skeleton code for an application used for pair programming interviews.

The docker/ folder contains a docker-compose file for setting up a local development environment.

The taskapp-client/ folder contains source code for the front-end React application.

The taskapp-server/ folder contains source code for the back-end Express application.

## Setup

```
cd docker
docker-compose up --build -d
```

Visit http://localhost:3000

## Running tests

First make sure everything is running in docker. Refer to Setup.

Server: `cd taskapp-server && ./test.sh`

Client: `docker exec -it taskapp_client yarn test`

