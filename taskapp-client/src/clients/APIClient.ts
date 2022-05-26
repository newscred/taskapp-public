import axios, { AxiosInstance } from 'axios';

import { User } from '../services/auth';

export default {
  createForUser(user: User): AxiosInstance {
    return axios.create({
      // TODO use config for baseURL
      baseURL: 'http://localhost:8080',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${user.authToken}`
      }
    });
  }
}
