import { api } from "./core";

export const supplierApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postSupplier: builder.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: {
          name: string;
          website: string;
          contact_number: string;
          address: string;
        };
      }) => ({
        url: "/suppliers/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      // @ts-ignore
      invalidatesTags: ["Suppliers"],
    }),
    getSuppliers: builder.query({
      query: (token: string) => ({
        url: "/suppliers/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // @ts-ignore
      providesTags: ["Suppliers"],
      transformResponse: (response: Supplier[]) => response,
    }),
    getSupplier: builder.query({
      query: ({ id, token }: { id: number; token: string }) => ({
        url: `/suppliers/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // @ts-ignore
      providesTags: ["Supplier"],
    }),
    putSupplier: builder.mutation({
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
          contact_number: string;
          address: string;
          soft_delete: false;
        };
      }) => ({
        url: `/suppliers/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      // @ts-ignore
      invalidatesTags: ["Suppliers", "Supplier"],
    }),
    deleteSupplier: builder.mutation({
      query: ({ id, token }: { token: string; id: number }) => ({
        url: `/suppliers/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // @ts-ignore
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  usePostSupplierMutation,
  useGetSuppliersQuery,
  useGetSupplierQuery,
  usePutSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
