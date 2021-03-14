import { config } from 'dotenv';

config();

interface ServerConfig {
  PORT: number;
  URL: string;
}

interface DbConfig {
  MONGO_URL: string;
}

interface WebToken {
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
  REFRESH_TOKEN_NAME: string;
  REFRESH_TOKEN_PATH: string;
}

interface AppConfig {
  appName: string;
  url: string;
  environment: string;
  db: DbConfig;
  server: ServerConfig;
  webToken: WebToken;
}

const {
  NODE_ENV,
  URL,
  SERVER_URL,
  MONGO_URL,
  PORT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_PATH,
} = process.env;

export abstract class Configuration {
  static appConfig: AppConfig = {
    appName: 'backend',
    environment: NODE_ENV as string,
    url: URL as string,
    db: {
      MONGO_URL,
    } as DbConfig,
    server: {
      PORT: parseInt(PORT as string, 10),
      URL: SERVER_URL,
    } as ServerConfig,
    webToken: {
      ACCESS_SECRET: ACCESS_TOKEN_SECRET,
      REFRESH_SECRET: REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_NAME,
      REFRESH_TOKEN_PATH,
    } as WebToken,
  };
}
