import { api } from "./core";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: {
          first_name: string;
          last_name: string;
          phone_number: string;
          email: string;
          country: string;
          state: string;
          city: string;
          postal_code: string;
          profile_picture_url: string;
        };
      }) => ({
        url: "/auth/register",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    getUser: build.query({
      query: (token: string) => ({
        url: "/users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: User) => response,
    }),
    updateUser: build.mutation({
      query: ({
        id,
        token,
        body,
      }: {
        id: string;
        token: string;
        body: UpdateUser;
      }) => ({
        url: `/users/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useGetUserQuery, useUpdateUserMutation } =
  userApi;
