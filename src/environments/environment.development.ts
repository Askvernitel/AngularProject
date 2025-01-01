import { Environment } from '@env/environment.type';
//const PORT process.env.PORT ?? '5000' did not work for me
//const PORT = process.env.PORT ?? '5000';
const PORT = 5000;
export const environmentDevelopment: Environment = {
  production: false,
  apiUrl: `http://localhost:${PORT}/api/`,
};
