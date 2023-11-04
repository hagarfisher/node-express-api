import { NextFunction, Request, Response } from "express";
import { Secret, decode, verify } from "jsonwebtoken";

export const secret = process.env.JWT_SECRET as Secret;
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    // req.userId = decoded.id;
    next();
  });
};
