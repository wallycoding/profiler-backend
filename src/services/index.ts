import useSignInService from "./user/auth/useSignInService";
import useSignUpService from "./user/auth/useSignUpService";

import usePublicProfileService from "./user/profile/usePublicProfileService";
import useMyProfileService from "./user/profile/useMyProfileService";

export const useAuthService = { useSignInService, useSignUpService };
export const useProfileService = { usePublicProfileService, useMyProfileService };
