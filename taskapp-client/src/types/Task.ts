import { User } from '../services/auth';

export type Task = {
  id: number;
  createdAt: string;
  modifiedAt: string;
  title: string;
  description: string;
  body: string;
  status: string;
  creator: null | User,
  assignee: null | User
};
