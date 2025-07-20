// import { api } from "./core";
// export const transactionApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     postTransaction: build.mutation({
//       query: ({
//         token,
//         data,
//       }: {
//         token: string;
//         data: {
//           case_id: number;
//           transaction_type: string;
//           amount: number;
//           date: string;
//           description: string;
//           new_balance: number;
//         };
//       }) => ({
//         url: "/docket/api/transactions/create/",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       }),
//       invalidatesTags: ["Transaction"],
//     }),
//     getTransaction: build.query({
//       query: (id: number, token: string) => ({
//         url: `/docket/api/cases/${id}/transactions/`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }),
//       providesTags: ["Transactions"],
//       transformResponse: (response: Transaction) => response,
//     }),
//     getCaseTransactions: build.query({
//       query: ({ id, token }: { id: number; token: string }) => ({
//         url: `/docket/api/cases/${id}/transactions/`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }),
//       providesTags: ["Transaction"],
//       transformResponse: (response: Transaction[]) => response,
//     }),
//     putTransaction: build.mutation({
//       query: ({
//         id,
//         token,
//         data,
//       }: {
//         id: number;
//         token: string;
//         data: {
//           case_id: number;
//           transaction_type: string;
//           amount: number;
//           date: string;
//           description: string;
//           new_balance: number;
//         };
//       }) => ({
//         url: `/docket/api/transactions/${id}/update/`,
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       }),
//       invalidatesTags: ["Transaction"],
//     }),
//     deleteTransaction: build.mutation({
//       query: ({ token, id }: { token: string; id: number }) => ({
//         url: `/Transaction/${id}`,
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }),
//       invalidatesTags: ["Transaction"],
//     }),
//   }),
// });
// export const {
//   usePostTransactionMutation,
//   useGetTransactionQuery,
//   usePutTransactionMutation,
//   useGetCaseTransactionsQuery,
//   useDeleteTransactionMutation,
// } = transactionApi;
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
      query: ({ id, token }: { id: number; token: string }) => ({
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
      query: ({ id, token }: { id: number; token: string }) => ({
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
        id: number;
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
      query: ({ token, id }: { token: string; id: number }) => ({
        url: `/docket/api/transactions/${id}/delete/`, // ✅ fixed endpoint path
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
  useGetCaseTransactionsQuery,
  useDeleteTransactionMutation,
} = transactionApi;
