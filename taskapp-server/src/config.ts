export const appPort: number = parseInt(process.env.PORT) || 8080;
export const pgConnectionString: string = process.env.PG_CONNECTION_STRING || 'postgres://postgres:password@postgres:5432/taskapp';
