import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const useVerifyAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw Error("invalid token");
    const token = authorization.replace(/^bearer\s/i, "");
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.props = {
      user: payload,
    };
    next(null);
  } catch {
    res.status(401).send("unauthorized");
  }
};

export default useVerifyAuthController;
