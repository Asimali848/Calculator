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
          case_id: number;
          transaction_type: string;
          amount: number;
          date: string;
          description: string;
          new_balance: number;
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
      query: (token: string) => ({
        url: "/Transaction/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Transactions"],
      transformResponse: (response: Transaction) => response,
    }),
    getCompetitor: build.query({
      query: ({ id, token }: { id: number; token: string }) => ({
        url: `/docket/api/cases/${id}/transactions/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Transaction"],
      transformResponse: (response: Competitor) => response,
    }),
    putTransaction: build.mutation({
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
        url: `/docket/api/transactions/${id}/update/`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteCompetitor: build.mutation({
      query: ({ token, id }: { token: string; id: number }) => ({
        url: `/Transaction/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  usePostTransactionMutation,
  useGetTransactionQuery,
  usePutTransactionMutation,
  useGetCompetitorQuery,
  useDeleteCompetitorMutation,
} = transactionApi;
