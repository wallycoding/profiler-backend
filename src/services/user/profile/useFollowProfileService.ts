import type { Request, Response } from "express";
import database from "../../../database";

const useFollowProfileService = async (req: Request, res: Response) => {
  const {
    user: {
      profile: { id: profileFollowingId },
    },
  } = req.props;
  const { id } = req.params;

  const follow = await database.follow.create({
    data: {
      following_id: profileFollowingId,
      follow_id: id,
    },
  });

  return res.json(follow);
};

export default useFollowProfileService;
