import { EventEmitter } from "events";
import crypto from "crypto";
import path from "path";
import busboy from "busboy";
import { createWriteStream, unlinkSync } from "fs";
import type { NextFunction, Request, Response } from "express";
import { Validator } from "node-input-validator";
import database from "../../../database";
import { hashFile } from "../../../utils/files";
// import { bytesTypeConversion } from "../../utils/bytes";

interface AuthSignUpAttributes {
  photo?: string;
  full_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

const useSignUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = new EventEmitter();
    const bb = busboy({ headers: req.headers });

    bb.addListener("error", (error: any) => {
      events.emit("unlink-photo");
      res.status(400).json(error);
    });

    bb.addListener("success", () => {
      next(null);
    });

    bb.on("field", (name, value) => {
      req.body[name] = value;
    });

    bb.on("file", async (name, stream, file) => {
      if (name !== "photo") return;

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];
      // TODO CHECK SIZE;
      // const { hasExceeded } = bytesTypeConversion(bytes, [2, "MB"], 1000);
      if (!allowedTypes.includes(file.mimeType))
        return bb.emit("error", {
          has_error: true,
          errors: {
            photo: {
              message: `The type ${file.mimeType} is not allowed`,
              rule: "mimetype",
            },
          },
        });
      // if (hasExceeded)
      //   return bb.emit("error", {
      //     has_error: true,
      //     errors: {
      //       photo: {
      //         message: `The file is larger than 2MB`,
      //         rule: "size",
      //       },
      //     },
      //   });

      const filename = hashFile(file.mimeType);
      const imagePath = `./images/user/${filename}`;
      req.body.photo = `/images/user/${filename}`;

      const imageStream = createWriteStream(imagePath);
      stream.pipe(imageStream);

      events.addListener("unlink-photo", () => {
        try {
          unlinkSync(imagePath);
        } catch (e) {
          console.log(`UNLINK: ${filename} ERROR`);
        }
      });
    });

    bb.on("finish", async () => {
      const { photo, full_name, email, password, confirm_password } =
        req.body as AuthSignUpAttributes;

      // RAW VALIDATION
      const validation = new Validator(
        {
          photo,
          full_name,
          email,
          password,
          confirm_password,
        },
        {
          photo: "required",
          full_name: "required|maxLength:255|minLength:3",
          email: "required|email",
          password: "required|maxLength:40|minLength:6|same:confirm_password",
          confirm_password: "required|maxLength:40|minLength:6|same:password",
        }
      );

      const checkData = await validation.check();

      if (!checkData)
        return bb.emit("error", {
          has_error: true,
          errors: validation.errors,
        });

      // DATABASE VALIDATION
      const existsEmailInDatabase = await database.user.findUnique({
        where: {
          email,
        },
      });

      if (existsEmailInDatabase)
        return bb.emit("error", {
          has_error: true,
          errors: {
            email: {
              message: "This email is already in use.",
              rule: "exists",
            },
          },
        });

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

export default useSignUpController;
