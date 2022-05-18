import type { Request, Response } from "express";
import database from "../../../database";

const useUnFollowProfileService = async (req: Request, res: Response) => {
  const {
    user: {
      profile: { id: profileFollowingId },
    },
  } = req.props;
  const { id } = req.params;

  const unfollow = await database.follow.delete({
    where: {
      following_id_follow_id: {
        following_id: profileFollowingId,
        follow_id: id,
      },
    },
  });

  return res.json(unfollow);
};

export default useUnFollowProfileService;
