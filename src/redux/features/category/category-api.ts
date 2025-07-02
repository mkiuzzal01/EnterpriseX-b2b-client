import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-sub-category",
        method: "POST",
        body: data,
      }),
    }),
    updateSubCategory: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/category/update-sub-category/${slug}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSubCategory: builder.mutation({
      query: (slug: string) => ({
        url: `/category/delete-sub-category/${slug}`,
        method: "DELETE",
      }),
    }),
    allSubCategory: builder.query({
      query: ({ search }) => {
        const query = new URLSearchParams();
        if (search) query.append("searchTerm", search);
        return {
          url: `/category/all-sub-category?${query.toString()}`,
          method: "GET",
        };
      },
    }),
    singleSubCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-sub-category/${slug}`,
        method: "GET",
      }),
    }),
    createMainCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-main-category",
        method: "POST",
        body: data,
      }),
    }),
    updateMainCategory: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/category/update-main-category/${slug}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteMainCategory: builder.mutation({
      query: (slug: string) => ({
        url: `/category/delete-main-category/${slug}`,
        method: "DELETE",
      }),
    }),
    allMainCategory: builder.query({
      query: () => ({
        url: "category/all-main-category",
        method: "GET",
      }),
    }),
    singleMainCategory: builder.query({
      query: (slug) => ({
        url: `category/single-main-category/${slug}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ slug, ...data }) => ({
        url: `/category/update-category/${slug}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (slug: string) => ({
        url: `/category/delete-category/${slug}`,
        method: "DELETE",
      }),
    }),
    allCategory: builder.query({
      query: () => ({
        url: "/category/all-category",
        method: "GET",
      }),
    }),
    singleCategory: builder.query({
      query: (slug: string) => ({
        url: `/category/single-category/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  //sub category
  useAllSubCategoryQuery,
  useSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useCreateSubCategoryMutation,
  //main category
  useAllMainCategoryQuery,
  useSingleMainCategoryQuery,
  useDeleteMainCategoryMutation,
  useUpdateMainCategoryMutation,
  useCreateMainCategoryMutation,
  //category
  useAllCategoryQuery,
  useSingleCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} = categoryApi;
