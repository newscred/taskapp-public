import { IAppContext } from '../contexts/AppContext';

import { User } from '../services/auth';

class AppClient implements IAppContext {
  user: null | User;

  constructor() {
    this.user = null;
  }

  setUser(user: null | User) {
    this.user = user;
  }
}

export default AppClient;
