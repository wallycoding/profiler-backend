import type { NextFunction, Request, Response } from "express";
import busboy from "busboy";
import { Validator } from "node-input-validator";
import bcrypt from "bcrypt";
import database from "../../../database";

interface AuthSignInAttributes {
  email?: string;
  password?: string;
}

const useSignInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bb = busboy({ headers: req.headers });

    bb.addListener("error", (error: any) => {
      res.status(400).json(error);
    });

    bb.addListener("success", () => {
      next(null);
    });

    bb.on("field", (name, value) => {
      req.body[name] = value;
    });

    bb.on("finish", async () => {
      const { email, password } = req.body as AuthSignInAttributes;

      // DATA VALIDATION
      const validation = new Validator(
        {
          email,
          password,
        },
        {
          email: "required|email",
          password: "required|maxLength:40|minLength:6",
        }
      );

      const checkData = await validation.check();

      if (!checkData) {
        return res.status(400).json({
          has_error: true,
          errors: validation.errors,
        });
      }

      // DATABASE VALIDATION

      const userFromDatabase = await database.user.findUnique({
        where: {
          email,
        },
      });

      const userPasswordMatch = !!(
        password &&
        userFromDatabase &&
        bcrypt.compareSync(password, userFromDatabase.password)
      );

      if (!userFromDatabase || !userPasswordMatch) {
        return res.status(400).json({
          has_error: true,
          errors: {
            all: {
              message: "Invalid email or password!",
              rule: "invalid",
            }, // TODO DISABLE ALL PARAMS REQUEST CRASH
          },
        });
      }

      req.props = {
        user: userFromDatabase,
      };

      bb.emit("success");
    });

    req.pipe(bb);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        has_error: true,
        errors: {
          request: {
            message: error.message,
            rule: "header",
          },
        },
      });
    }
  }
};

export default useSignInController;
