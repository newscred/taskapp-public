CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE DATABASE taskapp_test;
CREATE SCHEMA IF NOT EXISTS taskapp;

CREATE TYPE userrole AS ENUM ('admin', 'requester', 'worker');

CREATE TABLE IF NOT EXISTS taskapp.users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  hashed_password text NOT NULL,
  role userrole NOT NULL,
  first_name text,
  last_name text,
  hashed_auth_token text,
  created_at timestamp without time zone NOT NULL
    DEFAULT (now() at time zone 'utc'),

  CHECK (lower(username) = username)
);

CREATE TYPE task_status as ENUM (
  'Unassigned',
  'Assigned',
  'In Progress',
  'Needs Review',
  'Done'
);
CREATE TABLE IF NOT EXISTS taskapp.tasks (
  id serial PRIMARY KEY,
  created_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
  modified_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
  title text NOT NULL,
  description text NOT NULL,
  body text,
  creator_id integer NOT NULL REFERENCES taskapp.users (id),
  assignee_id integer REFERENCES taskapp.users (id),
  status task_status DEFAULT ('Unassigned')
);
