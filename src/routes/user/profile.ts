import { Router } from "express";
import { useAuthController } from "../../controllers";
import { useProfileService } from "../../services";

const router = Router();
router.get(
  "/user/profile/:id",
  useAuthController.useVerifyAuthController,
  useProfileService.usePublicProfileService
);

export default router;
