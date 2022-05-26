import { createContext } from 'react';

import { User } from '../services/auth';

export interface IAppContext {
  user: null | User;
  setUser(user: null | User): void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
