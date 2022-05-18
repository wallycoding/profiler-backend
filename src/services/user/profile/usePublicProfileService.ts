import type { Request, Response } from "express";
import database from "../../../database";

const usePublicProfileService = async (req: Request, res: Response) => {
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

  res.json(user);
};

export default usePublicProfileService;
