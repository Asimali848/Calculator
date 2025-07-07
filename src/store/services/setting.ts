import { api } from "./core";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    postSetting: build.mutation({
      query: ({ token, data }: { token: string; data: Setting }) => ({
        url: "/settings/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
    getSetting: build.query({
      query: (token: string) => ({
        url: "/settings/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: ["Setting"],
        transformResponse: (response: {
          message: string;
          status_code: string;
          data: Setting[];
        }) => response.data,
      }),
    }),
    putSetting: build.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        id: number;
        data: Setting;
      }) => ({
        url: "/settings/",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const {
  usePostSettingMutation,
  useGetSettingQuery,
  usePutSettingMutation,
} = userApi;
