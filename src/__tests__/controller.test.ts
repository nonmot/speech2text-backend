import { Request, Response } from "express";
import { recognizeAudio } from "../controllers/controllers";

describe("recognizeAudio", () => {
  it("should return 400 if no file is uploaded", async () => {
    const req = { file: undefined } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const next = jest.fn();
    await recognizeAudio(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "file is required" });
  });
});
