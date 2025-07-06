import { baseApi } from "../../api/baseApi";

const variantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVariant: builder.mutation({
      query: (data) => ({
        url: "/product-variant/create-product-variant",
        method: "POST",
        body: data,
      }),
    }),

    updateVariant: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/product-variant/update-product-variant/${slug}`,
        method: "PATCH",
        body,
      }),
    }),

    deleteVariant: builder.mutation({
      query: (id: string) => ({
        url: `/product-variant/delete-product-variant/${id}`,
        method: "DELETE",
      }),
    }),

    allVariant: builder.query({
      query: ({ search }: { search?: string }) => {
        const params = new URLSearchParams();
        if (search) params.append("searchTerm", search);
        return {
          url: `/product-variant/all-product-variant?${params.toString()}`,
          method: "GET",
        };
      },
    }),

    singleVariant: builder.query({
      query: (slug: string) => ({
        url: `/product-variant/single-product-variant/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useAllVariantQuery,
  useSingleVariantQuery,
} = variantApi;
