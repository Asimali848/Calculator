import { api } from "./core";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postProduct: builder.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: { products: BaseProduct[]; is_seo_optimized: boolean };
      }) => ({
        url: "/products/bulk-create",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getProducts: builder.query({
      query: (token: string) => ({
        url: "/products/?limit=100&offset=0",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Products"],
      transformResponse: (response: Product) => response.data,
    }),
    deleteProduct: builder.mutation({
      query: ({ token, id }: { token: string; id: number }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    putProduct: builder.mutation({
      query: ({
        token,
        id,
        data,
      }: {
        token: string;
        id: number; // Moved id to be a top-level parameter
        data: {
          product_name: string;
          tags: string[];
          price: number;
          size: string;
          color: string;
          stock: number;
          is_seo_optimized: boolean;
          image_url: string;
          warranty: string;
          material: string;
          manufacturer_code: string;
          bar_code: string;
          technical_specifications: string;
          description: string;
          supplier_id: number;
        };
      }) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: ({
        token,
        data,
      }: {
        token: string;
        data: {
          product_name: string;
          tags: string[];
          price: number;
          size: string;
          color: string;
          stock: number;
          supplier_id: string;
          is_seo_optimized: boolean;
          image_url: string;
          warranty: string;
          material: string;
          manufacturer_code: string;
          bar_code: string;
          technical_specifications: string;
          description: string;
        };
      }) => ({
        url: "/products/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    downloadProduct: builder.mutation({
      // @ts-ignore
      query: ({
        token,
        selected,
      }: {
        token: string;
        selected: {
          product_ids: number[];
          platform: string;
        };
      }) => ({
        url: "/products/download-products/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: selected,
      }),
      transformResponse: (response: {
        status: number;
        message: string;
        data: DownloadProducts[];
      }) => response,
    }),
    getProduct: builder.query({
      query: ({ id, token }: { id: number; token: string }) => ({
        url: `/products/get_product_id/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Product"],
      transformResponse: (response: ProductDetail) => response,
    }),
  }),
});

export const {
  usePostProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  usePutProductMutation,
  useAddProductMutation,
  useDownloadProductMutation,
  useGetProductQuery,
} = productApi;
