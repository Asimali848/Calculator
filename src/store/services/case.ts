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
        },
        body: data,
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
      { token: string; caseId: string; payoffDate: string }
    >({
      query: ({ token, caseId, payoffDate }) => ({
        url: `/docket/api/cases/${caseId}/payoff-statement/?date=${payoffDate}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
        responseHandler: (response) => response.blob(),
        cache: "no-cache",
      }),
    }),

    // ✅ New endpoint for editing a case
    editCase: builder.mutation<
      CaseData,
      { token: string; id: string; data: Partial<EditCase> }
    >({
      query: ({ token, id, data }) => ({
        url: `/docket/api/case/${id}/edit/`,
        method: "PUT", // or "PATCH" depending on your backend
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
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
  useEditCaseMutation, // ← new hook
} = CaseApi;
