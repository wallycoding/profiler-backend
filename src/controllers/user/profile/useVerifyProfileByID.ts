import type { NextFunction, Request, Response } from "express";
import database from "../../../database";

const useVerifyProfileByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await database.profile.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      return res.status(404).json({
        has_error: true,
        errors: {
          id: {
            message: "not found this user",
            rule: "not_found",
          },
        },
      });

    next();
  } catch {
    res.status(500).send("unexpected error");
  }
};

export default useVerifyProfileByID;
