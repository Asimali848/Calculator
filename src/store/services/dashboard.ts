import { api } from "./core";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: (token: string) => ({
        url: "/products/statistics",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Dashboard"],
      transformResponse: (response: { data: Dashboard }) => response.data,
    }),
    getDashboardGraph: builder.query({
      query: (token: string) => ({
        url: "/products/statistics-seo-and-non-seo",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Dashboard"],
      transformResponse: (response: { data: DashboardGraph }) => response.data,
    }),
  }),
});

export const { useGetDashboardQuery, useGetDashboardGraphQuery } = dashboardApi;
