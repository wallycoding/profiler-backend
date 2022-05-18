import type { Request, Response } from "express";
import database from "../../../database";

const usePublicProfileService = async (req: Request, res: Response) => {
  const {
    user: {
      profile: { id: profileID },
    },
  } = req.props;
  const { id } = req.params;

  const user = await database.profile.findUnique({
    where: {
      id,
    },
    select: {
      user: {
        select: {
          id: true,
          full_name: true,
        },
      },
      id: true,
      photo: true,
      description: true,
      followers: true,
      following: true,
    },
  });

  const isFollowing = !!await database.follow.findUnique({
    where: {
      following_id_follow_id: {
        follow_id: id,
        following_id: profileID,
      },
    },
  });

  res.json({
    ...user,
    isFollowing,
  });
};

export default usePublicProfileService;
