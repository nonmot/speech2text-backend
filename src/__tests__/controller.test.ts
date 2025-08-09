import { Request, Response } from 'express';
import { recognizeAudio } from '../controllers/controllers';

describe('recognizeAudio', () => {
  it('should return 400 if no file is uploaded', async () => {
    const req: any = { file: null };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    const next = jest.fn();
    await recognizeAudio(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'file is required' });
  });
});
