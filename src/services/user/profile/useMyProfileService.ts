import type { Request, Response } from "express";
import database from "../../../database";

const useMyProfileService = async (req: Request, res: Response) => {
  const {
    user: {
      profile: { id },
    },
  } = req.props;

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

  res.json(user);
};

export default useMyProfileService;
