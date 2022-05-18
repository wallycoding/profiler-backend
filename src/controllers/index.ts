import useSignInController from "./user/auth/useSignInController";
import useSignUpController from "./user/auth/useSignUpController";
import useVerifyAuthController from "./user/auth/useVerifyAuthController";

import useVerifyProfileByID from "./user/profile/useVerifyProfileByID";

export const useAuthController = {
  useSignInController,
  useSignUpController,
  useVerifyAuthController,
};
export const useProfileController = { useVerifyProfileByID };
