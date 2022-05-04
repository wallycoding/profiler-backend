import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import database from "../../../database";

interface AuthSignUpAttributes {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const useSignUpService = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body as AuthSignUpAttributes;

  const user = await database.user.create({
    data: {
      photo: null,
      full_name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
    },
  });

  const payload = jwt.sign(
    {
      id: user.id,
      photo: user.photo,
    },
    process.env.JWT_SECRET_KEY || "",
    {
      expiresIn: "1m",
    }
  );

  res.json({ token: `Bearer ${payload}` });
};

export default useSignUpService;
