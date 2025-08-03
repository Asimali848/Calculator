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

    getProfile: build.query<
      {
        status_code: number;
        message: string;
        profile: {
          full_name: string;
          image: string;
          email: string;
          company: string;
          location: string;
          phone_number: string;
          website: string;
          subscription_plan: string;
          member_since: string;
        };
      },
      { token: string }
    >({
      query: ({ token }) => ({
        url: "/authentication/api/profile/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // updateUser: build.mutation<
    //   any,
    //   {
    //     token: string;
    //     body: {
    //       full_name: string;
    //       email: string;
    //       image: string;
    //       company: string;
    //       location: string;
    //       phone_number: string;
    //       website: string;
    //       subscription_plan: string;
    //       member_since: string;
    //     };
    //   }
    // >({
    //   query: ({ token, body }) => ({
    //     url: "/authentication/api/profile/update/",
    //     method: "PUT",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body,
    //   }),
    // }),

    // services/auth.ts
    updateUser: build.mutation<
      any,
      {
        token: string;
        body: {
          full_name: string;
          email: string;
          image?: File;
          company: string;
          location: string;
          phone_number: string;
          website: string;
          subscription_plan: string;
          member_since: string;
        };
      }
    >({
      query: ({ token, body }) => {
        const formData = new FormData();
        formData.append("full_name", body.full_name);
        formData.append("email", body.email);
        if (body.image) {
          formData.append("image", body.image); // Direct file object
        }
        formData.append("company", body.company);
        formData.append("location", body.location);
        formData.append("phone_number", body.phone_number);
        formData.append("website", body.website);
        formData.append("subscription_plan", body.subscription_plan);
        formData.append("member_since", body.member_since);

        return {
          url: "/authentication/api/profile/update/",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set Content-Type for FormData - let browser set it with boundary
          },
          body: formData,
        };
      },
    }),


    changePassword: build.mutation<
      any,
      {
        token: string;
        body: {
          current_password: string;
          new_password: string;
        };
      }
    >({
      query: ({ token, body }) => ({
        url: "/authentication/api/change-password/",
        method: "POST",
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
  useGetProfileQuery,
  useChangePasswordMutation,
} = userApi;
