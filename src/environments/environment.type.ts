export interface Environment {
  production: boolean;
  apiUrl: string;
  [key: string]: any;
}
