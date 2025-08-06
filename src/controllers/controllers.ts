import { Request, Response, NextFunction } from "express";

export const getItems = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      message: "Hello world!",
    });
  } catch (error) {
    next(error);
  }
};
