import pg from 'pg';

import { pgConnectionString } from '../config';

export type PGClient = {
  pgPool: pg.Pool;
  pgClose: () => void;
};

export async function pgClient(): Promise<PGClient> {
  const pgPool = new pg.Pool({ connectionString: pgConnectionString });
  const client = await pgPool.connect();

  const tableCountResp = await client.query(
    'select count(*) from information_schema.tables where table_schema = $1;',
    ['taskapp'],
  );
  client.release();

  pgPool.on('error', (err) => {
    console.error('Unexpected PG client error', err);
    process.exit(-1);
  });

  return {
    pgPool,
    pgClose: async () => {
      await pgPool.end();
    },
  };
}

export async function query<T>(client: PGClient, sql: string, params: object) {
  return client.pgPool.query<T>(sql, Object.values(params));
}
