import request from 'supertest';
import app from '../app';

describe('Routes', () => {
  it('GET /api/v1/models should return 200', async () => {
    const res = await request(app).get('/api/v1/models');
    expect(res.status).toBe(200);
  });
})
