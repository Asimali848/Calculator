import { api } from "./core";

export const CaseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCase: builder.query<CaseData[], string>({
      query: (token) => ({
        url: "/docket/api/cases/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: {
        status_code: number;
        message: string;
        data: CaseData[];
      }) => response.data,
    }),

    getCaseById: builder.query<CaseData, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `/docket/api/cases/${id}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: {
        status_code: number;
        message: string;
        data: CaseData;
      }) => response.data,
    }),

    postCase: builder.mutation<CaseData, { token: string; data: CaseData }>({
      query: ({ token, data }) => ({
        url: "/docket/api/add-docket/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),

    deleteCase: builder.mutation<void, { token: string; id: string }>({
      query: ({ token, id }) => ({
        url: `/docket/api/cases/${id}/delete/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetCaseQuery,
  useGetCaseByIdQuery,
  usePostCaseMutation,
  useDeleteCaseMutation,
} = CaseApi;
