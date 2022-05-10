import useSignInController from "./user/auth/useSignInController";
import useSignUpController from "./user/auth/useSignUpController";
import useVerifyAuthController from "./user/auth/useVerifyAuthController";

import usePublicProfileController from "./user/profile/usePublicProfileController";

export const useAuthController = {
  useSignInController,
  useSignUpController,
  useVerifyAuthController,
};
export const useProfileController = { usePublicProfileController };
