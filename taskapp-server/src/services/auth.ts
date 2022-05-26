import { query, pgClient } from './pg';
import { randomString } from '../utils';

type RequesterRole = 'requester';
type AdminRole = 'admin';
type WorkerRole = 'worker';
export type Role = RequesterRole | WorkerRole | AdminRole;

export type UserCreateInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
};

type User = {
  id: number,
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
};

export type UserWithAuthToken = User & {
  authToken: string;
};

const userCreateSQL = `
  INSERT INTO taskapp.users (
    username,
    hashed_password,
    first_name,
    last_name,
    role,
    hashed_auth_token
  ) VALUES (
    $1,
    crypt($2, gen_salt('bf')),
    $3,
    $4,
    $5,
    crypt($6, gen_salt('bf'))
  )
  RETURNING
    id,
    username,
    role,
    first_name as "firstName",
    last_name as "lastName",
    created_at as "createdAt"
`;

export class DuplicateUsernameError extends Error {}

export async function createUser(userToCreate: UserCreateInput): Promise<UserWithAuthToken> {
  const authToken = randomString();
  const client = await pgClient();
  let result;
  try {
    result = await query<User>(client, userCreateSQL, {
      $1: userToCreate.username,
      $2: userToCreate.password,
      $3: userToCreate.firstName,
      $4: userToCreate.lastName,
      $5: userToCreate.role,
      $6: authToken,
    });
  } catch (error) {
    if (error.message.includes('duplicate key value violates')) {
      throw new DuplicateUsernameError('Username taken, try a different username');
    } else {
      throw error;
    }
  }
  if (result && !result.rows.length) {
    throw new Error('failed to create user');
  } else {
    return {
      ...result.rows[0],
      authToken,
    };
  }
}

export type UserLoginInput = {
  username: string;
  password: string;
};

const userFetchFromCredentialsSQL = `
  SELECT
    id,
    username,
    first_name as "firstName",
    last_name as "lastName",
    role,
    created_at as "createdAt"
  FROM taskapp.users
  WHERE
    username = $1 AND
    hashed_password = crypt($2, hashed_password)
`;
const updateUserAuthTokenSQL = `
  UPDATE taskapp.users
  SET hashed_auth_token = crypt($2, gen_salt('bf'))
  WHERE id = $1
`;

export async function loginUser(userLoginInput: UserLoginInput): Promise<UserWithAuthToken> {
  const client = await pgClient();
  console.log('userLoginInput', userLoginInput);
  const result = await query<User>(client, userFetchFromCredentialsSQL, {
    $1: userLoginInput.username,
    $2: userLoginInput.password,
  });
  if (!result.rows.length) {
    throw new Error('Invalid username or password');
  }
  const user = result.rows[0];
  const authToken = randomString();
  await query(client, updateUserAuthTokenSQL, {
    $1: user.id,
    $2: authToken,
  });
  return { ...user, authToken };
}

const userFetchFromAuthTokenSQL = `
  SELECT
    id,
    username,
    first_name as "firstName",
    last_name as "lastName",
    role,
    created_at as "createdAt"
  FROM taskapp.users
  WHERE hashed_auth_token = crypt($1, hashed_auth_token)
`;

export async function fetchUserForToken(authToken: string): Promise<null | UserWithAuthToken> {
  const client = await pgClient();
  const result = await query<User>(client, userFetchFromAuthTokenSQL, { $1: authToken });
  const user = result.rows.length === 0 ? null : result.rows[0];
  return user && { ...user, authToken };
}

export async function deleteUser(userId: number): Promise<void> {
  const client = await pgClient();
  await query<User>(client, `DELETE FROM taskapp.users WHERE id = $1`, { $1: userId });
  return;
}

const userFetchFromIdSQL = `
  SELECT
    id,
    username,
    first_name as "firstName",
    last_name as "lastName",
    role,
    created_at as "createdAt"
  FROM taskapp.users
  WHERE id = $1
`;

export async function getUser(userId: number): Promise<null | User> {
  const client = await pgClient();
  const result = await query<User>(client, userFetchFromIdSQL, { $1: userId });
  const user = result.rows.length === 0 ? null : result.rows[0];
  return user;
}
