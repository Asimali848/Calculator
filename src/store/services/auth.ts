import { api } from "./core";

type TokenPayload<T> = {
  token?: string;
  data: T;
};

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Register
    register: build.mutation<
      any,
      TokenPayload<{
        username: string;
        email: string;
        password: string;
      }>
    >({
      query: ({ token, data }) => ({
        url: "/authentication/api/register/",
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: data,
      }),
    }),

    // Login
    login: build.mutation<
      any,
      TokenPayload<{
        email: string;
        password: string;
      }>
    >({
      query: ({ token, data }) => ({
        url: "/authentication/api/login/",
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: data,
      }),
    }),

    // Verify Email
    VerfyEmail: build.mutation<
      any,
      TokenPayload<{
        email: string;
        otp: string;
      }>
    >({
      query: ({ token, data }) => ({
        url: "/authentication/api/verify-email/",
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: data,
      }),
    }),

    // Regenerate OTP
    RegenOTP: build.mutation<
      any,
      TokenPayload<{
        email: string;
      }>
    >({
      query: ({ token, data }) => ({
        url: "/authentication/api/regenerate-otp/",
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: data,
      }),
    }),

    // Request Password Reset
    PasswordResetRequest: build.mutation<
      any,
      TokenPayload<{
        email: string;
      }>
    >({
      query: ({ token, data }) => ({
        url: "/authentication/api/password-reset-request/",
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: data,
      }),
    }),

    // Confirm Password Reset
    PasswordResetVerify: build.mutation<
      any,
      TokenPayload<{
        email: string;
        otp: string;
        password: string;
      }>
    >({
      query: ({ token, data }) => ({
        url: "/authentication/api/password-reset-confirm/",
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: data,
      }),
    }),

    // Update User Profile
    updateUser: build.mutation<
      any,
      {
        token: string;
        body: {
          username?: string;
          email?: string;
          password?: string;
          avatar?: string;
        };
      }
    >({
      query: ({ token, body }) => ({
        url: "/authentication/api/profile/update/",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerfyEmailMutation,
  useRegenOTPMutation,
  usePasswordResetRequestMutation,
  usePasswordResetVerifyMutation,
  useUpdateUserMutation,
} = userApi;
