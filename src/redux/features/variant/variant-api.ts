import { baseApi } from "../../api/baseApi";

const variantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //create variant:
    createVariant: builder.mutation({
      query: (data) => ({
        url: "/product-variant/crate-product-variant",
        method: "POST",
        body: data,
      }),
    }),
    updateVariant: builder.mutation({
      query: (id, ...data) => ({
        url: `/product-variant/update-product-variant/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteVariant: builder.mutation({
      query: (id: string) => ({
        url: `/product-variant/delete-single-product-variant/${id}`,
        method: "DELETE",
      }),
    }),
    //get all variant:
    allVariant: builder.query({
      query: () => ({
        url: "/product-variant/all-product-variant",
        method: "GET",
      }),
    }),
    //get single variant:
    singleVariant: builder.query({
      query: (slug: string) => ({
        url: `/product-variant/get-single-product-variant/${slug}`,
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
