import { NextFunction, Request, Response } from "express";
import { cache } from "../cacheHandler";
import { HttpStatusCode } from "axios";

export const getFromCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (cache.has(id)) {
      return res.status(200).json(cache.get(id));
    }
    return next();
  } catch (err) {
    console.error(err);
    return res
      .status(HttpStatusCode.InternalServerError)
      .json("something went wrong!");
  }
};
