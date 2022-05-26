import request from 'supertest';

import { createApp } from '../../app';

describe('Test the health check', () => {
  const app = createApp();

  test('GET /_status should return \'{"message": "OK"}\'', async () => {
    const resp = await request(app).get('/_status');
    expect(resp.statusCode).toBe(200);
    expect(resp.text).toEqual('{"message":"OK"}');
  });
});
