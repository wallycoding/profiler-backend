import useSignInController from "./user/auth/useSignInController";
import useSignUpController from "./user/auth/useSignUpController";
import useVerifyAuthController from "./user/auth/useVerifyAuthController";

export const useAuthController = { useSignInController, useSignUpController, useVerifyAuthController };
