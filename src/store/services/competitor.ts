import { api } from "./core";

export const companyApi = api.injectEndpoints({
  endpoints: (build) => ({
    postCompetitors: build.mutation({
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
          website_name: string;
        };
      }) => ({
        url: "/competitors/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Competitors"],
    }),
    getCompetitors: build.query({
      query: (token: string) => ({
        url: "/competitors/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Competitors"],
      transformResponse: (response: Competitor[]) => response,
    }),
    getCompetitor: build.query({
      query: ({ id, token }: { id: number; token: string }) => ({
        url: `/competitors/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Competitors"],
      transformResponse: (response: Competitor) => response,
    }),
    putCompetitors: build.mutation({
      query: ({
        id,
        token,
        data,
      }: {
        id: number;
        token: string;
        data: {
          name: string;
          website: string;
          address: string;
          postal_code: string;
          website_name: string;
          soft_delete: boolean;
        };
      }) => ({
        url: `/competitors/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Competitors"],
    }),
    deleteCompetitor: build.mutation({
      query: ({ token, id }: { token: string; id: number }) => ({
        url: `/competitors/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Competitors"],
    }),
  }),
});

export const {
  usePostCompetitorsMutation,
  useGetCompetitorsQuery,
  useGetCompetitorQuery,
  useDeleteCompetitorMutation,
  usePutCompetitorsMutation,
} = companyApi;
