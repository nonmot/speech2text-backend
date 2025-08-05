import request from 'supertest';
import app from '../app';

describe('GET /', () => {
  it('should return a hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  })
})
