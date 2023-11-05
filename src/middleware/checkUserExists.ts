import axios, { AxiosError, HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
export const checkUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await axios.get(`${process.env.EXTERNAL_API_URL}/users/${req.params.id}`);
    return next();
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response?.status !== HttpStatusCode.NotFound) {
      console.error(axiosError.response?.data);
    }
    return res.status(HttpStatusCode.NotFound).json("user not found!");
  }
};
