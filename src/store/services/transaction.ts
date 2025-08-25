import { api } from "./core";

export const transactionApi = api.injectEndpoints({
  endpoints: (build) => ({
    postTransaction: build.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: {
          case_id: string;
          transaction_type: string;
          amount: number;
          date: string;
          description: string;
        };
      }) => ({
        url: "/docket/api/transactions/create/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    getTransaction: build.query({

      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/docket/api/cases/${id}/transactions/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Transaction"],
      transformResponse: (response: {
        message: string;
        status_code: number;
        transactions: TransactionFormData[];
      }) => response.transactions,
    }),

    getCaseTransactions: build.query({
      query: ({ id, token }: { id: string; token: string }) => ({
        url: `/docket/api/cases/${id}/transactions/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Transaction"],
      transformResponse: (response: {
        message: string;
        status_code: number;
        transactions: TransactionFormData[];
      }) => response.transactions,
    }),

    putTransaction: build.mutation({
      query: ({
        id,
        token,
        data,
      }: {
        id: string;
        token: string;
        data: {
          case_id: string;
          transaction_type: string;
          amount: number;
          date: string;
          description: string;
        };
      }) => ({
        url: `/docket/api/transactions/${id}/update/`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    deleteTransaction: build.mutation({
      query: ({ token, id }: { token: string; id: string }) => ({
        url: `/docket/api/transactions/${id}/delete/`, // ✅ fixed endpoint path
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),

    downloadPrintTransaction: build.mutation<
      Blob,
      { token: string; caseId: string }
    >({
      query: ({ token, caseId }) => ({
        url: `/docket/api/transactions/${caseId}/download/`,
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
  usePostTransactionMutation,
  useGetTransactionQuery,
  usePutTransactionMutation,
  useGetCaseTransactionsQuery,
  useDeleteTransactionMutation,
  useDownloadPrintTransactionMutation,
} = transactionApi;
