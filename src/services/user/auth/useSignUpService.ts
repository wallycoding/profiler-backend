import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import database from "../../../database";

interface AuthSignUpAttributes {
  photo: string;
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const useSignUpService = async (req: Request, res: Response) => {
  const { photo, full_name, email, password } =
    req.body as AuthSignUpAttributes;

  const user = await database.user.create({
    data: {
      full_name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      profile: {
        create: {
          photo,
        },
      },
    },
  });

  const payload = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRES,
    }
  );

  res.json({ token: `Bearer ${payload}` });
};

export default useSignUpService;
