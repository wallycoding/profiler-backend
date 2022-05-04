import { Router } from "express";
import { useAuthController } from "../../controllers";
import { useAuthService } from "../../services";

const router = Router();
router.post(
  "/user/auth/signin",
  useAuthController.useSignInController,
  useAuthService.useSignInService
);
router.post(
  "/user/auth/signup",
  useAuthController.useSignUpController,
  useAuthService.useSignUpService
);
export default router;
