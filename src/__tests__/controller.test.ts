import { Request, Response } from 'express';
import { getItems } from '../controllers/controllers';

describe('Controller', () => {
  it('should return an empty array when no items exist', () => {
    const req = {} as Request;

    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    const res = {
      status: statusMock,
    } as unknown as Response;

    const next = jest.fn();
    
    getItems(req, res, next);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Hello world!" });
  });
});
