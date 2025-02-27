import axios from 'axios';
import { DASHBOARD_URL } from '../../config';
import winstonLogger from 'pyro-logger';

export const dashClient = axios.create({
  baseURL: DASHBOARD_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

dashClient.interceptors.response.use(
  (response) => response,
  (error) => {
    winstonLogger.error('Fehler beim Dashboard-Request:', error);
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error(String(error)));
  },
);
