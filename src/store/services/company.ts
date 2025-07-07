import { api } from "./core";

export const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postCompany: builder.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: {
          name: string;
          website: string;
          address: string;
          postal_code: string;
        };
      }) => ({
        url: "/company/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      // @ts-ignore
      invalidatesTags: ["Company"],
    }),
    getCompany: builder.query({
      query: (token: string) => ({
        url: "/company/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // @ts-ignore
      providesTags: ["Company"],
    }),
    putCompany: builder.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: {
          name: string;
          website: string;
          address: string;
          postal_code: string;
        };
      }) => ({
        url: "/company/",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      // @ts-ignore
      invalidatesTags: ["Company"],
    }),
    delectCompany: builder.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/company/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // @-ignore
        invalidatesTags: ["Companies"],
      }),
    }),
  }),
});

export const {
  usePostCompanyMutation,
  useGetCompanyQuery,
  usePutCompanyMutation,
  useDelectCompanyMutation,
} = companyApi;
