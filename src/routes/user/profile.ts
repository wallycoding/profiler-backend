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

router.get(
  "/user/profile/",
  useAuthController.useVerifyAuthController,
  useProfileService.useMyProfileService
);

export default router;
