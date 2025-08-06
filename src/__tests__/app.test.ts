import request from 'supertest';
import app from '../app';

describe('GET /api/v1/', () => {
  it('should return a hello message', async () => {
    const res = await request(app).get('/api/v1/');
    expect(res.statusCode).toBe(200);
  })
})
