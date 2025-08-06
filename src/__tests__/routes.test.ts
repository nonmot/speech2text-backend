import request from 'supertest';
import app from '../app';

describe('Routes', () => {
  it('GET /api/v1 should return 200 and message', async () => {
    const res = await request(app).get("/api/v1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Hello world!" });
  })
})
