import useSignInService from "./user/auth/useSignInService";
import useSignUpService from "./user/auth/useSignUpService";

import usePublicProfileService from "./user/profile/usePublicProfileService";
import useMyProfileService from "./user/profile/useMyProfileService";
import useFollowProfileService from "./user/profile/useFollowProfileService";
import useUnFollowProfileService from "./user/profile/useUnFollowProfileService";

export const useAuthService = { useSignInService, useSignUpService };
export const useProfileService = {
  usePublicProfileService,
  useMyProfileService,
  useFollowProfileService,
  useUnFollowProfileService
};
