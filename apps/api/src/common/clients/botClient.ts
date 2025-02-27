import axios, { AxiosError } from 'axios';
import { BOT_URL } from '../../config';
import winstonLogger from 'pyro-logger';

export const botClient = axios.create({
  baseURL: BOT_URL,
  timeout: 5000, // Timeout in ms
  headers: { 'Content-Type': 'application/json' },
});

// Füge einen Response-Interceptor hinzu, der Fehler über Winston loggt:
botClient.interceptors.response.use(
  (response) => response,
  (err) => {
    winstonLogger.error('Fehler beim Bot-Request:', err);
    if (err instanceof AxiosError) {
      return Promise.reject(err);
    }
    return Promise.reject(new Error(String(err)));
  },
);
