import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
    }),

    // Get All Products (with optional search/filter)
    allProducts: builder.query({
      query: ({
        search,
        filters,
      }: { search?: string; filters?: Record<string, any> } = {}) => {
        const query = new URLSearchParams();

        if (search) query.append("searchTerm", search);
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(key, String(value));
          });
        }

        return {
          url: `/product/all-product?${query.toString()}`,
          method: "GET",
        };
      },
    }),

    // Get Single Product by Slug or ID
    singleProduct: builder.query({
      query: (slugOrId: string) => ({
        url: `/product/single-product/${slugOrId}`,
        method: "GET",
      }),
    }),

    // Update Product by Slug or ID
    updateProduct: builder.mutation({
      query: ({ slugOrId, body }: { slugOrId: string; body: any }) => ({
        url: `/product/update-product/${slugOrId}`,
        method: "PATCH",
        body,
      }),
    }),

    // Delete Product by ID
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useAllProductsQuery,
  useSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
