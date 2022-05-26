# Task Application

This repo contains the skeleton code for an application used for pair programming interviews.

The docker/ folder contains a docker-compose file for setting up a local development environment.

The taskapp-client/ folder contains source code for the front-end React application. It uses [MUI Core](https://mui.com/material-ui/getting-started/installation/) for the UI library.

The taskapp-server/ folder contains source code for the back-end Express application which uses PostgreSQL as the database.

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

## Pair Programming Assignment

We want to build a work scheduling app where users can submit tasks which are done by workers. Tasks can be created by users with the requester or admin role and worked on and completed by users with the worker role.

As of right now the only parts that are implemented are:
- Login & Sign-up
- A database table for tasks. See docker/schema.sql
- A UI skeleton which shows you a list of dummy tasks

### Business Logic

When a task is created by a requester, at first it’s an unassigned draft. The requester can update the task to add information however much they want. When the task is ready to be worked on they can submit the task and it will be assigned to the worker who is able to complete it soonest because they have the fewest tasks assigned.

For example
- A requester submits task T1
- Worker A has two tasks
- Worker B has three tasks
- Worker A has less work assigned,
- Task T1 should be assigned to worker A

When T1 is assigned to worker A, worker A will see the task in their queue, they can click on the task, see its information and click “start” on it to change its status to “In Progress”. The worker can then update the task, but only on its “body” field. The task can be “Completed”. When that happens the task has a “Needs Review” status and it needs to be reviewed by the requester. The requester can view the task and mark it “Done” or send it back to the same worker.

So the full lifecycle of a task looks like this

Unassigned -> Assigned -> In Progress -> Needs Review -> Done

When you load the app as a requester, you can create and edit tasks with a title and description. You can also see all the tasks that are drafts, in progress and need to be reviewed.

When you load the app as a worker, you can see which tasks you are assigned by their status. You can only click 'Start' on an 'Assigned' task, and you can only edit an 'In Progress' task. Once you submit a task for 'Needs Review' you cannot edit it.
