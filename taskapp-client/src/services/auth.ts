import axios from 'axios';

export type User = {
  id: number,
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  authToken: string
};

type UserLoginInput = {
  username: string;
  password: string;
};

export async function loginUser(input: UserLoginInput): Promise<null | User> {
  const requestHeaders = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  try {
    const response = await axios.post<{ user: User }>(
      'http://localhost:8080/login',
      input,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    const user = response.data.user
    return user;
  } catch (error) {
    return null;
  }
}

type RequesterRole = 'requester';
type AdminRole = 'admin';
type WorkerRole = 'worker';
export type Role = RequesterRole | WorkerRole | AdminRole;

export type UserSignUpInput = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export async function signUpUser(input: UserSignUpInput): Promise<User> {
  const response = await axios.post<{ user: User }>(
    'http://localhost:8080/sign-up',
    input,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }
  );
  const user = response.data.user
  return user;
}
