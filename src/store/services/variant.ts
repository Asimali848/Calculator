import { api } from "./core";

export const variantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postVariant: builder.mutation({
      query: ({ token, data }: { token: string; data: AddVariants }) => ({
        url: "/products/variant",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Variants"],
    }),
    getVariants: builder.query({
      query: ({
        token,
        parent_product_id,
      }: {
        token: string;
        parent_product_id: number;
      }) => ({
        url: `/products/variants/${parent_product_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Variants"],
      transformResponse: (response: {
        message: string;
        status_code: string;
        data: ProductVariant[];
      }) => response.data,
    }),
    addVariant: builder.mutation({
      query: ({ token, body }: { token: string; body: ProductVariant }) => ({
        url: "/products/variant",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Variants"],
    }),
    putVariant: builder.mutation({
      query: ({
        token,
        id,
        data,
      }: {
        token: string;
        id: number;
        data: {
          parent_product_id: number;
          price: number;
          size: string;
          color: string;
          stock: number;
          supplier_id: number;
          is_seo_optimized: boolean;
          image_url: string;
          warranty: string;
          material: string;
          manufacturer_code: string;
          bar_code: string;
          technical_specifications: string;
          description: string;
          tags: string[];
        };
      }) => ({
        url: `/products/update-variant/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Variants"],
    }),
    deleteVariant: builder.mutation({
      query: ({
        token,
        variant_id,
      }: {
        token: string;
        variant_id: number;
      }) => ({
        url: `/products/variant/${variant_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Variants"],
    }),
    getVariant: builder.query({
      query: ({
        token,
        variant_id,
      }: {
        token: string;
        variant_id: number;
      }) => ({
        url: `/products/variant/${variant_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  usePostVariantMutation,
  useGetVariantsQuery,
  useAddVariantMutation,
  usePutVariantMutation,
  useDeleteVariantMutation,
  useGetVariantQuery,
} = variantApi;
