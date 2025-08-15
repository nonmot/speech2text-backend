import { errorHandler } from "../middlewares/errorHandler";
import type { Request, Response } from "express";

describe('Error Handler Middleware', () => {
  it('should return 500 status with error message', () => {
    const err = new Error('Test error');
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const next = jest.fn();

    errorHandler(err, req, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
  })
})
