import { Request,Response } from "express";

export default function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
) {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
}