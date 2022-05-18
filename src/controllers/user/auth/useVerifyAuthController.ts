import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import database from "../../../database";

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
    const userID = (payload as { id: string }).id;
    const user = await database.user.findUnique({
      where: {
        id: userID,
      },
      select: {
        profile: true,
      },
    });
    if (!user) throw Error("User not found");
    req.props = {
      user,
    };
    next(null);
  } catch {
    res.status(401).send("unauthorized");
  }
};

export default useVerifyAuthController;
