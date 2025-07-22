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

    postCase: builder.mutation<CaseData, { token: string; data: AddCase }>({
      query: ({ token, data }) => ({
        url: "/docket/api/add-docket/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // REMOVE Content-Type header here
        },
        body: data, // Let RTKQ handle serialization
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

    downloadPayoffStatement: builder.mutation<
      Blob,
      { token: string; caseId: string }
    >({
      query: ({ token, caseId }) => ({
        url: `/docket/api/cases/${caseId}/payoff-statement/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),
  }),
});

export const {
  useGetCaseQuery,
  useGetCaseByIdQuery,
  usePostCaseMutation,
  useDeleteCaseMutation,
  useDownloadPayoffStatementMutation,
} = CaseApi;
