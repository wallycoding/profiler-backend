import type { Request, Response } from "express";
import database from "../../../database";

const usePublicProfileService = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await database.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      photo: true,
      full_name: true,
    },
  });

  res.json(user);
};

export default usePublicProfileService;
