import { errorHandler } from "../middlewares/errorHandler";

describe('Error Handler Middleware', () => {
  it('should return 500 status with error message', () => {
    const err = new Error('Test error');
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
  })
})
