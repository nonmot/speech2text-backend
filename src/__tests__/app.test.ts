import request from 'supertest';
import app from '../app';

describe('GET / for healthcheck', () => {
  it('should return a OK', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("OK");
  })
})

describe('GET /api/v1/', () => {
  it('should return a hello message', async () => {
    const res = await request(app).get('/api/v1/');
    expect(res.statusCode).toBe(200);
  })
})
