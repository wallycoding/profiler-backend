import { Router } from "express";
import { useAuthController, useProfileController } from "../../controllers";
import { useProfileService } from "../../services";

const router = Router();
router.get(
  "/user/profile/:id",
  useAuthController.useVerifyAuthController,
  useProfileController.usePublicProfileController,
  useProfileService.usePublicProfileService
);

export default router;
