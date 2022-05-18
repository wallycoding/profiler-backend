import useSignInController from "./user/auth/useSignInController";
import useSignUpController from "./user/auth/useSignUpController";
import useVerifyAuthController from "./user/auth/useVerifyAuthController";

import useVerifyProfileByIDController from "./user/profile/useVerifyProfileByIDController";
import useFollowProfileController from "./user/profile/useFollowProfileController";
import useUnFollowProfileController from "./user/profile/useUnFollowProfileController";

export const useAuthController = {
  useSignInController,
  useSignUpController,
  useVerifyAuthController,
};
export const useProfileController = {
  useVerifyProfileByIDController,
  useFollowProfileController,
  useUnFollowProfileController,
};
