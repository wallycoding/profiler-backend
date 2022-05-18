import { Router } from "express";
import { useAuthController, useProfileController } from "../../controllers";
import { useProfileService } from "../../services";

const router = Router();
router.get(
  "/user/profile/:id",
  useAuthController.useVerifyAuthController,
  useProfileController.useVerifyProfileByID,
  useProfileService.usePublicProfileService
);

router.get(
  "/user/profile/",
  useAuthController.useVerifyAuthController,
  useProfileService.useMyProfileService
);

// Follow
router.get(
  "/user/profile/follow/:id",
  useAuthController.useVerifyAuthController,
  useProfileController.useVerifyProfileByID,
  useProfileService.useFollowProfileService
);

router.delete(
  "/user/profile/unfollow/:id",
  useAuthController.useVerifyAuthController,
  useProfileController.useVerifyProfileByID,
  useProfileService.useUnFollowProfileService
);

export default router;
