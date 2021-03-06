export const DB_CONFIG = {
  PASSWORD: process.env.DB_PASSWORD as string,
  USERNAME: process.env.DB_USERNAME as string,
  NAME: process.env.DB_NAME as string,
  PORT: Number.parseInt(process.env.DB_PORT as string, 10),
  HOST: process.env.DB_HOST as string,
};

export const API_CONFIG = {
  URL: process.env.API_URL as string,
  AUTHORIZATION: process.env.API_AUTH as string,
};
