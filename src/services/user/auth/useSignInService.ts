import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

interface User {
  id: string;
  photo?: string;
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const useSignInService = async (req: Request, res: Response) => {
  const user = req.props.user as User;
  const payload = jwt.sign(
    {
      id: user.id,
      photo: user.photo,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRES,
    }
  );
  res.json({ token: `Bearer ${payload}` });
};

export default useSignInService;
