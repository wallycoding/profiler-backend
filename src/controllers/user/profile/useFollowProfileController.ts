import type { Request, Response, NextFunction } from "express";
import database from "../../../database";

const useFollowProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user: {
        profile: { id: profileFollowingId },
      },
    } = req.props;
    const { id } = req.params;

    const follow = await database.follow.findUnique({
      where: {
        following_id_follow_id: {
          following_id: profileFollowingId,
          follow_id: id,
        },
      },
    });

    if (follow)
      return res.status(400).json({
        has_error: true,
        errors: {
          request: {
            message: "you has following this user",
            rule: "has_following",
          },
        },
      });

    next();
  } catch (error) {
    res.status(500).send("unexpected error");
  }
};

export default useFollowProfileController;
